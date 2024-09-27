import {gql, useQuery} from "@apollo/client";




const OFFER_PACKS = gql`
    query {
        OfferPack {  
            id
            title
            information
            exclusive
            price
            offer
            property_id_exclusive
            selected
            features
        }
    }
`;

export const useOfferPacks = () => {
    const { loading, error, data } =  useQuery(OFFER_PACKS, {
        context: {
            uri: '/properties',
        },
    });
    return {
        loading,
        error,
        data,
    };
}

