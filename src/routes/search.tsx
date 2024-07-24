'use client'

import {useEffect, useState} from 'react'

import {Link} from "react-router-dom";
import SelectBox from "../components/SelectBox.tsx";
import SelectBoxRadius from "../components/SelectBoxRadius.tsx";
import SelectBoxNumber from "../components/SelectBoxNumber.tsx";
import SelectBoxValue from "../components/SelectBoxValue.tsx";

interface Location {
    id: number;
    name: string;
    // Add other properties if needed
}
const locationsData: Location[] = [
    // Example data
    { id: 1, name: 'New York' },
    { id: 2, name: 'Los Angeles' },
    // Add other locations
];

export default function Search() {
    const [locations, setLocations] = useState<Location[]>([])

    useEffect(() => {
        // Fetch locations from an API
        setLocations(locationsData)
        console.log('asd')
    }, [])


    return (
        <>
            <div className="w-screen h-[16rem] bg-blue-50">
                <div className="container   self-center mx-auto max-w-7xl">

                    <div className=" flex flex-col justify-center  mx-auto px-4 py-8 sm:px-6 lg:px-8 items-center">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center">Search for properties</h1>
                        <div className="mt-4 flex flex-col justify-center  text-sm text-gray-700 tracking-tight  text-center">
                            <div className="flex flex-row items-center justify-between  rounded-xl border-2 border-yellow-300 bg-white">
                                <input className="m-1 px-4 py-4  w-2/3 max-w-xl border-y-0 border-yellow-300 focus:outline-none ring-0 focus:ring-0" placeholder="Search by location"/>
                                <div className="m-0.5 px-1 py-1 w-1/3">
                                    <SelectBoxRadius/>
                                </div>


                            </div>

                            <div className="flex flex-row justify-start my-1 gap-x-2.5">
                                {locations.length > 0  ? (
                                    locations.map((location) => (
                                    <span key={location.id} className="inline-flex items-center gap-x-0.5 rounded-md bg-yellow-200 px-2 py-1 text-xs font-medium text-black">
                                      {location.name}
                                                                        <button type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-yellow-600/20">
                                        <span className="sr-only">Remove</span>
                                        <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-yellow-800/50 group-hover:stroke-yellow-800/75">
                                          <path d="M4 4l6 6m0-6l-6 6" />
                                        </svg>
                                        <span className="absolute -inset-1" />
                                      </button>
                                    </span>
                                )))
                                 : (
                                    <span className="text-sm text-gray-900 w-full text-center">Please select locations</span>
                                )}
                            </div>

                            <span className="max-w-xl mx-auto mt-1">
                               Our thoughtfully designed workspace objects are crafted in limited runs. Improve your productivity and
                               organization with these sale items before we run out.
                           </span>

                        </div>

                    </div>


                </div>


            </div>
            <div className="container bg-white self-center mx-auto max-w-7xl">
                <div className=" flex flex-col justify-center mx-auto py-8 md:px-6 items-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-10">
                        <div>
                            <label>Property Type</label>
                            <SelectBox/>
                        </div>
                        <div className="flex flex-row gap-8">
e
                            <div className="w-full">
                                <label>Min Valuation</label>
                                <SelectBoxValue/>
                            </div>

                            <div className="w-full">
                                <label>Max Valuation</label>
                                <SelectBoxValue/>
                            </div>

                        </div>
                        <div className="flex flex-row gap-8">

                            <div className="w-full">
                                <label>Min Bedrooms</label>
                                <SelectBoxNumber/>
                            </div>

                            <div className="w-full">
                            <label>Max Bedrooms</label>
                            <SelectBoxNumber/>
                            </div>
                        </div>
                        <div>
                            <label>Max Offer Price</label>
                            <input className="border-2 border-yellow-300 px-4 py-2.5 rounded-xl w-full max-w-xl mb-2" placeholder="Search by location"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-center gap-8">
                <Link to="/search/properties" >
                    <button
                        type="button"
                        className="rounded-full font-bold bg-yellow-300 p-4 text-black shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <span className="text-2xl ">GO</span>
                    </button>
                </Link>
            </div>

        </>


    )
}
