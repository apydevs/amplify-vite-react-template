import {gql, useQuery} from "@apollo/client";




const GET_USER = gql`
    query {
        GetUser{
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
            errors
        }
    }
`;

export const useGetUserQuery = () => {
    const { loading, error, data } =  useQuery(GET_USER, {
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

