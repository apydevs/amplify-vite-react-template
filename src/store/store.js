import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import filterReducer from './features/searchFilters/filterSlice.js'
export const store = configureStore({
    reducer: {
        filters: filterReducer,
        counter: counterReducer,
    },
})