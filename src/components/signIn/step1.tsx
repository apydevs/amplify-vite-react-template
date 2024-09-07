import React, {useEffect, useState} from 'react'
import {Radio, RadioGroup} from '@headlessui/react'
import {CheckCircleIcon} from '@heroicons/react/20/solid'
import { useDispatch } from "react-redux";
import {decrement, increment} from "../../store/features/counter/counterSlice.ts";
import {Link} from "react-router-dom";
import SelectBoxCompanyType from "../SelectBoxCompanyType.tsx";
import {accountType, company, companyType} from "../../store/features/registration/registerSlice.ts";

const mailingLists = [
    {id: 1, title: 'General Buyer', description: 'Searching for a property or properties to buy.', users: 'Search Multiple Locations '},
    {id: 2, title: 'Estate Agency', description: 'Creating an account for an Estate Agency', users: '*Additional checks will be carried out'},
    {id: 3, title: 'Property Developer', description: 'Creating an account for a Property Developer', users: '*Additional checks will be carried out'},
    {id: 4, title: 'Housing Trust', description: 'Creating an account for a Housing Trust',  users: '*Additional checks will be carried out'},
]


const SignupStep1: React.FC = () => {
    const dispatch = useDispatch();
    const [selectedMailingLists, setSelectedMailingLists] = useState(mailingLists[0])
    const [companyName, setCompanyName] = useState('');
    const [customerCompanyName, setCustomerCompanyName] = useState('');

    useEffect(() => {
        dispatch(accountType(selectedMailingLists.id))
        dispatch(company(companyName))
        dispatch(companyType(customerCompanyName))
    }, [companyName, customerCompanyName, dispatch, selectedMailingLists.id]);


    function handleSelectedChange(ww:{id:number,name:string}){
        setCustomerCompanyName(ww.name)
    }

    function handlePrevious() {
        dispatch(decrement())
    }
    function handleProceed() {
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
                            1, Tell us about yourself</h1>
                        <p className="text-sm font-medium mb-4">
                            *If you are looking to create an account to join a team, a team admin needs to invite you to
                            the team.
                            You then complete the registration process via the link sent to you.

                        </p>
                        <fieldset>
                            <legend className="mt-4 text-lg font-light text-gray-500 dark:text-gray-400">
                                What Account Type better suites you?
                            </legend>

                            <RadioGroup
                                value={selectedMailingLists}
                                onChange={setSelectedMailingLists}
                                className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-4"
                            >
                                {mailingLists.map((mailingList) => (
                                    <Radio
                                        key={mailingList.id}
                                        value={mailingList}
                                        aria-label={mailingList.title}
                                        aria-description={`${mailingList.description} to ${mailingList.users}`}
                                        className="group relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none data-[focus]:border-indigo-600 data-[focus]:ring-2 data-[focus]:ring-indigo-600"
                                    >
                                        <span className="flex flex-1">
                                          <span className="flex flex-col">
                                            <span
                                                className="block text-sm font-medium text-gray-900">{mailingList.title}</span>
                                            <span
                                                className="mt-1 flex items-center text-sm text-gray-500">{mailingList.description}</span>
                                            <span
                                                className="mt-6 text-xs font-medium text-gray-900">{mailingList.users}</span>
                                          </span>
                                        </span>
                                        <CheckCircleIcon
                                            aria-hidden="true"
                                            className="h-5 w-5 text-yellow-300 [.group:not([data-checked])_&]:invisible"
                                        />
                                        <span
                                            aria-hidden="true"
                                            className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-yellow-300"
                                        />
                                    </Radio>
                                ))}
                            </RadioGroup>
                        </fieldset>


                        {selectedMailingLists.id >= 2 && (
                            <div>
                                <label htmlFor="name"
                                       className="block text-sm font-medium leading-6 text-gray-900 mt-6">Name of {selectedMailingLists.title}* (Trading/Legal name)</label>
                                <div
                                    className="flex flex-row items-center justify-between  rounded-lg border-2 border-yellow-300 bg-white ">
                                    <input
                                        className="m-1 px-4 py-4 w-full font-medium text-lg  border-0 border-yellow-300 placeholder:text-gray-200 focus:outline-none ring-0 focus:ring-0"
                                        id='name'
                                        name="name"
                                        type="text"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        placeholder="Company Name Limited"
                                        autoComplete="name"
                                        required/>
                                </div>


                                <div className="my-6">
                                    <SelectBoxCompanyType onSelectedChange={handleSelectedChange} />

                                </div>


                            </div>





                    )}


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
                            <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                Login here</Link>.
                        </p>


                    </div>

                </div>

            </div>

        </section>
    );
}

export default SignupStep1;
