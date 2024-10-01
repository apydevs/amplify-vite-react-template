import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {Link, useNavigate} from 'react-router-dom';
// Define an interface for the user data
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import {setLogout, setUserOffers} from "../store/features/user/userSlice.ts";
import {setLocations} from "../store/features/locations/locationSlice.ts";
import {locationRadius, type} from "../store/features/searchFilters/filterSlice.ts";
import {useGetUserQuery} from "../hooks/useGetUserQuery.ts";
import {useEffect} from "react";






const App = () => {

    const navigate = useNavigate();
    //const token = useSelector((state: RootState) => state.users.user.token);
    const user = useSelector((state: RootState) => state.users.user);
    const { loading, error, data } = useGetUserQuery( 'device not needed');
    const dispatch = useDispatch();
    const handleSignOut = async () => {
        try {

            dispatch(setLogout())
            dispatch(setLocations({locations:[]}))
            dispatch(type( { id: 1, name: 'All' }))
            dispatch(locationRadius( { "value": 0.0}))
            console.log('attempt sign out');  // Now safe to access `message`
            navigate('/login')

        } catch (error) {
            if (error instanceof Error) {
                console.log('Login failed:', error.message);  // Now safe to access `message`
            }
        }
    };


    useEffect(() => {
        if (loading) {
            console.log('Loading user data...');
            return;
        }

        if (error) {
            console.log('Login failed with GraphQL errors:', error);
            return;
        }
        // Update the document title using the browser API
        if(user.token && data) {
            dispatch(setUserOffers({
                offers: data.GetUser.offers,
            }));
        }
    });




    if (user.token) {
        return (
            <div>
                <Menu as="div" className="relative inline-block text-left">
                    <div className="mx-3">
                        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white px-4 py-2 text-[8pt] font-semibold  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            {user.offers ?? 0}
                         </MenuButton>
                    </div>

                    <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                        <div className="py-1">

                            <MenuItem>
                                <Link
                                    to="#"
                                    type="button"
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                >
                                    Exclusive Offers 1
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <button
                                    type="button"
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                >
                                  Any Property 4
                                </button>
                            </MenuItem>
                        </div>
                    </MenuItems>
                </Menu>
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-2xl bg-white px-3 py-2 text-[8pt] font-semibold  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            {user.name}
                            <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                        </MenuButton>
                    </div>

                    <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                        <div className="py-1">

                            <MenuItem>
                                <Link
                                    to="/account"
                                    type="button"
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                >
                                    My Yeoley
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <button
                                    onClick={handleSignOut}
                                    type="button"
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                >
                                    Sign out
                                </button>
                            </MenuItem>
                        </div>
                    </MenuItems>
                </Menu>
            </div>

        );
    } else {
        return (
            <div className="flex flex-row items-center gap-8 justify-between">
                <Link to="/login" >Login</Link>
                <Link to="/join" >Create Account </Link>
            </div>
        );
    }
}


export default App;
