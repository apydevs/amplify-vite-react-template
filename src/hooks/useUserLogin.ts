import {gql,useMutation} from "@apollo/client"


const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String, $device_name: String) {
        loginUser(email: $email, password: $password, device_name: $device_name) {
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
                message
            }
            errors
        }
    }
`;



export const useLoginUser = () => {
    const [loginUser] = useMutation(LOGIN_USER, {
        context: {
            uri: '/user', // This tells Apollo Client to use the REST link instead of the GraphQL link
        },
    });
    return loginUser;
};