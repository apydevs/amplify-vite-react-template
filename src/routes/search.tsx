'use client'
import SelectBoxRadius from "../components/SelectBoxRadius.tsx";
import SelectBoxNumber from "../components/SelectBoxNumber.tsx";
import SelectBoxValue from "../components/SelectBoxValue.tsx";
import SelectBox from "../components/SelectBox.tsx";
import { Link} from "react-router-dom";
import React, {useCallback, useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import {
    locations,
    type,
    minBedroom,
    maxBedroom,
    minValuation,
    maxValuation,
    locationRadius, locationRemove,
} from '../store/features/searchFilters/filterSlice.ts'
import debounce from 'lodash/debounce';
import {RootState} from "../store/store.ts";
import {createProperty} from "../api/propertiesApi.ts.tsx";
import {CreatePropertyType} from "../types/PropertyTypes.tsx";
import {fetchSearchResults} from "../api/tomTomApi.tsx";
import {SearchResult} from "../types/TomTomTypes.tsx";
import {LocationState} from "../interfaces/SearchInterface.tsx";
import {Location} from "../types/LocationType.ts";





export default function Search() {
    const [inputValue, setInputValue] = useState<string>('');
    const [resultsList, setResultsList] = useState<LocationState['locations']>([]);
    const dispatch = useDispatch();

    const filters = useSelector((state: RootState) => state.filters);

    const getSearchResults = useCallback(async (query: string) => {
        if (query.length >= 3) {
            console.log("Fetching results for query:", query);
            // Here you might call an actual API or dispatch a Redux action
           const response = await fetchSearchResults({query:query})
            // Function to transform results
           console.log('response',response)

            const formated = response.results.map((result: SearchResult) => ({
                            id: result.id,
                            name: result.address?.freeformAddress // Using optional chaining to safely access freeformAddress
                        }));

            setResultsList(formated);
            console.log(response);


        }
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedFetchResults = useCallback(
        debounce((nextValue: string) => getSearchResults(nextValue), 300),
        [] // fetchSearchResults should be defined outside or wrapped in another useCallback if it uses props/state
    );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setInputValue(value);
        debouncedFetchResults(value);
    };

    const handleSelectLocation = (location: Location) => {
        return () => {
            console.log("Selected location:", location.name);
            dispatch(locations(location))
            setInputValue('')
        };
    };

    const removeLocation = (location: Location) => {
        return () => {
            console.log("Selected location:", location.name);
            dispatch(locationRemove(location))
            setInputValue('')
        };
    };


    const handleNew = async () => {
        // const propertyData = {id:null, address: "123 Baker Street", bathrooms: 2, bedrooms: 3, area_size: 1800, city: "London",condition:"A", content: "Welcome to this simply unique and stunning detached Georgian-style home of 10,000 sq ft. It is located in a highly desirable location, at arguably St Alban's premier address.", country: "UK", county: "Chester", description: "Alban House, Faircross Way, St. Albans.", epc_date: "2024-03-10", garages: 1, is_featured: false, is_published: true, is_sold: false, is_yeoley_plus: true, latitude: 51.5238, layout: "Spacious with a large living area and modern kitchen.", longitude: -0.1586, max: 34000, min: 1000, postcode: "NW1 6XE", potential_epc_rating: "A", prefix: "Mr.", slug: "123-baker-street-london", tenure: "Leasehold", title: "Alban House, Faircross Way, St. Albans.", town: "London", type: "Detached", updated_at: "2024-07-25T14:30:00Z", user_id: "b6d27284-9051-702c-cfa1-af437cdc1378", valuation: 275000, valuation_type: "certified", views: 250, year_built: 1982}
        const propertyTestData: CreatePropertyType = {
            //id: null,
            title: "NEW RELATION Stunning 4 Bedroom Detached House",
            slug: "stunning-4-bedroom-detached-house",
            valuation: 750000,
            min: 700000,
            max: 800000,
            description: "Aquadale Farm offers a captivating rural retreat with modern comforts and historic charm.Aquadale Farm is a four-bedroom character property nestled within over 4 acres of private grounds. Accessed via a remote-controlled gated entrance, the property welcomes you with spacious living areas and picturesque surroundings.\n" +
                "\n" +
                "The main house of Aquadale Farm spans approximately 194.8 square meters (2096.8 square feet) and features a grand lounge with a wood-burning stove, French doors leading to a patio, and a versatile gym or multifunctional room. The kitchen is a focal point, boasting modern amenities and a centre island perfect for entertaining. Upstairs, the bedrooms are generously sized, with the main bedroom offering a vaulted ceiling and en-suite facilities.\n" +
                "\n" +
                "Outbuildings and storage are provided by a bespoke timber building, while the gardens offer a tranquil retreat with ample space for outdoor activities. The property also includes open field areas suitable for equestrian use or potential development (subject to planning)\n" +
                "\n" +
                "Situation - Conveniently located near Newport, Shrewsbury and Telford, Aquadale Farm provides easy access to amenities and excellent local schools, making it an ideal countryside haven with urban conveniences nearby.\n" +
                "\n" +
                "Directions - Easily accessible from all areas: From the North or Telford, travelling along the A442 to Crudgington, turning onto the B5062 heading towards Newport, then right turn onto Crudgington Moor Lane. A short distance along you will arrive at the crossroads of Crudgington Green, turn left here and the wooden gated entrance can be seen directly ahead. The intercom access and guest arrival is on your left.\n" +
                "(Gated entrance photo can be seen on the property photo reel for ease of reference).",
            address: "10 Downing Street",
            town: "Westminster",
            city: "London",
            county: "Greater London",
            postcode: "SW1A 2AA",
            condition: "Excellent",
            country: "United Kingdom",
            bedrooms: 4,
            bathrooms: 3,
            garages: 2,
            area_size: 2200, // in square feet
            year_built: 1998,
            views: 1200,
            is_featured: Math.random() < 0.5,
            is_published: true,
            is_sold: false,
            is_yeoley_plus: true,
            user_id: "user_12345",
            type: "Detached",
            longitude: -0.127758,
            latitude: 51.507351,
            valuation_type: "Market Value",
            prefix: "Dr.",
            tenure: "Freehold",
            current_epc_rating: "C",
            potential_epc_rating: "B",
            epc_date: "2024-01-15",
            layout: "Spacious open-plan living with a modern kitchen and separate dining area.",
            content: "Aquadale Farm and Strine View Cottage offer a captivating rural retreat with modern comforts and historic charm, set in over 9 acres of grounds.",
        };

        const propertynew = await createProperty(propertyTestData);
        console.log('New Property', propertynew);
    }


    return (
        <>

            <div className="w-screen h-[16rem] bg-blue-50">
                <div className="container   self-center mx-auto max-w-7xl">

                    <div className=" flex flex-col justify-center  mx-auto px-4 py-8 sm:px-6 lg:px-8 items-center">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center">Search for properties</h1>
                        <div className="relative mt-4 flex flex-col justify-center  text-sm text-gray-700 tracking-tight  text-center">
                            <div className="flex flex-row items-center justify-between  rounded-lg border-2 border-yellow-300 bg-white">
                                <input
                                    className="m-1 px-4 py-4  w-2/3 max-w-xl border-y-0 border-yellow-300 focus:outline-none ring-0 focus:ring-0"
                                       placeholder="Search by location"
                                       value={inputValue}
                                       onChange={handleInputChange}

                                />
                                <div className="m-0.5 px-1 py-1 w-1/3">
                                    <SelectBoxRadius name="radius" onChange={(item) =>dispatch(locationRadius(item))}/>
                                </div>


                            </div>
                            {resultsList.length > 0  && inputValue.length > 2? (
                            <div className="absolute top-14 w-full mt-0.5 z-50  bg-white rounded-b-xl border-b-2 border-x-2 border-yellow-300 text-left divider-x divider ">
                               <ul className="max-h-72 overflow-y-scroll ">
                                   {
                                       resultsList.map((location) => (
                                           <li
                                               key={location.id} onClick={handleSelectLocation(location)}
                                               className="w-full text-lg font-bold border-t border-gray-300 py-2 hover:bg-yellow-50 hover:rounded-b-lg cursor-pointer">
                                           <span className="px-3">
                                               {location.name}
                                           </span>
                                           </li>
                                       ))
                                   }

                               </ul>

                            </div>
                                ):null
                            }
                            <div className="flex flex-row justify-start my-1 gap-x-2.5">
                                {filters.locations.length > 0  ? (
                                        filters.locations.map((location) => (
                                    <span key={location.id} className="inline-flex items-center gap-x-0.5 rounded-md bg-yellow-200 px-2 py-1 text-xs font-medium text-black">
                                      {location.name}
                                        <button type="button" onClick={removeLocation(location)} className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-yellow-600/20">
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
                            <SelectBox name="type" onChange={(item) => dispatch(type(item))}/>
                        </div>
                        <div className="flex flex-row gap-8">

                            <div className="w-full">
                                <label>Min Valuation</label>
                                <SelectBoxValue name="min" onChange={(value) =>dispatch(minValuation(value))}/>
                            </div>

                            <div className="w-full">
                                <label>Max Valuation</label>
                                <SelectBoxValue  name="max" onChange={(value)  =>dispatch(maxValuation(value))}/>
                            </div>

                        </div>
                        <div className="flex flex-row gap-8">

                            <div className="w-full">
                                <label>Min Bedrooms</label>
                                <SelectBoxNumber name="minbed" onChange={(item) =>{


                                    dispatch(minBedroom(item))
                                        }
                                }

                                    />
                            </div>

                            <div className="w-full">
                            <label>Max Bedrooms</label>
                                <SelectBoxNumber name="maxbed" onChange={(item) =>dispatch(maxBedroom(item))}/>
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

                <button onClick={handleNew}
                      className="rounded-full font-bold bg-yellow-300 p-4 text-black shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    <span className="text-2xl ">NEW  TEST PROP</span>
                </button>
                {filters.locations.length > 0  ? (

                    <Link to="/search/properties"
                        className="rounded-full font-bold bg-yellow-300 p-4 text-black shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <span className="text-2xl ">GO</span>
                    </Link>
                    ): (
                    <button
                        type="button"
                    className="rounded-full font-bold bg-yellow-300 p-4 text-black shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    <span className="text-2xl ">NO GO</span>
                    </button>

                    )}

            </div>

        </>


    )
}