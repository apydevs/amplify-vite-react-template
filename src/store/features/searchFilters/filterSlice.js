import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    locations: [
        { id: 1, name: 'New York' },
        { id: 2, name: 'Los Angeles' },
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
        locations: (state,acton) => {
            state.locations = acton.payload.locations
            console.log('locations payload',acton.payload);
        },
        locationRadius: (state,acton) => {
            state.locationRadius = acton.payload
        },
        type: (state,acton) => {
            state.type = acton.payload.name
            console.log('type payload',acton.payload);
            console.log('type reduced',state.type);
        },
        minBedroom: (state,acton) => {
            console.log('type payload',acton.payload);
            state.minBedroom = acton.payload
        },
        maxBedroom: (state,acton) => {
            state.maxBedroom = acton.payload
        },
        minValuation: (state,acton) => {
            state.minValuation = acton.payload.value
        },
        maxValuation: (state,acton) => {
            state.maxValuation = acton.payload.value
        },

        maxOfferPrice: (state,acton) => {
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