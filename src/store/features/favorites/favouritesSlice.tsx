// src/features/favorites/favoritesSlice.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    PropertyFavoriteType,
    CreateFavoriteType,
} from '../../../types/FavouriteTypes.tsx';



const initialState: PropertyFavoriteType = {
    saved: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        setFavorites: (state, action: PayloadAction<PropertyFavoriteType>) => {


                state.saved = action.payload.saved;

        },
        addFavorites: (state, action: PayloadAction<CreateFavoriteType>) => {
            console.log('property',action.payload)
            state.saved.push(action.payload);
        },

        removeFavorites: (state, action: PayloadAction<{ propertyId: string; userId: string }>) => {

            const index = state.saved.findIndex(
                (favorite) =>
                    favorite.propertyId === action.payload.propertyId &&
                    favorite.userId === action.payload.userId
            );
            console.log('index is ',index)
            if (index !== -1) {
                state.saved.splice(index, 1);
            }
        },
        removeAllFavorites: (state) => {
            state.saved = [];
        },
    },
});

export const { addFavorites, removeFavorites,setFavorites,removeAllFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
