// src/features/favorites/favoritesSlice.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PropertyFavoriteSave } from '../../../interfaces/interfaces.tsx';



const initialState: PropertyFavoriteSave = {
    saved: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorites: (state, action: PayloadAction<{ property_id: string; user_id: string }>) => {
            console.log('payload', action.payload);
            state.saved.push(action.payload);
        },
        removeFavorites: (state, action: PayloadAction<{ property_id: string; user_id: string }>) => {
            const index = state.saved.findIndex((favorite) => favorite.property_id === action.payload.property_id);
            if (index !== -1) {
                state.saved.splice(index, 1);
            }
        }
    },
});

export const { addFavorites, removeFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
