import {gql,useMutation} from "@apollo/client"


const REGISTER_USER = gql`
    mutation createUser($name: String,$email: String!, $password: String!, $confirm_password: String!,$device_name: String!, $account: String!) {
        createUser(
            name:$name,
            email: $email,
            password: $password,
            confirm_password:$confirm_password,
            device_name: $device_name,
            account: $account
        ) {
            user {
                id
                email
                token
                name
                device_name
                locations {
                    locationId,name,latitude,longitude
                }
                favourites {
                    property
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



export const useNewUser = () => {

        const [registerUser] = useMutation(REGISTER_USER, {
            context: {
                uri: '/user', // This tells Apollo Client to use the REST link instead of the GraphQL link
            },
        });
        return registerUser;

};