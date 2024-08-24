import { gql, useMutation } from "@apollo/client";



const USER_SEARCH_PROPERTIES = gql`
    mutation searchProperty($limit: Int!, $page: Int!, $radius: Float!, $guestLongitude:Float, $guestLatitude:Float) {
        searchProperty(limit: $limit, page: $page, radius: $radius, guestLongitude:$guestLongitude, guestLatitude:$guestLatitude) {
            data {
                id
                title
                price
                max_cap
                excerpt
                address2
                county
            }
            total
            per_page
            current_page
            last_page
        }
    }
`

export const useSearchProperties = () => {
    const [searchLocation] = useMutation(USER_SEARCH_PROPERTIES, {
        context: {
            uri: '/property', // This tells Apollo Client to use the REST link instead of the GraphQL link
        },

    });
    return searchLocation;
}



//     return {
//         propertiesData: data?.properties.data,
//         paginatorInfo: {
//             total: data?.properties.total,
//             per_page: data?.properties.per_page,
//             current_page: data?.properties.current_page,
//             last_page: data?.properties.last_page,
//         },
//         propertiesLoading: loading,
//         propertiesError: error,
//     };
// }
