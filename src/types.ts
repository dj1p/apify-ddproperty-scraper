export interface Input {
    listingType: 'sale' | 'rent';
    propertyTypes?: string[];
    locations?: string[];
    minPrice?: number;
    maxPrice?: number;
    minBedrooms?: number;
    maxBedrooms?: number;
    maxItems?: number;
    enrichWithBtsDistance?: boolean;
    enrichWithGoogleMaps?: boolean;
    googleMapsApiKey?: string;
    proxyConfiguration?: object;
}

export interface PropertyListing {
    id: string;
    url: string;
    title: string;
    listingType: 'sale' | 'rent';
    propertyType: string | null;
    price: number | null;
    priceText: string | null;
    currency: string;
    location: string | null;
    district: string | null;
    province: string | null;
    latitude: number | null;
    longitude: number | null;
    bedrooms: number | null;
    bathrooms: number | null;
    floorArea: number | null;
    landArea: number | null;
    floor: number | null;
    totalFloors: number | null;
    yearBuilt: number | null;
    description: string | null;
    amenities: string[];
    images: string[];
    agentName: string | null;
    agentPhone: string | null;
    postedDate: string | null;
    scrapedAt: string;
    nearestBts?: NearestStation;
    nearestMrt?: NearestStation;
    googleMapsData?: GoogleMapsData;
}

export interface NearestStation {
    name: string;
    line: string;
    distanceKm: number;
    walkingMinutes: number;
}

export interface GoogleMapsData {
    formattedAddress: string | null;
    placeId: string | null;
    walkingTimeToBts: number | null;
    nearbyAmenities: string[];
}

export interface BtsStation {
    name: string;
    nameTh: string;
    line: string;
    lat: number;
    lng: number;
}
