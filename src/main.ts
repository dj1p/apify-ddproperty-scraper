import { Actor } from 'apify';
import { PlaywrightCrawler } from 'crawlee';
import { router, LABELS, setInput } from './routes.js';
import { buildSearchUrls } from './url-builder.js';
import type { Input } from './types.js';

await Actor.init();

const input = (await Actor.getInput<Input>()) ?? ({} as Input);

// Defaults
input.listingType ??= 'sale';
input.propertyTypes ??= ['CONDO'];
input.locations ??= ['Bangkok'];
input.maxItems ??= 100;
input.enrichWithBtsDistance ??= false;

setInput(input);

const proxyConfiguration = await Actor.createProxyConfiguration(
    input.proxyConfiguration ?? { useApifyProxy: true, apifyProxyGroups: ['RESIDENTIAL'] },
);

const crawler = new PlaywrightCrawler({
    proxyConfiguration,
    requestHandler: router,
    headless: true,
    maxConcurrency: 3,
    maxRequestRetries: 3,
    requestHandlerTimeoutSecs: 90,
    navigationTimeoutSecs: 60,
    // Use stealth mode to bypass Cloudflare
    launchContext: {
        launchOptions: {
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-blink-features=AutomationControlled',
            ],
        },
    },
    preNavigationHooks: [
        async ({ page }) => {
            // Mask automation fingerprints
            await page.addInitScript(() => {
                Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
            });
        },
    ],
    browserPoolOptions: {
        useFingerprints: true,
    },
});

const startUrls = buildSearchUrls(input);

await crawler.run(
    startUrls.map((url) => ({ url, label: LABELS.SEARCH })),
);

await Actor.exit();
