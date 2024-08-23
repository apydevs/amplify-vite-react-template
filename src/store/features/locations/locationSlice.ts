import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Location, Locations, RemoveLocationType} from "../../../types/LocationType.ts";




const initialState: Locations = {
    locations: [],
};

const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {


        setLocations: (state, action: PayloadAction<Locations>) => {

            state.locations = action.payload.locations;
            console.log('test set locations',action.payload)


        },
        addLocation: (state, action: PayloadAction<Location>) => {
            state.locations.push(action.payload);
        },


        removeLocation: (state, action: PayloadAction<RemoveLocationType>) => {


            const index = state.locations.findIndex((loc) => loc.locationId === action.payload.id);
            console.log('index is ',index)
            if (index !== -1) {
                state.locations.splice(index, 1);
            }
        },
    },
});

export const { addLocation, setLocations,removeLocation } = locationsSlice.actions;

export default locationsSlice.reducer;
