// src/api/propertiesApi.ts
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../amplify/data/resource';
import {Filter, Location, PropertyTypeInterface, SearchFormData} from "../interfaces/SearchInterface.tsx";
import {useDispatch, useSelector} from "react-redux";
const client = generateClient<Schema>();

// Function to list all properties
export const listProperties = async () => {
    const { data: todos, errors } = await client.models.Property.list();
    if (errors) {
        console.error(errors);
        throw new Error('Failed to fetch properties');
    }
    return todos;
};

export const searchProperties = async (filterValues) => {
    console.log('FILTER', filterValues);

    const filterQuery = buildFilter(
        filterValues.locations || [],
        filterValues.locationRadius || 0.0,
        filterValues.minValuation || 1000,
        filterValues.maxValuation || 20000000,
        filterValues.type || 'All',
        filterValues.minBedroom || 0,
        filterValues.maxBedroom || 50
    );

    console.log('FILTER', filterQuery);


        const {
            data: propertiesData,
            errors
        } =     await client.models.Property.list({filter: filterQuery});

        if (errors) {
            console.error(errors);
            throw new Error('Failed to fetch properties');
        }

        return propertiesData;


};

export default searchProperties;

// Function to get a specific property by ID
export const getProperty = async (id: string) => {
    const { data: todo, errors } = await client.models.Property.get({ id });
    // First, check for API-reported errors
    if (errors) {
        console.error(errors);
        throw new Error(`Failed to fetch property with ID ${id}`);
    }

    // Check if the data returned is null
    if (!todo) {
        throw new Error(`property with ID ${id} not found`);
    }

    return todo;
};


export const createProperty = async (property: any) => {
    const { data: todo, errors } = await client.models.Property.create(property);
    if (errors) {
        console.error(errors);
        throw new Error('Failed to create property');
    }
    return todo;
}



export const  buildFilter = (
    locations: Location[],
    locationRadius: number | null,
    minValuation: number | null,
    maxValuation: number | null,
    propertyType: string | null,
    minBedroom: number | null | string,
    maxBedroom: number | null | string
): Filter => {
    const filter: Filter = {};

    // if (locations.length > 0) {
    //     filter.location = {
    //         contains: locations.map(location => location.name.toLowerCase())
    //     };
    // }

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
        filter.bedrooms = {
            ge: Number(minBedroom)
        };
    }

    if (maxBedroom) {
        if (!filter.bedrooms) {
            filter.bedrooms = {};
        }
        filter.bedrooms.le = Number(maxBedroom);
    }

    console.log('filter',filter)
    return filter;
};

