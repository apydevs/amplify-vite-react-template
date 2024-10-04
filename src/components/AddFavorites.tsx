

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faDoorOpen, faHeartCircle} from "@fortawesome/pro-thin-svg-icons";

import {useEffect, useState} from "react";
import {usePropertyFav} from "../hooks/usePropertyFav.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import {addFavorites, removeFavorites} from "../store/features/favorites/favouritesSlice.tsx";


interface AddFavoritesProps {
    slug:string;
    propertyId: string;

}

export default function AddFavorites({slug, propertyId }: AddFavoritesProps) {
    const dispatch = useDispatch();
    const attemptFav = usePropertyFav(slug);

    const [isSelected,setIsSelected] = useState(false);
    const user = useSelector((state: RootState) => state.users.user);
    const faves = useSelector((state: RootState) => state.favorites.saved);
    useEffect(() => {
        console.log(faves);
        if (faves.some(fav => fav.propertyId === propertyId)) {
            setIsSelected(true);
        }
    }, [faves, propertyId]);
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
                if(data.addFavourite.id == propertyId){
                    setIsSelected(true)
                    dispatch(addFavorites({
                        propertyId:propertyId,
                        userId:data.addFavourite.userid
                    }))
                }else{
                    setIsSelected(false)
                    dispatch(removeFavorites({
                        propertyId:propertyId,
                        userId:data.addFavourite.userid
                    }))
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
