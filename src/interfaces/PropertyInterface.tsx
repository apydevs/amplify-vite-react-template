export interface PropertyInterface {
    address: string;
    bathrooms: number;
    bedrooms: number;
    area_size: number;
    city: string;
    content: string;
    country: string;
    county: string;
    description: string;
    epc_date: string;
    garages: number;
    is_featured: boolean;
    is_published: boolean;
    id: string;
    is_sold: boolean;
    is_yeoley_plus: boolean;
    latitude: number;
    layout: string;
    longitude: number;
    max: number;
    min: number;
    postcode: string;
    condition: string;
    potential_epc_rating: string;
    prefix: string;
    slug: string;
    tenure: string;
    title: string;
    town: string;
    type: string;
    updated_at: string;
    user_id: string;
    valuation: number;
    valuation_type: string;
    views: number;
    year_built: number;
}
export interface PropertyFavoriteInterface {
    id: string;
    user_id: string;
    property_id: string;
}

export type FavoriteProperty = {
    saved: PropertyFavoriteInterface[];
};