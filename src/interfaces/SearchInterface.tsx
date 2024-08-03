export interface Location {
    id: number;
    name: string;
}

export interface PropertyTypeInterface {
    id: number;
    name: string;
}



export interface Filter {
    locationRadius: string;
    locations: Location[];
    maxBedroom: number | null;
    maxValuation: number | null;
    minBedroom: number | null;
    minValuation: number | null;
    propertyType: PropertyTypeInterface | null;
}

export interface SearchFormData extends Filter {

}