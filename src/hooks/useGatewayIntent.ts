import { gql, useMutation } from "@apollo/client";



const GATEWAY_INTENT = gql`
    mutation paymentIntent(
        $pid: Int!,
    
    ) {
        paymentIntent(
            pid: $pid,
        ) {
           
                object,
                client_secret
         
        }
    }
`

export const useGatewayIntent = () => {
    const [intent] = useMutation(GATEWAY_INTENT, {
        context: {
            uri: '/gateways',
        },
    });
    return intent;
}

