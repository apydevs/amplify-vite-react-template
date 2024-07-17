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
import PropertyDetails from "./routes/property-details.tsx";
import SearchResults from "./routes/search-results.tsx";
import Information from "./routes/information.tsx";
Amplify.configure(outputs);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/information",
                element: <Information />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/information/:information",
                element: <Information/>,
                errorElement: <ErrorPage />,
                // with this data loaded before rendering
                loader: async ({ request, params }) => {
                    return fetch(
                        `/fake/api/teams/${params.teamId}.json`,
                        { signal: request.signal }
                    );
                },

                // performing this mutation when data is submitted to it
                action: async ({ request }) => {
                    return updateFakeTeam(await request.formData());
                },

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
                children: [
                    {
                        path: "/search/properties/property/:propertyId",
                        element: <PropertyDetails />,
                    },
                ],
            },
        ],
    },

]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
