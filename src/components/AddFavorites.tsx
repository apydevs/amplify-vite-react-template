import {useEffect, useState} from "react";

import {getCurrentUser} from "aws-amplify/auth";
import { Hub } from 'aws-amplify/utils';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faDoorOpen, faHeartCircle} from "@fortawesome/pro-thin-svg-icons";
import { addFavorites ,removeFavorites } from "../store/features/favorites/favouritesSlice";

import {useDispatch, useSelector} from "react-redux";

import {UserInterface} from "../interfaces/UserInterface.tsx";
import {AddFavoritesProps} from "../interfaces/FavouriteInterface.tsx";
import {AuthEvent, PropertyFavorite} from "../interfaces/interfaces.tsx" ;
import {RootState} from "../store/store.ts";
import {createFavourite} from "../api/favouritesApi.tsx";


export default function AddFavorites({propertyId}:AddFavoritesProps) {
    const [user, setUser] = useState<UserInterface | null>(null);
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const Favs = useSelector((state: RootState) => state.favorites)
    const dispatch = useDispatch()

    useEffect(() => {
        // Function to fetch user data
        async function fetchUser() {
            try {
                const { username, userId, signInDetails } = await getCurrentUser();
                setUser({ username, userId, signInDetails });

            } catch (error) {
                console.error('Error fetching user', error);
            }
        }

        function checkFav() {
            console.log('Property ID:', propertyId);
            console.log('Saved array:', Favs);

            // Ensure Favs is an array
            if (!Array.isArray(Favs)) {
                console.error("Favs is not an array:", Favs);
                return;
            }

            // Access the array and check for favorite property
            const isFavorite = Favs.saved.some((fav: PropertyFavorite) => fav.propertyId === propertyId);
            console.log(isFavorite);
            // Log the result
            if (isFavorite) {
                console.log(`Property ID ${propertyId} is marked as favorite.`);
            } else {
                console.log(`Property ID ${propertyId} is not a favorite.`);
            }

            setIsSelected(isFavorite); // Update the state with the result

        }


        // Listen to authentication events
        const authListener = (data:AuthEvent ) => {
            const { payload } = data;

            if (!payload?.event) {
                console.error('Payload event is missing');
                return;
            }

            switch (payload.event) {
                case 'signedIn':
                case 'tokenRefresh':
                    fetchUser();  // Re-fetch the user data on sign-in or token refresh
                    break;
                case 'signedOut':
                    setUser(null);  // Clear user data on sign-out
                    break;
                default:
                    console.warn('Unknown event:', payload.event);
            }
        };
        Hub.listen('auth', authListener);

        fetchUser()
        checkFav()
        // Cleanup listener when component unmounts
        return () => {
            /* start listening for messages */
            const hubListenerCancelToken = Hub.listen('auth', (data) => {
                if(data){
                    console.log('Listening for all auth events: ', data.payload);
                }

            });
            /* later */
            hubListenerCancelToken(); // stop listening for messages
        };
    }, []);

    console.log(propertyId)
    const handleClick = async () => {
        setIsSelected(!isSelected);

        if (user && !isSelected) {
            await createFavourite({propertyId: propertyId, userId: user.userId});
            dispatch(addFavorites({property: propertyId, userId: user.userId}));
            setIsSelected(true);
        }

        if (user && isSelected) {
            dispatch(removeFavorites({propertyId: propertyId, userId: user.userId}));
        }
    };

    if (user) {

        return (   <button className={isSelected ? `text-yellow-300` : `text-red-600`} onClick={handleClick}>
                        <FontAwesomeIcon icon={faHeartCircle} className="font-semibold h-8 w-8 px-1 py-0.5" />
                  </button>
        );

    } else {
        return (
            <button className="bg-black text-white w-10 p-0.5 rounded">
                <FontAwesomeIcon icon={faDoorOpen} />
            </button>
        );
    }
}