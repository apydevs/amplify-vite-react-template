// src/api/propertiesApi.ts
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../amplify/data/resource';
import { Location} from "../interfaces/SearchInterface.tsx";
import {NewPropertyType} from "../interfaces/interfaces.tsx";
const client = generateClient<Schema>();

type Filter = {
    locationRadius?: {
        eq: number;
    };
    locations?: {
        contains: string[];
    };
    maxBedroom?: {
        le: number;
    };
    minBedroom?: {
        ge: number;
    };
    maxValuation?: {
        le: number;
    };
    minValuation?: {
        ge: number;
    };
    type?: {
        contains: string;
    };
    bedrooms?: {
        ge?: number;
        le?: number;
    };
};

// Function to list all properties
export const listProperties = async ():Promise<object> => {
    const { data: properties, errors } = await client.models.Property.list();
    if (errors) {
        console.error(errors);
        throw new Error('Failed to fetch properties');
    }
    return properties;
};

//
// export const searchProperties = async (filterValues):Promise<PropertyFilter> => {
//     console.log('FILTER', filterValues);
//
//     const filterQuery = buildFilter(
//         filterValues.locations || [],
//         filterValues.locationRadius || 0.0,
//         filterValues.minValuation || 1000,
//         filterValues.maxValuation || 20000000,
//         filterValues.type || 'All',
//         filterValues.minBedroom || 0,
//         filterValues.maxBedroom || 50
//     );
//
//     console.log('FILTER', filterQuery);
//
//
//         // const {
//         //     data: propertiesData,
//         //     errors
//         // } =     await client.models.Property.list({filter: filterQuery});
//         //
//         // if (errors) {
//         //     console.error(errors);
//         //     throw new Error('Failed to fetch properties');
//         // }
//         //
//         // return propertiesData;
//
//
// };
//
// export default searchProperties;

// Function to get a specific property by ID
export const getProperty = async (id: string):Promise<object> => {


    const apiProperty = await client.models.Property.get({ id });
    // Check if the data returned is null
    if (!apiProperty) {
        throw new Error(`property with ID ${id} not found`);
    }
    console.log('Transformed Property Data:', apiProperty);
    return apiProperty;
}


export const createProperty = async (property2: NewPropertyType) => {


    const property = await client.models.Property.create(property2 as any);
    if (!property) {
        throw new Error('Failed to create property');
    }
    return property;
}

export const buildFilter = (
    locations: Location[],
    locationRadius: number | null,
    minValuation: number | null,
    maxValuation: number | null,
    propertyType: string | null,
    minBedroom: number | null | string,
    maxBedroom: number | null | string
): Filter => {

    const filter: Filter = {};

    if (locations && locations.length > 0) {
        filter.locations = {
            contains: locations.map(location => location.name.toLowerCase())
        };
    }

    if (locationRadius) {
        filter.locationRadius = {
            eq: locationRadius
        };
    }

    if (minValuation) {
        filter.minValuation = {
            ge: Number(minValuation)
        };
    }

    if (maxValuation) {
        filter.maxValuation = {
            le: Number(maxValuation)
        };
    }

    if (propertyType && propertyType !== 'All') {
        filter.type = {
            contains: propertyType
        };
    }

    if (minBedroom) {
        filter.minBedroom = {
            ge: Number(minBedroom)
        };
    }

    if (maxBedroom) {
        if (!filter.bedrooms) {
            filter.bedrooms = {};
        }
        filter.bedrooms.le = Number(maxBedroom);
    }

    console.log('filter', filter);

    return filter;
};
