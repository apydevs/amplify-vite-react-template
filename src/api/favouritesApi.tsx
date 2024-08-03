// src/api/Favourites.ts
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../amplify/data/resource';
import { CreateFavouriteParams} from "../interfaces/FavouriteInterface.tsx";

const client = generateClient<Schema>();

// Function to list all Todos
export const listFavourites = async () => {
    const { data: todos, errors } = await client.models.Favourites.list();
    if (errors) {
        console.error(errors);
        throw new Error('Failed to fetch todos');
    }
    return todos;
};

// Function to get a specific Todo by ID
export const getFavourite = async (id: string) => {
    const { data: todo, errors } = await client.models.Favourites.get({ id });
    // First, check for API-reported errors
    if (errors) {
        console.error(errors);
        throw new Error(`Failed to fetch todo with ID ${id}`);
    }

    // Check if the data returned is null
    if (!todo) {
        throw new Error(`Todo with ID ${id} not found`);
    }

    return todo;
};

export const createFavourite = async ({ propertyId, userId }: CreateFavouriteParams): Promise<string> => {
    const { data: favourite, errors } = await client.models.Favourites.create({
        user_id: userId,
        property_id: propertyId
    });

    if (errors) {
        throw new Error(`Error creating favourite: ${errors}`);
    }
    if (!favourite) {
        throw new Error('Failed to create favourite: no data returned');
    }

    if (!favourite.id) {
        throw new Error('Failed to create favourite: no ID returned');
    }

    return favourite.id;

};

