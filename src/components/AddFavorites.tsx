

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faDoorOpen, faHeartCircle} from "@fortawesome/pro-thin-svg-icons";

// import {addFavorites, removeFavorites} from "../store/features/favorites/favouritesSlice.tsx";
//
// import {UserInterface} from "../interfaces/UserInterface.tsx";
// import {AuthEvent} from "../interfaces/interfaces.tsx" ;
// import {useDispatch, useSelector} from "react-redux";
// import {RootState} from "../store/store.ts";
import {useState} from "react";


interface AddFavoritesProps {
    propertyId: string;
}

export default function AddFavorites({ propertyId }: AddFavoritesProps) {


    const [isSelected] = useState(false);
    const [user] = useState({
        email:'',
        username:'',
    });



    // handles adding to favourites State & Api



    // handles removing from favourites State & Api

    if (user) {
        if (!propertyId) {
            console.error('AddFavorites component requires a valid propertyId');
            return null; // Or some fallback UI
        }
        return (   <button className={isSelected ? `text-yellow-300` : `text-red-600`}
                           // onClick={!isSelected ? handleSelectClick : handleDeselect}
            >
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