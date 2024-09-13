import React from "react";
import ReactDOM from "react-dom/client";
import {store, persistor} from './store/store'
import {Provider} from 'react-redux'
import Root from "./routes/root.tsx";
import ErrorPage from './error-page.tsx';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";




import Search from "./routes/search.tsx";
import PropertyDetails from "./routes/properties/property-details.tsx";
import SearchResults from "./routes/search/search-results.tsx";
import Information from "./routes/information.tsx";
import Login from "./routes/auth/login.tsx";
import Account from "./routes/users/account.tsx";
import PropertyImageGallery from "./routes/properties/propertyImageGallery.tsx";
import Homepage from "./routes/homepage.tsx";
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Join from "./routes/auth/join.tsx";





// const apiUrl = import.meta.env.VITE_NODE_ENV === 'production' ? 'https://graphql.yeoley.com/graphql' : 'http://127.0.0.1:8000/graphql';
// const apiUrl = 'https://graphql.yeoley.com/graphql';
const apiUrl = 'http://127.0.0.1:8000/graphql';

//Base GraphQL endpoint link
const baseHttpLink = new HttpLink({
    uri: apiUrl, // Base URL
    credentials: 'same-origin',
});

const dynamicUriLink = new ApolloLink((operation, forward) => {
    // Get the specific URI from context, if provided
    const customUri = operation.getContext().uri;
    // Retrieve the token from the Redux store directly
    const state = store.getState(); // Access the current Redux state
    const user = state.users.user;

    // Modify the operation's URI by appending the context URI to the base
    if (customUri) {
        operation.setContext({
            uri: `${apiUrl}${customUri}`,
        });
    }

    if(user.token){
        const token = user.token; // Retrieve the token from localStorage or any secure storage
        //if (customUri === '/locations' || ) {

             if (token) {
                operation.setContext(({ headers = {} }) => ({
                    headers: {
                        ...headers,
                        Authorization: `Bearer ${token}`, // Add the Bearer token
                    },
                }));
            }
        //}
    }
    // Check if the request is for 'locations' and add the Bearer token


    // Continue the request to the next link in the chain
    return forward(operation);
});
// Combine dynamicUriLink with the baseHttpLink
const link = ApolloLink.from([dynamicUriLink, baseHttpLink]);



// Create the Apollo Client
const client = new ApolloClient({
    link,
    cache:new InMemoryCache(),
    credentials: 'same-origin', // or 'include' if you're using cookies

});
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Homepage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/login",
                element: <Login />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/join",
                element: <Join/>,
                errorElement: <ErrorPage />,
            },

            {
                path: "/account",
                element:
                    <ProtectedRoute>
                         <Account />
                    </ProtectedRoute>,

                errorElement: <ErrorPage />,
            },

            {
                path: "/information",
                element: <Information />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/information/:informationId",
                element: <Information/>,
                errorElement: <ErrorPage />,
            },
            {
                path: "/search",
                element: <Search />,
                errorElement: <ErrorPage />,
            },

            {
                path: "/search/properties",
                element: <SearchResults />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/search/properties/:propertyId",
                element: <PropertyDetails />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/search/properties/:propertyId/gallery",
                element: <PropertyImageGallery/>,
                errorElement: <ErrorPage />,
            },
        ],
    },

]);


ReactDOM.hydrateRoot(document.getElementById('root')!,
    <React.StrictMode>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <ApolloProvider client={client}>
                <RouterProvider router={router} />
            </ApolloProvider>
          </PersistGate>
      </Provider>
  </React.StrictMode>
);
