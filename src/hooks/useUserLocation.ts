import {gql,useMutation} from "@apollo/client"


const USER_LOCATION_ADD = gql`
    mutation addLocation ($name: String!, $longitude: Float!, $latitude: Float!, $locationId: String!)  {
        addLocation(name: $name, longitude: $longitude, latitude:$latitude,locationId:$locationId)  {
            id,
            locationId,
            name,
            longitude,
            latitude

        }
    }
`;
export const useUserLocationAdd = () => {
    const [addLocation] = useMutation(USER_LOCATION_ADD, {
        context: {
            uri: '/locations', // This tells Apollo Client to use the REST link instead of the GraphQL link
        },
    });
    return addLocation;
};



const USER_LOCATION_REMOVE = gql`
    mutation removeLocation ($id: String!)  {
        removeLocation(id: $id)  {
            complete
        }
    }
`;
export const useUserLocationRemove = () => {
    const [removeLocation] = useMutation(USER_LOCATION_REMOVE, {
        context: {
            uri: '/locations', // This tells Apollo Client to use the REST link instead of the GraphQL link
        },
    });
    return removeLocation;
};