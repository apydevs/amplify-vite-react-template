import React, {useEffect, useState} from 'react'

import { useDispatch } from "react-redux";
import { increment } from "../../store/features/counter/counterSlice.ts";


import {Link} from "react-router-dom";
import {email,name} from "../../store/features/registration/registerSlice.ts";



const SignupStep0: React.FC = () => {
    const dispatch = useDispatch();

    const [customerEmail, setCustomerEmail] = useState('');
    const [customerName, setCustomerName] = useState('');

    useEffect(() => {
        dispatch(email(customerEmail))
        dispatch(name(customerName))

    }, [customerEmail, customerName, dispatch]);





    function handleProceed() {
        //save to create form  store state
        dispatch(increment())
    }

    return (
        <section className="py-8 bg-white dark:bg-gray-900 ">
            <div className="lg:flex ">
                <div className="flex items-center mx-auto max-w-7xl  border-x px-10  pb-[16rem]">
                    <div className="w-full">
                        <div className="flex items-center justify-center mb-8 space-x-4 lg:hidden">

                        </div>
                        <ol className="flex items-center mb-6 text-sm font-medium text-center text-gray-500 dark:text-gray-400 lg:mb-12 sm:text-base">
                            {/* Steps */}
                        </ol>
                        <h1 className="mb-2 text-2xl font-extrabold leading-tight tracking-tight text-gray-900 sm:mb-6 dark:text-white">Step
                            1, Account Creation Details</h1>
                        <p className="text-sm font-medium mb-4">
                            *If you are looking to create an account to join a team, a team admin needs to invite you to
                            the team.
                            You then complete the registration process via the link sent to you.

                        </p>
                        <fieldset>
                            <legend className="mt-4 mb-2 text-lg font-light text-gray-500 dark:text-gray-400">
                                We require just a few steps to be completed, in order to create an account.
                            </legend>

                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="email"
                                           className="block text-sm font-medium leading-6 text-gray-900">Email
                                        address *</label>

                                    <div
                                        className="flex flex-row items-center justify-between  rounded-lg border-2 border-yellow-300 bg-white">
                                        <input
                                            className="m-1 px-4 py-4 w-full font-medium text-lg  border-0 border-yellow-300 focus:outline-none ring-0 focus:ring-0 placeholder:text-gray-200"
                                            type="email"
                                            value={customerEmail}
                                            onChange={(e) => setCustomerEmail(e.target.value)}
                                            placeholder="Email adderss required"
                                            id="email"
                                            name="email"
                                            autoComplete="email"
                                            required
                                        />
                                    </div>

                                </div>

                                <div>
                                    <label htmlFor="name"
                                           className="block text-sm font-medium leading-6 text-gray-900">Full
                                        Name*</label>
                                    <div
                                        className="flex flex-row items-center justify-between  rounded-lg border-2 border-yellow-300 bg-white ">
                                        <input
                                            className="m-1 px-4 py-4 w-full font-medium text-lg  border-0 border-yellow-300 placeholder:text-gray-200 focus:outline-none ring-0 focus:ring-0"
                                            id='name'
                                            name="name"
                                               type="text"
                                               value={customerName}
                                               onChange={(e) => setCustomerName(e.target.value)}
                                               placeholder="Joe bloggs"
                                               autoComplete="name"
                                               required/>
                                     </div>
                                </div>
                            </form>


                            <div
                                onClick={handleProceed}
                                className="rounded-full my-8  font-bold text-center bg-yellow-300 cursor-pointer p-2 text-black shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-auto ">
                                <span className="text-lg text-center">Proceed</span>
                            </div>

                            <p className="my-4 text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account?
                                <Link to="/login"
                                      className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Login here</Link>.
                            </p>

                        </fieldset>
                    </div>

                </div>

            </div>

        </section>
);
}

export default SignupStep0;
