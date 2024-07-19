import { useEffect, useState } from 'react';
import { getCurrentUser,signOut } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {useNavigate} from 'react-router-dom';
// Define an interface for the user data
interface UserData {
    username: string;
    userId: string;
    signInDetails: any; // Adjust according to the actual data type you expect
}

async function handleSignOut() {
    await signOut();
}

function handleAccount() {
    console.log("AccountSettings");
}

function App() {
    const naviation = useNavigate();
    // Initialize state with the correct type, which can be UserData or null
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        // Function to fetch user data
        async function fetchUser() {
            try {
                const { username, userId, signInDetails } = await getCurrentUser();
                setUser({ username, userId, signInDetails });
            } catch (error) {
                console.error("Failed to fetch user details:", error);
                setUser(null);
                naviation('/login');
            }
        }

        // Listen to authentication events
        const authListener = (data:any) => {
            const { payload } = data;
            switch (payload.event) {
                case 'signedIn':
                case 'tokenRefresh':
                    fetchUser();  // Re-fetch the user data on sign-in or token refresh
                    naviation('/account');
                    break;
                case 'signedOut':
                    setUser(null);  // Clear user data on sign-out
                    naviation('/login');
                    break;
            }
        };

        Hub.listen('auth', authListener);


            fetchUser()


        // Cleanup listener when component unmounts
        return () => {

        };
    }, []);

    if (user) {
        return (

        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {user.username}
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="py-1">

                    <MenuItem>
                        <button
                            onClick={handleAccount}
                            type="button"
                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                          Account Settings
                        </button>
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
        );
    } else {
        return (
            <div className="flex flex-row items-center justify-between">
                <span>Login </span><span>Signup</span>
            </div>
        );
    }
}

export default App;
