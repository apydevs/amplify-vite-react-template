import { gql, useQuery } from '@apollo/client';

// Define the GraphQL query
const GET_PROPERTY = gql`
    query getProperty($slug: String!) {
        property(slug: $slug) {
            id
            title
            slug
            excerpt
            description
            band
            condition_information
            fixtures_list
            price
            bedrooms
            bathrooms
            max_cap
            latitude
            longitude
            
        }
    }
`;

export const useGetProperty = (propertyId:string | undefined) => {

    // Execute the query using useQuery hook
    const { loading, error, data } = useQuery(GET_PROPERTY, {
        variables: { slug: propertyId },
        context: {
            uri: '/property', // Example context (optional, depends on API setup)
        },
    });

    return {
        loading,
        error,
        data,
    };
};
