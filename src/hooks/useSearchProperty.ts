import { gql, useMutation } from "@apollo/client";
import {useSelector} from "react-redux";
import {RootState} from "../store/store.ts";



const USER_SEARCH_PROPERTIES = gql`
    mutation searchProperty(
        $limit: Int!,
        $page: Int!,
        $radius: Float!,
        $propertyType:String,
        $minValuation:Float,
        $maxValuation:Float,
        $minBedroom :Int,
        $maxBedroom:Int,
        $guestLongitude:Float,
        $guestLatitude:Float
        $order:String
    
    ) {
        searchProperty(
            limit: $limit,
            page: $page,
            radius: $radius,
            order:$order,
            propertyType:$propertyType,
            minValuation:$minValuation,
            maxValuation:$maxValuation,
            minBedroom:$minBedroom,
            maxBedroom:$maxBedroom,
            guestLongitude:$guestLongitude,
            guestLatitude:$guestLatitude
        
        ) {
            data {
                id
                title
                slug
                price
                max_cap
                excerpt
                address2
                county
                bedrooms
                bathrooms
                is_featured
                
                
            }
            total
            per_page
            current_page
            last_page
        }
    }
`

export const useSearchProperties = () => {
    const user = useSelector((state: RootState) => state.users.user);
    const [searchLocation] = useMutation(USER_SEARCH_PROPERTIES, {
        context: {
            uri: user.token ?'/properties':'/property', // This tells Apollo Client to use the REST link instead of the GraphQL link
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
