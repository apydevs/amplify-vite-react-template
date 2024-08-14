import { Hub } from 'aws-amplify/utils';
import {useEffect, useState} from "react";
import {getCurrentUser} from "aws-amplify/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faDoorOpen, faHeartCircle} from "@fortawesome/pro-thin-svg-icons";

import {addFavorites, removeFavorites} from "../store/features/favorites/favouritesSlice.tsx";
import {createFavourite, removeFavourite} from "../api/favouritesApi.tsx";
import {UserInterface} from "../interfaces/UserInterface.tsx";
import {AuthEvent} from "../interfaces/interfaces.tsx" ;
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store.ts";


interface AddFavoritesProps {
    propertyId: string;
}

export default function AddFavorites({ propertyId }: AddFavoritesProps) {
    const [user, setUser] = useState<UserInterface | null>(null);
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const favourites = useSelector((state: RootState) => state.favorites.saved)
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
            favourites.forEach(item =>{
                if(item.propertyId == propertyId){
                    setIsSelected(true);
                }
            })

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

        fetchUser().then(() => checkFav());

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
    }, [favourites, isSelected, propertyId]);



    // handles adding to favourites State & Api
    const handleSelectClick = async () => {
        if (user) {
            const savedFav = await createFavourite({
                userId:user.userId,
                propertyId: propertyId
            }

            );
            console.log("resrrs", savedFav);

            if (savedFav) {

                if (!savedFav.userId || !savedFav.propertyId) {
                    throw new Error('Favourite object is missing required user or property identifiers');
                } else {

                    const data = {

                        userId: savedFav.userId,
                        propertyId: savedFav.propertyId,
                        // Assumes this relationship is handled correctly elsewhere
                    };
                    dispatch(addFavorites(data)); // Dispatch the result
                }



                }
            }
        }



    // handles removing from favourites State & Api
    const handleDeselect = async () => {
        const index = favourites.findIndex(obj => obj.propertyId === propertyId);
        if(index >= 0){
            const id = favourites[index].id
            console.log('remove id',index)
            try {
                if (user && "userId" in user && id !== undefined) { // Ensure id is not undefined
                    await removeFavourite(id);
                    dispatch(removeFavorites({propertyId: propertyId, userId: user.userId}));
                    setIsSelected(false);
                }
            }catch (e){
                console.log('error fav',e)
            }
        }
    };

    if (user) {

        if (!propertyId) {
            console.error('AddFavorites component requires a valid propertyId');
            return null; // Or some fallback UI
        }

        return (   <button className={isSelected ? `text-yellow-300` : `text-red-600`}
                           onClick={!isSelected ? handleSelectClick : handleDeselect}>
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