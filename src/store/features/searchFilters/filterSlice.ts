import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
    DataItem,
    DataRadiusItem
} from "../../../interfaces/interfaces.tsx";
import {Location} from "../../../types/LocationType.ts";

// Initial state type


   // Adjust according to your actual state structure


const initialState = {
    locations: [
        { id: '1', name: 'New York' },
        { id: '2', name: 'Los Angeles' },
    ],
    type: 'All',
    locationRadius: 0.0,
    minBedroom: 0,
    maxBedroom: 99,
    minValuation: 0,
    maxValuation: 20000000,
    maxOfferPrice: 500000
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        locations: (state, action: PayloadAction<Location>) => {
            const exists = state.locations.some(location => location.id === action.payload.id);
            if (!exists) {
                state.locations.push(action.payload);
                console.log('Added new location:', action.payload);
            } else {
                console.log('Location already exists with id:', action.payload.id);
            }
        },
        locationRemove: (state, action: PayloadAction<Location>) => {
            const index = state.locations.findIndex(location => location.id === action.payload.id);
            if (index !== -1) { // Check that the index is not -1 (not found)
                state.locations.splice(index, 1); // Remove 1 item at index
                console.log('Removed location:', action.payload);
            } else {
                console.log('Location not found:', action.payload.id);
            }
        },


        locationRadius: (_state,acton:PayloadAction<DataRadiusItem>) => {
            console.log('current State',_state);
            console.log('locationRadius payload',acton.payload);
        },
        type: (state,acton:PayloadAction<DataItem>) => {
            state.type = acton.payload.name
            console.log('type payload',acton.payload);
            console.log('type reduced',state.type);
        },
        minBedroom: (state, action: PayloadAction<DataItem>) => {
            console.log('type payload', action.payload.value);

            // Handle the conversion
            if (typeof action.payload.value === 'string') {
                // Attempt to convert to a number
                const parsedValue = parseInt(action.payload.value, 10);

                // Check if the parsed value is a valid number
                if (!isNaN(parsedValue)) {
                    state.minBedroom = parsedValue;
                } else {
                    console.warn('Invalid number conversion:', action.payload.value);
                }
            } else {
                state.minBedroom = action.payload.value;
            }
        },
        maxBedroom:  (state, action: PayloadAction<DataItem>) => {
            // Handle the conversion
            if (typeof action.payload.value === 'string') {
                // Attempt to convert to a number
                const parsedValue = parseInt(action.payload.value, 10);

                // Check if the parsed value is a valid number
                if (!isNaN(parsedValue)) {
                    state.minBedroom = parsedValue;
                } else {
                    console.warn('Invalid number conversion:', action.payload.value);
                }
            } else {
                state.maxBedroom = action.payload.value;
            }
        },
        minValuation: (state,acton:PayloadAction<DataRadiusItem>) => {
            state.minValuation = acton.payload.value
        },
        maxValuation: (state,acton:PayloadAction<DataRadiusItem>) => {
            state.maxValuation = acton.payload.value
        },

        maxOfferPrice: (state,acton:PayloadAction<DataRadiusItem>) => {
            state.maxOfferPrice = acton.payload.value
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    locations,
    locationRemove,
    locationRadius,
    type,
    minBedroom,
    maxBedroom,
    minValuation,
    maxValuation,
    maxOfferPrice
} = filterSlice.actions

export default filterSlice.reducer