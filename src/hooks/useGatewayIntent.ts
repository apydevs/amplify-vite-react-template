import { gql, useMutation } from "@apollo/client";



const GATEWAY_INTENT = gql`
    mutation paymentIntent(
        $amount: Float!,
    
    ) {
        paymentIntent(
            amount: $amount,
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

