// src/queries.js

import { gql } from '@apollo/client';

export const LOGOUT_USER = gql`
    query {
        userLogout
    }
`;