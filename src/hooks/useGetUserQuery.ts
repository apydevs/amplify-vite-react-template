import {gql, useQuery} from "@apollo/client";




const GET_USER = gql`
    query GetUser($device_name: String!) {
        GetUser(device_name: $device_name) {
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
                offers
                message
            }
        
        }
`;

export const useGetUserQuery = (deviceName: string) => {
    const { loading, error, data } = useQuery(GET_USER, {
        variables: { device_name: deviceName },
        context: {
            uri: '/profile',
        },
    });
    return {
        loading,
        error,
        data,
    };
}
