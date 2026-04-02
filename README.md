# DDProperty Scraper

An [Apify](https://apify.com) actor that scrapes property listings from [ddproperty.com](https://www.ddproperty.com) — Thailand's leading real estate portal.

## Features

- Scrape properties **for sale** or **for rent**
- Filter by property type (condo, house, townhouse, land, commercial)
- Filter by location, price range, and number of bedrooms
- **BTS/MRT distance enrichment** — calculates distance and estimated walking time to nearest BTS Skytrain and MRT station
- **Google Maps enrichment** *(optional)* — enriches listings with formatted addresses and nearby amenities via Google Maps API
- Handles Cloudflare protection via Apify residential proxies and stealth browser

## Output

Each listing produces a JSON record with the following fields:

| Field | Description |
|---|---|
| `id` | DDProperty listing ID |
| `url` | Listing URL |
| `title` | Listing title |
| `listingType` | `sale` or `rent` |
| `propertyType` | Type of property |
| `price` | Price in THB |
| `priceText` | Original price text from the page |
| `location` | Location string |
| `district` | District |
| `province` | Province |
| `latitude` | GPS latitude |
| `longitude` | GPS longitude |
| `bedrooms` | Number of bedrooms |
| `bathrooms` | Number of bathrooms |
| `floorArea` | Floor area in sqm |
| `amenities` | List of amenities |
| `images` | List of image URLs |
| `agentName` | Listing agent name |
| `nearestBts` | Nearest BTS station (name, line, distanceKm, walkingMinutes) |
| `nearestMrt` | Nearest MRT station (name, line, distanceKm, walkingMinutes) |
| `scrapedAt` | ISO timestamp of when the listing was scraped |

## Input

```json
{
  "listingType": "sale",
  "propertyTypes": ["CONDO"],
  "locations": ["Sukhumvit", "Sathorn"],
  "minPrice": 2000000,
  "maxPrice": 10000000,
  "minBedrooms": 1,
  "maxBedrooms": 2,
  "maxItems": 100,
  "enrichWithBtsDistance": true,
  "proxyConfiguration": {
    "useApifyProxy": true,
    "apifyProxyGroups": ["RESIDENTIAL"]
  }
}
```

## Running locally

```bash
npm install
npm run dev
```

Set `APIFY_TOKEN` in your environment or use [Apify CLI](https://docs.apify.com/cli).

## Notes

- ddproperty.com uses Cloudflare protection — **residential proxies are strongly recommended**
- BTS/MRT station data covers the main Bangkok lines. Coordinates are approximate.
- Google Maps enrichment requires a valid API key with the Places API enabled.
