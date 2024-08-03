import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
    DataItem,
    DataRadiusItem, PropertyFilter
} from "../../../interfaces/interfaces.tsx";

// Initial state type
type LocationState = { id: number; name: string }[];

const initialState = {
    locations: [
        { id: 1, name: 'New York' },
        { id: 2, name: 'Los Angeles' },
    ]as LocationState,
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
        locations: (state, action: PayloadAction<PropertyFilter>) => {
            // Extract LocationType[] from PropertyLocations[]
            // const locationList = action.payload.locations.reduce<LocationType[]>((acc, loc) => {
            //     return loc.locations ? [...acc, ...loc.locations] : acc;
            // }, []);
            //
            // // Assign extracted LocationType[] to state.locations
            // state.locations = locationList.map((location) => ({
            //     id: location.id,
            //     name: location.name,
            // }));

            console.log('locations payload',state, action.payload);
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
    locationRadius,
    type,
    minBedroom,
    maxBedroom,
    minValuation,
    maxValuation,
    maxOfferPrice
} = filterSlice.actions

export default filterSlice.reducer