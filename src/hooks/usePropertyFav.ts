import {gql,useMutation} from "@apollo/client"


const USER_FAV_PROP = gql`
    mutation addFavourite($property: String!) {
        addFavourite(property: $property) {
           property_id
        }
    }
`;



export const usePropertyFav = () => {
    const [favouriteProperty] = useMutation(USER_FAV_PROP, {
        context: {
            uri: '/profile', // This tells Apollo Client to use the REST link instead of the GraphQL link
        },
    });
    return favouriteProperty;
};
