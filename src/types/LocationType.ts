
export type Locations = {
    locations:Location[]
}



export type Location = {
    readonly  id?: string;
    name: string;
    longitude: number;
    latitude:number;
    userId?: string;
    locationId:string,

}
export type LocationResult = {
    readonly  id?: string;
    name: string;
    longitude: number;
    latitude:number;

}

export type  RemoveLocationType = {
    userId?: string;
    readonly  id?: string;
}


// Define the shape of the mutation response
export  interface AddLocationResponse {
    addLocation: {
        locationId: string;
        name: string;
        longitude: number;
        latitude: number;
        id:string;
    };
}

// Define the shape of the mutation variables
export interface AddLocationVariables {
    name: string;
    longitude: number;
    latitude: number;
    locationId: string;
}