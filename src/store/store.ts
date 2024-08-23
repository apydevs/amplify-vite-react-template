import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import locationReducer from './features/locations/locationSlice.ts'
import filterReducer from './features/searchFilters/filterSlice'
import favoritesReducer from './features/favorites/favouritesSlice.jsx'
import userReducer from  './features/user/userSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';


// Separate persist configurations for each reducer
const userPersistConfig = {
    key: 'user',
    storage,
};

const locationPersistConfig = {
    key: 'locations',
    storage,
    debug: true, // Add debug to see logs in the console
};
const filtersPersistConfig = {
    key: 'filters',
    storage,
    debug: true, // Add debug to see logs in the console
};

const favoritesPersistConfig = {
    key: 'favorites',
    storage,
};




// Apply the persist reducer to the user reducer
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedLocationReducer = persistReducer(locationPersistConfig, locationReducer);
const persistedFavoritesReducer = persistReducer(favoritesPersistConfig, favoritesReducer);
const persistedSearchFiltersReducer = persistReducer(filtersPersistConfig, filterReducer);


export const store = configureStore({
    reducer: {
        filters: persistedSearchFiltersReducer,
        counter: counterReducer,
        locations:persistedLocationReducer,
        favorites: persistedFavoritesReducer,
        users: persistedUserReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,  // Disable serializability check for redux-persist actions
        }),
    devTools: process.env.NODE_ENV === 'development',
})

// Configure persistor
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch