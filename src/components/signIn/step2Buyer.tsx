import React, {useState} from 'react'

import { useDispatch } from "react-redux";
import {decrement, increment} from "../../store/features/counter/counterSlice.ts";
import {Link} from "react-router-dom";



const Step2GeneralBuyer: React.FC = () => {
    const dispatch = useDispatch();

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    function handlePrevious() {
        dispatch(decrement())
    }
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
                          The last Step ! </h1>
                        <p className="text-sm font-medium mb-4">
                            *If you are looking to create an account to join a team, a team admin needs to invite you to
                            the team.
                            You then complete the registration process via the link sent to you.

                        </p>
                        <fieldset>
                            <legend className="mt-4 mb-2 text-lg font-light text-gray-500 dark:text-gray-400">
                                We will send you an email to confirm your account, we may also send a conformation code
                                to the phone number provided for additional verification.
                            </legend>

                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="phone"
                                           className="block text-sm font-medium leading-6 text-gray-900">Contact Number
                                        *</label>

                                    <div
                                        className="flex flex-row items-center justify-between  rounded-lg border-2 border-yellow-300 bg-white">
                                        <input
                                            className="m-1 px-4 py-4 w-full font-medium text-lg  border-0 border-yellow-300 focus:outline-none ring-0 focus:ring-0 placeholder:text-gray-200"
                                            type="phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="Contact Number"
                                            id="phone"
                                            name="phone"
                                            autoComplete='mobile tel'
                                            required
                                        />
                                    </div>

                                </div>

                                <div>
                                    <label htmlFor="password"
                                           className="block text-sm font-medium leading-6 text-gray-900">Password*</label>
                                    <div
                                        className="flex flex-row items-center justify-between  rounded-lg border-2 border-yellow-300 bg-white ">
                                        <input
                                            className="m-1 px-4 py-4 w-full font-medium text-lg  border-0 border-yellow-300 placeholder:text-gray-200 focus:outline-none ring-0 focus:ring-0"
                                            id='password'
                                            name="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="***********"
                                            required/>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Confirm"
                                           className="block text-sm font-medium leading-6 text-gray-900">Confirm
                                        Password*</label>
                                    <div
                                        className="flex flex-row items-center justify-between  rounded-lg border-2 border-yellow-300 bg-white ">
                                        <input
                                            className="m-1 px-4 py-4 w-full font-medium text-lg  border-0 border-yellow-300 placeholder:text-gray-200 focus:outline-none ring-0 focus:ring-0"
                                            id='confirm'
                                            name="confirm"
                                            type="password"
                                            value={confirm}
                                            onChange={(e) => setConfirm(e.target.value)}
                                            placeholder="***********"
                                            required/>
                                    </div>
                                </div>
                            </form>


                            <div className="flex flex-row justify-between items-center">
                                <div
                                    onClick={handlePrevious}
                                    className="rounded-full my-8  font-bold text-center bg-yellow-300 cursor-pointer p-2 px-6  text-black shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  ">
                                    <span className="text-lg text-center">back</span>
                                </div>

                                <div
                                    onClick={handleProceed}
                                    className="rounded-full my-8  font-bold text-center bg-yellow-300 cursor-pointer p-2 px-6 text-black shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-auto ">
                                    <span className="text-lg text-center">Proceed</span>
                                </div>

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

export default Step2GeneralBuyer;
