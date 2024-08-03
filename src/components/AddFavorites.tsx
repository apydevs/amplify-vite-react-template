import {useEffect, useState} from "react";

import {getCurrentUser} from "aws-amplify/auth";
import { Hub } from 'aws-amplify/utils';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faDoorOpen, faHeartCircle} from "@fortawesome/pro-thin-svg-icons";
import { addFavorites ,removeFavorites } from "../store/features/favorites/favouritesSlice";

import {useDispatch} from "react-redux";

import {UserInterface} from "../interfaces/UserInterface.tsx";
import {AddFavoritesProps} from "../interfaces/FavouriteInterface.tsx";
import {PropertyFavoriteInterface,} from "../interfaces/PropertyInterface.tsx";
import {AuthEvent} from "../interfaces/interfaces.tsx" ;

export default function AddFavorites({propertyId}:AddFavoritesProps) {
    const [user, setUser] = useState<UserInterface | null>(null);
    const [fav, setFav] = useState<PropertyFavoriteInterface | null>(null);
    const [isSelected, setIsSelected] = useState<boolean>(false);
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
    const handleClick = () => {
        setIsSelected(!isSelected);

        if (user && !isSelected) {
            dispatch(addFavorites({ property_id: propertyId, user_id: user.userId }));
            setFav({id: "", property_id: propertyId, user_id: user.userId });
        }

        if (user && isSelected) {
            dispatch(removeFavorites({ property_id: propertyId, user_id: user.userId }));
        }
    };

    if (user) {
        if (fav && fav.property_id === propertyId && fav.user_id === user.userId) {
            return (<span>No Favorite</span>);
        } else {
            return (
                <button className={isSelected ? `text-yellow-300` : `text-red-600`} onClick={handleClick}>
                    <FontAwesomeIcon icon={faHeartCircle} className="font-semibold h-8 w-8 px-1 py-0.5" />
                </button>
            );
        }
    } else {
        return (
            <button className="bg-black text-white w-10 p-0.5 rounded">
                <FontAwesomeIcon icon={faDoorOpen} />
            </button>
        );
    }
}