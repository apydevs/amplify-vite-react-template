import {gql,useMutation} from "@apollo/client"


const USER_FAV_PROP = gql`
    mutation addFavourite($property: String!) {
        addFavourite(property: $property) {

            user {
                id
                email
                token
                name
                device_name
                locations {
                    locationId,name,latitude,longitude
                }
                account {
                    type
                }
                favourites {
                    slug
                    title
                }
                offers
                message

            }
            errors
        }
        
    }
`;



export const usePropertyFav = (property:string) => {
    const [favouriteProperty] = useMutation(USER_FAV_PROP, {
        variables: {
            property: property,
        },
        context: {
            uri: '/profile', // This tells Apollo Client to use the REST link instead of the GraphQL link
        },
    });
    return favouriteProperty;
};
