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
// Update the getFavourite function to accept a string user_id directly
export const getFavourite = async (user_id: string)=> {
    // Call the client method with the user_id as a string
    console.log({ user_id: user_id });
    const { data: todo, errors } = await client.models.Favourites.listFavouritesByUserId({ userId: user_id });

    console.log('asdasd',todo);
    // First, check for API-reported errors
    if (errors) {
        console.error(errors);
        throw new Error(`Failed to fetch todo with user_id ${user_id}`);
    }

    // Check if the data returned is null
    if (!todo) {
        throw new Error(`Todo with user_id ${user_id} not found`);
    }

    return todo.map((fav) => ({
        id: fav.id || undefined,
        userId: fav.userId || '',
        propertyId: fav.propertyId || '',
    }));

};

export const createFavourite = async ({ propertyId, userId }: CreateFavouriteParams): Promise<string> => {
    const { data: favourite, errors } = await client.models.Favourites.create({
        userId: userId,
        propertyId: propertyId
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

