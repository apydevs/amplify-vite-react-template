import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import filterReducer from './features/searchFilters/filterSlice'
import favoritesReducer from './features/favorites/favouritesSlice.jsx'
import userReducer from  './features/user/userSlice'
export const store = configureStore({
    reducer: {
        filters: filterReducer,
        counter: counterReducer,
        favorites: favoritesReducer,
        users: userReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch