import type { Input } from './types.js';

const PROPERTY_TYPE_MAP: Record<string, string> = {
    CONDO: 'CONDO',
    HOUSE: 'DETACHED%20HOUSE',
    TOWNHOUSE: 'TOWNHOUSE',
    LAND: 'LAND',
    COMMERCIAL: 'SHOPHOUSE',
};

export function buildSearchUrls(input: Input): string[] {
    const {
        listingType,
        propertyTypes = ['CONDO'],
        locations = ['Bangkok'],
        minPrice,
        maxPrice,
        minBedrooms,
        maxBedrooms,
    } = input;

    const urls: string[] = [];
    const base = 'https://www.ddproperty.com/en';
    const path = listingType === 'sale' ? 'property-for-sale' : 'property-for-rent';

    for (const location of locations) {
        const params = new URLSearchParams();
        params.set('market', 'residential');
        params.set('listing_type', listingType === 'sale' ? 'buy' : 'rent');
        params.set('freetext', location);

        for (const pt of propertyTypes) {
            const mapped = PROPERTY_TYPE_MAP[pt] ?? pt;
            params.append('property_type_code[]', mapped);
        }

        if (minPrice !== undefined) params.set('minprice', String(minPrice));
        if (maxPrice !== undefined) params.set('maxprice', String(maxPrice));
        if (minBedrooms !== undefined) params.set('minbeds', String(minBedrooms));
        if (maxBedrooms !== undefined) params.set('maxbeds', String(maxBedrooms));

        urls.push(`${base}/${path}?${params.toString()}`);
    }

    return urls;
}
