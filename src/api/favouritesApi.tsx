// src/api/Favourites.ts
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../amplify/data/resource';
import {CreateFavoriteType} from "../types/FavouriteTypes.tsx";


const client = generateClient<Schema>();

// Function to list all Todos
export const listFavourites = async () => {
    const { data: todos, errors } = await client.models.Favourites.list();
    if (errors) {
        console.error(errors);
        throw new Error('Failed to fetch todos');
    }
    console.log('List Favourites',todos)
    return todos;
};

// Update the getFavourite function to accept a string user_id directly
export const getUsersFavourite = async (userId: string)=> {
    // Call the client method with the user_id as a string
    const { data: todo, errors } = await client.models.Favourites.listFavouritesByUserId(
             { userId: userId },
             { selectionSet: ['id','propertyId','userId',  'propertyRel.*'] },
        );
    // First, check for API-reported errors
    if (errors) {
        console.error(errors);
        throw new Error(`Failed to fetch todo with user_id ${userId}`);
    }

    // Check if the data returned is null
    if (!todo) {
        throw new Error(`Todo with user_id ${userId} not found`);
    }

    console.log('DATA', todo);
    return todo;

};

export const createFavourite = async ({userId, propertyId}: CreateFavoriteType) => {
    console.log('Creating favourite with userId:', userId, 'and propertyId:', propertyId);
    const { data: favourite, errors } = await client.models.Favourites.create({
        userId: userId,
        propertyId: propertyId
    });

    if (errors) {
        throw new Error(`Error creating favourite: ${errors}`);
    }
    if (!favourite || !favourite.id || !favourite.userId) {
        throw new Error('Failed to create favourite: essential data missing');
    }
    return favourite;
};


export const removeFavourite = async (id:string ) => {



    const { data: deletedFavourite, errors } = await client.models.Favourites.delete({id:id});
    console.log('removed',deletedFavourite)

    if (errors) {
        throw new Error(`Error removing favourite: ${errors}`);
    }
    if (!deletedFavourite) {
        throw new Error('Failed to removing favourite: no data returned');
    }

    if (!deletedFavourite.id) {
        throw new Error('Failed to removing favourite: no ID returned');
    }

};


export const removeAllFavourites = async ( propertyId : string) => {


    const toBeDeletedTodo = {
        id: propertyId
    }
    const { data: deletedFavourite, errors } = await client.models.Favourites.delete(toBeDeletedTodo);

    if (errors) {
        throw new Error(`Error removing favourite: ${errors}`);
    }
    if (!deletedFavourite) {
        throw new Error('Failed to removing favourite: no data returned');
    }

    if (!deletedFavourite.id) {
        throw new Error('Failed to removing favourite: no ID returned');
    }

};

