

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faDoorOpen, faHeartCircle} from "@fortawesome/pro-thin-svg-icons";

import {useEffect, useState} from "react";
import {usePropertyFav} from "../hooks/usePropertyFav.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import {addFavorites, removeFavorites} from "../store/features/favorites/favouritesSlice.tsx";
import {setUserDetails} from "../store/features/user/userSlice.ts";


interface AddFavoritesProps {
    slug:string;
    propertyId: string;

}
interface FavouriteType {
    propertyId: string;
    slug: string;
    // Add other fields for Property as needed
}


export default function AddFavorites({slug, propertyId }: AddFavoritesProps) {
    const dispatch = useDispatch();
    const attemptFav = usePropertyFav(slug);

    const [isSelected,setIsSelected] = useState(false);
    const user = useSelector((state: RootState) => state.users.user);
    const [favorites, setFavorites] = useState<FavouriteType[]>([]);

    useEffect(() => {
        // Ensure that user.favourites is an array before setting the state
        if (user && Array.isArray(user.favourites)) {
            setFavorites(user.favourites);
        } else {
            setFavorites([]); // Fallback to an empty array if favourites is null/undefined
        }
    }, [user]); // Depend on user to update when it changes

    useEffect(() => {
        if (favorites.some(fav => fav.slug === slug)) {
            setIsSelected(true);
        }
    }, [favorites, slug]);
    // handles adding to favourites State & Api
    async function handleSelectClick() {

        console.log('selected',slug,propertyId)

            // Trigger the mutation with correct variables
            const {data, errors} = await attemptFav();


            if (errors && errors.length > 0) {
                console.log(' GraphQL errors:', errors);
                return; // Exit early on errors
            }
            if (data) {

                console.log('data',data)


                console.log('RESULT:', data);
                if(data.addFavourite.slug == propertyId){
                    setIsSelected(true)
                    dispatch(setUserDetails({
                        email: data.addFavourite.user.email,
                        name: data.addFavourite.user.name,
                        token: data.addFavourite.user.token,
                        account: data.addFavourite.user.account.type,
                        offers: data.addFavourite.user.offers,
                        device_name:data.addFavourite.user.device_name,
                        favourites:data.addFavourite.user.favourites
                    }));
                }else{
                    setIsSelected(false)
                    dispatch(setUserDetails({
                        email: data.addFavourite.user.email,
                        name: data.addFavourite.user.name,
                        token: data.addFavourite.user.token,
                        account: data.addFavourite.user.account.type,
                        offers: data.addFavourite.user.offers,
                        device_name:data.addFavourite.user.device_name,
                        favourites:data.addFavourite.user.favourites
                    }));
                }
                return; // Exit early on errors
            }


        console.log('test select')
    }


    if (user.token) {
        if (!propertyId) {
            console.error('AddFavorites component requires a valid propertyId');
            return null; // Or some fallback UI
        }
        return (   <button className={isSelected ? `text-yellow-300` : `text-red-600`}
                           onClick={handleSelectClick} >
                        <FontAwesomeIcon icon={faHeartCircle} className="font-semibold h-8 w-8 px-1 py-0.5" />
                  </button>
        );
    } else {
        return (
            <button className="bg-black text-white w-10 p-0.5 rounded">
                <FontAwesomeIcon icon={faDoorOpen}/>
            </button>
        );
    }
}
