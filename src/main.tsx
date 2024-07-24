import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
/* existing imports */
import Root from "./routes/root.tsx";
import ErrorPage from './error-page.tsx';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";



import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import Search from "./routes/search.tsx";
import PropertyDetails from "./routes/properties/property-details.tsx";
import SearchResults from "./routes/search/search-results.tsx";
import Information from "./routes/information.tsx";
import Login from "./routes/auth/login.tsx";
import Account from "./routes/users/account.tsx";
import PropertyImageGallery from "./routes/properties/propertyImageGallery.tsx";
import Homepage from "./routes/homepage.tsx";
Amplify.configure(outputs);

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
                path: "/account",
                element: <Account />,
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
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
