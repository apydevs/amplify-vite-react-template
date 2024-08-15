// Define a type for the main API response structure
export interface SearchApiResponse {
    summary: Summary;
    results: SearchResult[];
}


export interface Search {
    query: string;
}

// Summarize the search query and response information
export interface Summary {
    query: string;
    queryType: string;
    queryTime: number;
    numResults: number;
    offset: number;
    totalResults: number;
    fuzzyLevel: number;
}

// Detail the structure of each search result
export interface SearchResult {
    type: string;
    id: string;
    score: number;
    address: Address;
    position: Position;
    poi?: PointOfInterest; // POI might not be present for all entries
    viewport?: Viewport;

}

// Define address details
export interface Address {
    streetNumber?: string;
    streetName?: string;
    municipalitySubdivision?: string;
    municipality?: string;
    countrySecondarySubdivision?: string;
    countrySubdivision?: string;
    postalCode?: string;
    extendedPostalCode?: string;
    countryCode: string;
    country: string;
    countryCodeISO3: string;
    freeformAddress: string;
    localName: string;
}

// Define the geographical position
export interface Position {
    lat: number;
    lon: number;
}

// Define points of interest details
export interface PointOfInterest {
    name?: string;
    phone?: string;
    categorySet?: CategorySet[];
    url?: string;
}

// Categories applicable to the POI
export interface CategorySet {
    id: number;
}

// Define the viewport for the map display
export interface Viewport {
    topLeftPoint: Position;
    btmRightPoint: Position;
}