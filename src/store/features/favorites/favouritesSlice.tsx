// src/features/favorites/favoritesSlice.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {PropertyFavorite} from '../../../interfaces/interfaces.tsx';

interface PropertyFavoriteSave {
    saved: PropertyFavorite[];
}

const initialState: PropertyFavoriteSave = {
    saved: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        setFavorites: (state, action: PayloadAction<PropertyFavorite[]>) => {

            if(action.payload.contains('saved')){
                state.saved = action.payload.saved;
            }else{
                state.saved = action.payload;
            }
        },
        addFavorites: (state, action: PayloadAction<PropertyFavorite>) => {
            console.log('payload', action.payload);
            state.saved.push(action.payload);
        },
        removeFavorites: (state, action: PayloadAction<{ propertyId: string; userId: string }>) => {
            const index = state.saved.findIndex(
                (favorite) =>
                    favorite.propertyId === action.payload.propertyId &&
                    favorite.userId === action.payload.userId
            );
            if (index !== -1) {
                state.saved.splice(index, 1);
            }
        },
    },
});

export const { addFavorites, removeFavorites,setFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
