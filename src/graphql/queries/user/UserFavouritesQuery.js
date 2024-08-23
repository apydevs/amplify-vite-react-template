// src/queries.js

import { gql } from '@apollo/client';

export const GET_USER_FAVOURITES = gql`
    query {
        favourites {
            id,
            property {
                excerpt,
                tenure,title
            }
        }
    }
`;