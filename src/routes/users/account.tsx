
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import outputs from './../../../amplify_outputs.json'; // Adjust the path as needed
import '@aws-amplify/ui-react/styles.css';
import { useSelector} from "react-redux";
import { RootState } from '../../store/store.ts';
import {useEffect, useState} from "react";


Amplify.configure(outputs);



function Account() {

    const [isLoading, setIsLoading] = useState(true);
    const favorites = useSelector((state: RootState) => state.favorites.saved)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            if (favorites) {
                   setIsLoading(false );
                }
            }
        fetchData();
    }, []); // Depend on informationId to re-fetch when it changes
    if (isLoading) {
        return <div>Loading...</div>;
    }

    else

    return (
        <>
<div className="bg-blue-50 py-16">
    <Authenticator>
        {({signOut, user}) => (
            <>
            <div className="container max-w-7xl mx-auto">
                <div className="flex flex-row justify-between items-center ">
                    <h1 className="text-2xl " >Welcome:<span className="font-semibold"> {user?.username} </span></h1>
                    <div>Account Type:<span className="font-bold">Buyer</span></div>
                </div>
            </div>
            <div className="container max-w-7xl mx-auto my-4 bg-white rounded-2xl p-10">






                <div className="flex items-center justify-between items-center ">
                    <div className="border-b pb-5">
                        <div className="text-gray-800 text-xs font-semibold text-center border-2 border-black  p-2 h-20 w-20 ">Saved<br/>Properties<br/><span className="text-2xl mx-auto self-center mt-3">{favorites.length}</span></div>
                    </div>

                    <div className="flex items-stretch w-full overflow-hidden overflow-x-auto scrollbar-hidden no-scrollbar border-b pb-5">
                        <div className="h-100 border-l mx-4"></div>
                        <div className="flex flex-nowrap  space-x-1.5 space-x-1.5">


                            {favorites.map((propertyObj,index) => (
                                    <div key={index} className="w-20 h-20">
                                        <img  alt={propertyObj.property} className="object-cover w-full h-full rounded" src="https://imgyeoley.s3.eu-west-2.amazonaws.com/profile-photos/3-bedroom-detached-house-for-saleref83852bd2-aa43-4ce5-8a46-6987a7c21134/e6112e9f-ff3e-4a0f-bb8f-7510c136d650.jpg"/>
                                        {propertyObj.id}
                                    </div>
                                ))}
                            {favorites.map((propertyObj,index) => (
                                <div key={index} className="w-20 h-20">
                                    <img  alt={propertyObj.id} className="object-cover w-full h-full rounded" src="https://imgyeoley.s3.eu-west-2.amazonaws.com/profile-photos/3-bedroom-detached-house-for-saleref83852bd2-aa43-4ce5-8a46-6987a7c21134/e6112e9f-ff3e-4a0f-bb8f-7510c136d650.jpg"/>
                                    {propertyObj.id}
                                </div>
                            ))}

                            <a href="http://127.0.0.1:8000/property/3-bedroom-detached-house-for-saleref83852bd2-aa43-4ce5-8a46-6987a7c21134" className="h-20 w-20">
                                <img className="object-cover w-full h-full rounded" src="https://imgyeoley.s3.eu-west-2.amazonaws.com/profile-photos/3-bedroom-detached-house-for-saleref83852bd2-aa43-4ce5-8a46-6987a7c21134/e6112e9f-ff3e-4a0f-bb8f-7510c136d650.jpg"/>
                            </a>
                            <a href="http://127.0.0.1:8000/property/3-bedroom-semi-detached-house-for-saleref3bbf0836-5c9e-4797-8197-d4add5cb0c12" className="h-20 w-20">
                                <img className="object-cover w-full h-full rounded" src="https://imgyeoley.s3.eu-west-2.amazonaws.com/profile-photos/3-bedroom-semi-detached-house-for-saleref3bbf0836-5c9e-4797-8197-d4add5cb0c12/bbe03c9c-1ea2-4177-b88e-66adb1b24e30.jpg"/>
                            </a>
                        </div>
                    </div>

                    <div className="md:flex items-center gap-x-2 hidden ">

                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20">
                    <div>
                        <h2 className="text-2xl font-bold my-4">Your Account Stats </h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <div className="p-4 bg-green-100 rounded-xl flex justify-between items-center">
                                    <div className="font-bold text-xl text-gray-800 leading-none">New Messages: 0 </div>
                                    <div className="mt-5">
                                        <a href="http://127.0.0.1:8000/buyer/messages" type="button" className="inline-flex items-center justify-center py-2 px-3 rounded-xl hover:bg-black  bg-white text-gray-800 hover:text-white text-sm font-semibold transition">
                                            Read Messages
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-yellow-100 rounded-xl text-gray-800">

                                <div className="font-bold text-2xl leading-none">£0.00</div>
                                <span className="pt-2">Your average offer made.</span>
                            </div>
                            <div className="p-4 bg-yellow-100 rounded-xl text-gray-800">
                                <div className="flex flex-col md:flex-row  justify-between items-center">
                                    <div className="font-bold text-2xl leading-none">  0</div>
                                    <button type="button" className="inline-flex lg:block hidden items-center justify-center py-2 px-3 rounded-xl hover:bg-black  bg-white text-gray-800 hover:text-white text-sm font-semibold transition">
                                        View Offers
                                    </button>
                                </div>
                                <span className="pt-2">Offers placed on active properties.</span>
                            </div>
                            <div className="col-span-2">
                                <div className="p-4 bg-purple-100 rounded-xl text-gray-800">
                                    <div className="flex flex-col md:flex-row  justify-between items-center">
                                        <div className="font-bold text-xl text-center md:text-left leading-none">Daily Hint</div>
                                        <button type="button" className="inline-flex lg:block hidden items-center justify-center py-2 px-3 rounded-xl hover:bg-black  bg-white text-gray-800 hover:text-white text-sm font-semibold transition">
                                            Activate Hint
                                        </button>
                                    </div>
                                    <div className="flex flex-col md:flex-row  justify-between items-center">
                                        <div className="mt-2">1 of 1 used</div>
                                        <div className="mt-2 text-xs">Applicable to properties you have made offers on.</div>

                                    </div>
                                    <div className="mx-auto w-full text-center">
                                        <button type="button" className="inline-flex lg:hidden mt-5  items-center justify-center py-2 px-3 rounded-xl hover:bg-black  bg-white text-gray-800 hover:text-white text-sm font-semibold transition">
                                            Activate Hint
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>


                    <div>
                        <h2 className="text-2xl font-bold  my-4">Recent Activity</h2>

                        <div className="space-y-4">
                            <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                                <div className="flex justify-between">
                                    <div className="text-gray-400 text-xs">10/02/2024</div>
                                    <div className="text-gray-400 text-xs">4h</div>
                                </div>
                                <a href="#" className="font-bold hover:text-yellow-800 hover:underline">36 Offers placed on property:</a>
                                <div className="text-sm text-gray-600 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="text-gray-800 inline align-middle mr-1" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                                    </svg>
                                    <span>Property Name Here</span>
                                </div>
                            </div>
                            <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                                <div className="flex justify-between">
                                    <div className="text-gray-400 text-xs">12/2/2024</div>
                                    <div className="text-gray-400 text-xs">2d</div>
                                </div>
                                <a href="#" className="font-bold hover:text-yellow-800 hover:underline">Credits Purchased </a>
                                <div className="text-sm text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="text-gray-800 inline align-middle mr-1" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                                    </svg>
                                    <span>10 All Property Credits purchased. </span>
                                </div>
                            </div>
                            <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                                <div className="flex justify-between">
                                    <div className="text-gray-400 text-xs">12/2/2024</div>
                                    <div className="text-gray-400 text-xs">2d</div>
                                </div>
                                <a href="#" className="font-bold hover:text-yellow-800 hover:underline">Message Sent</a>
                                <div className="text-sm text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="text-gray-800 inline align-middle mr-1" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                                    </svg>
                                    <span>Message sent to agent ***** </span>
                                </div>
                            </div>

                        </div>
                    </div>


                </div>
                {/*<div>{user?.username}</div>*/}
                <button onClick={signOut}>Sign out</button>
            </div>
            </>
        )}
    </Authenticator>
</div>

        </>
    );
}

export default Account;
