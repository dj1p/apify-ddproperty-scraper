import { createPlaywrightRouter } from '@crawlee/playwright';
import type { Page } from 'playwright';
import type { Input, PropertyListing } from './types.js';
import { BTS_STATIONS, MRT_STATIONS, findNearestStation } from './bts-stations.js';

export const LABELS = {
    SEARCH: 'SEARCH',
    LISTING: 'LISTING',
} as const;

let itemCount = 0;
let inputRef: Input;

export function setInput(input: Input) {
    inputRef = input;
    itemCount = 0;
}

export const router = createPlaywrightRouter();

// Handle search/listing pages — paginate and enqueue individual listings
router.addHandler(LABELS.SEARCH, async ({ page, request, enqueueLinks, log }) => {
    log.info(`Scraping search page: ${request.url}`);

    await dismissPopups(page);
    await page.waitForSelector('[data-testid="listing-card-wrapper"], .listing-card, article[class*="listing"]', {
        timeout: 30_000,
    }).catch(() => log.warning('No listing cards found on page'));

    const maxItems = inputRef?.maxItems ?? 100;

    // Enqueue individual listing URLs
    const listingLinks = await page.$$eval(
        'a[href*="/en/property-"][href*="listing"]',
        (els: Element[]) => els.map((el) => (el as HTMLAnchorElement).href),
    );

    for (const href of listingLinks) {
        if (maxItems > 0 && itemCount >= maxItems) break;
        await enqueueLinks({ urls: [href], label: LABELS.LISTING });
    }

    // Paginate — find "next page" link
    if (maxItems === 0 || itemCount < maxItems) {
        const nextPage = await page.$('a[aria-label="Go to next page"], a[title="Next"]');
        if (nextPage) {
            const nextHref = await nextPage.getAttribute('href');
            if (nextHref) {
                await enqueueLinks({ urls: [nextHref], label: LABELS.SEARCH });
            }
        }
    }
});

// Handle individual listing detail pages
router.addHandler(LABELS.LISTING, async ({ page, request, pushData, log }) => {
    const maxItems = inputRef?.maxItems ?? 100;
    if (maxItems > 0 && itemCount >= maxItems) return;

    log.info(`Scraping listing: ${request.url}`);
    await dismissPopups(page);

    try {
        const listing = await extractListing(page, request.url);

        if (inputRef?.enrichWithBtsDistance && listing.latitude && listing.longitude) {
            const nearestBts = findNearestStation(listing.latitude, listing.longitude, BTS_STATIONS);
            const nearestMrt = findNearestStation(listing.latitude, listing.longitude, MRT_STATIONS);

            if (nearestBts) {
                listing.nearestBts = {
                    name: nearestBts.station.name,
                    line: nearestBts.station.line,
                    distanceKm: nearestBts.distanceKm,
                    walkingMinutes: nearestBts.walkingMinutes,
                };
            }
            if (nearestMrt) {
                listing.nearestMrt = {
                    name: nearestMrt.station.name,
                    line: nearestMrt.station.line,
                    distanceKm: nearestMrt.distanceKm,
                    walkingMinutes: nearestMrt.walkingMinutes,
                };
            }
        }

        await pushData(listing);
        itemCount++;
        log.info(`Saved listing ${itemCount}: ${listing.title ?? request.url}`);
    } catch (err) {
        log.error(`Failed to extract listing from ${request.url}: ${err}`);
    }
});

async function dismissPopups(page: Page) {
    for (const selector of [
        'button[id*="accept"]',
        'button[class*="close"]',
        '[aria-label="Close"]',
        '.modal-close',
    ]) {
        const btn = await page.$(selector).catch(() => null);
        if (btn) {
            await btn.click().catch(() => null);
            await page.waitForTimeout(500);
        }
    }
}

async function extractListing(page: Page, url: string): Promise<PropertyListing> {
    await page.waitForSelector('h1', { timeout: 20_000 }).catch(() => null);

    const data = await page.evaluate(() => {
        const getText = (sel: string) => document.querySelector(sel)?.textContent?.trim() ?? null;

        // Try JSON-LD structured data first
        let jsonLd: Record<string, unknown> | null = null;
        const jsonLdEl = document.querySelector('script[type="application/ld+json"]');
        if (jsonLdEl?.textContent) {
            try { jsonLd = JSON.parse(jsonLdEl.textContent); } catch { /* ignore */ }
        }

        const title = getText('h1') ?? (jsonLd?.name as string | null);

        const priceText =
            getText('[data-testid="listing-price"]') ??
            getText('.price') ??
            getText('[class*="price"]');

        const priceMatch = priceText?.replace(/[^0-9]/g, '');
        const price = priceMatch ? parseInt(priceMatch, 10) : null;

        const location =
            getText('[data-testid="listing-location"]') ??
            getText('.address') ??
            ((jsonLd?.address as Record<string, unknown> | null)?.streetAddress as string | null);

        const allText = document.body.innerText;
        const bedsMatch = allText.match(/(\d+)\s*(bed|bedroom)/i);
        const bathsMatch = allText.match(/(\d+)\s*(bath|bathroom)/i);
        const areaMatch = allText.match(/(\d[\d,]*)\s*sq\.?\s*m/i);

        // Lat/lng from Open Graph meta tags
        let lat: number | null = null;
        let lng: number | null = null;
        const metaLat = document.querySelector('meta[property="place:location:latitude"]');
        const metaLng = document.querySelector('meta[property="place:location:longitude"]');
        if (metaLat && metaLng) {
            lat = parseFloat(metaLat.getAttribute('content') ?? '') || null;
            lng = parseFloat(metaLng.getAttribute('content') ?? '') || null;
        }

        const images = Array.from(document.querySelectorAll('img[src*="media"]'))
            .map((img) => (img as HTMLImageElement).src)
            .filter((src) => src.includes('http'))
            .slice(0, 20);

        const amenities = Array.from(
            document.querySelectorAll('[class*="ameniti"] li, [class*="feature"] li'),
        ).map((el) => el.textContent?.trim()).filter(Boolean) as string[];

        return {
            title,
            priceText,
            price,
            location,
            lat,
            lng,
            bedrooms: bedsMatch ? parseInt(bedsMatch[1], 10) : null,
            bathrooms: bathsMatch ? parseInt(bathsMatch[1], 10) : null,
            floorArea: areaMatch ? parseInt(areaMatch[1].replace(',', ''), 10) : null,
            images,
            amenities,
            agentName: getText('[class*="agent-name"], [data-testid="agent-name"]'),
            agentPhone: getText('[class*="agent-phone"], [data-testid="agent-phone"]'),
            propertyType: getText('[data-testid="property-type"], [class*="property-type"]'),
            description: getText('[data-testid="description"], [class*="description"]'),
        };
    });

    const idMatch = url.match(/(\d+)(?:[?#]|$)/);

    return {
        id: idMatch?.[1] ?? '',
        url,
        title: data.title ?? '',
        listingType: inputRef?.listingType ?? 'sale',
        propertyType: data.propertyType,
        price: data.price,
        priceText: data.priceText,
        currency: 'THB',
        location: data.location,
        district: null,
        province: null,
        latitude: data.lat,
        longitude: data.lng,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        floorArea: data.floorArea,
        landArea: null,
        floor: null,
        totalFloors: null,
        yearBuilt: null,
        description: data.description,
        amenities: data.amenities,
        images: data.images,
        agentName: data.agentName,
        agentPhone: data.agentPhone,
        postedDate: null,
        scrapedAt: new Date().toISOString(),
    };
}
