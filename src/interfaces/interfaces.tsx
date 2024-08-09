// Define an interface for the payload

export  const  SUCCESS_RESPONSE_CODE = 200;
export  const  ERROR_RESPONSE_CODE = 'error';
// AuthPayload as a type
export type AuthPayload = {
    event: 'signedIn' | 'tokenRefresh' | 'signedOut'; // Possible events
};

// AuthEvent as a type
export type AuthEvent = {
    payload: AuthPayload; // Include other properties if needed
};

export type SuccessResponse <D> = {
    code: typeof SUCCESS_RESPONSE_CODE;
    message: D;
}
export type ErrorResponse <E> = {
    code: typeof ERROR_RESPONSE_CODE;
    message: E;
}
// HubPayload as a generic type
export type HubPayload<T> = {
    payload: T;
    // Add other common properties if necessary
};

// NumberTypeInterface as a type
export type NumberTypeInterface = {
    id: string;
    value: number;
};

// PropertyTypeInterface as a type
export type PropertyTypeInterface = {
    id: number;
    name: string;
};
// Example Nullable type
type Nullable<T> = T | null;
// PropertyInterface as a type
export type PropertyInterface = {
    id?: Nullable<string>; // Allow both undefined and null
    address?: string | null;
    bathrooms?: number | null;
    bedrooms?: number | null;
    area_size?: number| null;
    city?: string| null;
    content?: string | null;
    country?: string| null;
    county?: string| null;
    description?: string | null;
    epc_date?: string | null;
    garages?: number | null;
    is_published?: boolean | null;
    imageSrc?: string | null;
    is_featured?: boolean;
    is_sold?: boolean;
    is_yeoley_plus?: boolean;
    latitude?: number| null;
    layout?: string | null;
    longitude?: number | null;
    max?: number | bigint | null;
    min?: number | null;
    postcode?: string | null;
    condition?: string| null;
    potential_epc_rating?: string | null;
    prefix?: string | null;
    slug?: string | null;
    tenure?: string | null;
    title?: string | null;
    town?: string | null;
    type?: string | null;
    user_id?: string | null;
    valuation?: number | null;
    valuation_type?: string | null;
    views?: number | null;
    year_built?: number | null;
    createdAt?: string | null;
    updatedAt?: string | null;
};
export type CreatePropertyInputType = Omit<NewPropertyType, 'id'>;
// NewPropertyInterface as a type
export type NewPropertyType = {
    id: Nullable<string>;
    title: string;
    slug: string;
    valuation: number;
    min: number;
    max: number;
    description: string;
    address: string;
    town: string;
    city: string;
    county: string;
    postcode: string;
    imageSrc?: string | null;
    condition: string;
    country: string;
    bedrooms: number;
    bathrooms: number;
    garages: number;
    area_size: number;
    year_built: number;
    views: number;
    is_featured: boolean;
    is_published: boolean;
    is_sold: boolean;
    is_yeoley_plus: boolean;
    user_id: string;
    type: string;
    longitude: number;
    latitude: number;
    valuation_type: string;
    prefix: string;
    tenure: string;
    current_epc_rating?: string; // Added based on your schema
    potential_epc_rating?: string;
    epc_date: string;
    layout: string;
    content: string;
    createdAt?: string | null;  // Optional and nullable if not always included
    updatedAt?: string | null;  // Optional and nullable if not always included
};



// PropertyFilter as a type
export type PropertyLocations = {
    locations: LocationType[] | null; // Locations array or null
};

export type LocationType = {
    id: number | null;
    name: string;
    longitude: number | null;
    latitude: number | null;
};

// PropertyFilter as a type
export  type PropertyFilter = {
    locations: PropertyLocations[]; // Array of PropertyLocations
    type: string;
    locationRadius: number;
    minBedroom: number;
    maxBedroom: number;
    minValuation: number;
    maxValuation: number;
    maxOfferPrice: number;
};

// DataItem as a type
export type DataItem = {
    id: number;
    name: string;
    value: string | number;
};

// SelectBoxProps as a type
export type SelectBoxProps = {
    onChange: (value: DataItem) => void;
    name: string | number;

};

// DataRadiusItem as a type
export type DataRadiusItem = {
    id: number;
    value: number;
    text: string;
};

// SelectBoxRadiusProps as a type
export type SelectBoxRadiusProps = {
    onChange: (value: DataRadiusItem) => void;
    name: string | number;
};

// SelectIdValueTextProps as a type
export type SelectIdValueTextProps = {
    onChange: (value: DataRadiusItem) => void;
    name: string;
};


// PropertyFavoriteInterface as a type

export type PropertyFavoriteSave = {
    saved: PropertyFavorite[];
}
export type FavoriteProperty = {
    saved: PropertyFavorite[];
};

export type PropertyFavorite = {
    id?: string;
    userId: string;
    propertyId: string;
    property: PropertyInterface;
};

export type PropertyFavoriteInterface = {
    id?: string;
    userId: string;
    propertyId: string;
    property: PropertyInterface;
}
