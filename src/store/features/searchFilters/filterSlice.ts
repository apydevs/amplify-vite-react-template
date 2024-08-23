import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
    DataItem,
    DataRadiusItem
} from "../../../interfaces/interfaces.tsx";
   // Adjust according to your actual state structure


type RadiusType = {
    value: number;
};


const initialState = {
    type: 'All',
    locationRadius: 0,
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
        locationRadius: (state,acton:PayloadAction<RadiusType>) => {
            console.log('current State',state);
            console.log('locationRadius payload',acton.payload);
            state.locationRadius = acton.payload.value
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

    locationRadius,
    type,
    minBedroom,
    maxBedroom,
    minValuation,
    maxValuation,
    maxOfferPrice
} = filterSlice.actions

export default filterSlice.reducer