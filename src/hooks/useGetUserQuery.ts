import {gql, useQuery} from "@apollo/client";




const GET_USER = gql`
    query( $deviceName: String!) {
        GetUser(device_name:$deviceName){
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

export const useGetUserQuery = (deviceName:string) => {
    const { loading, error, data } =  useQuery(GET_USER, {
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

