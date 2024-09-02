'use client'
import SelectBoxRadius from "../components/SelectBoxRadius.tsx";
import SelectBoxNumber from "../components/SelectBoxNumber.tsx";
import SelectBoxValue from "../components/SelectBoxValue.tsx";
import SelectBox from "../components/SelectBox.tsx";
import { Link} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import {
    type,
    minBedroom,
    maxBedroom,
    minValuation,
    maxValuation,
    locationRadius,
} from '../store/features/searchFilters/filterSlice.ts';
import debounce from 'lodash/debounce';
import {RootState} from "../store/store.ts";
import {fetchSearchResults} from "../api/tomTomApi.tsx";
import {SearchResult} from "../types/TomTomTypes.tsx";
import {Location, Locations} from "../types/LocationType.ts";
import {addLocation, removeLocation, setLocations} from "../store/features/locations/locationSlice.ts";
import {useUserLocationAdd, useUserLocationRemove} from "../hooks/useUserLocation.ts";





export default function Search() {
    const [isLoading, setIsLoading] = useState(true);
    const [inputValue, setInputValue] = useState<string>('');
    const [resultsList, setResultsList] = useState<Locations['locations']>([]);
    const dispatch = useDispatch();
    const storeUserLocation = useUserLocationAdd();
    const removeUserLocation = useUserLocationRemove();

    const locationsState = useSelector((state: RootState) => state.locations);
    const userObj = useSelector((state: RootState) => state.users);

    useEffect(() => {
        const fetchLocations = async () => {
            setIsLoading(true);

            if (locationsState.locations.length > 0) {
                const mappedData: Locations['locations'] = locationsState.locations.map((item) => ({
                    locationId: item.locationId ?? '',
                    name: item.name ?? '',
                    longitude: item.longitude ?? 0,
                    latitude: item.latitude ?? 0,
                    id: item.id ?? ''
                }));
                setIsLoading(false);
                console.log(isLoading);

                dispatch(setLocations({locations:mappedData}));
            }
        };
        fetchLocations();
    }, [dispatch]); // Correct dependency array


    const getSearchResults = useCallback(async (query: string) => {
        if (query.length >= 3) {
            const response = await fetchSearchResults({ query });
            const formatted = response.results.map((result: SearchResult) => ({
                id: result.id,
                locationId: result.id,
                name: result.address?.freeformAddress,
                longitude: result.position.lon,
                latitude: result.position.lat,
            }));
            setResultsList(formatted);
        }
    }, []);

    const debouncedFetchResults = useCallback(debounce((nextValue: string) => getSearchResults(nextValue), 300), []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        debouncedFetchResults(event.target.value);
    };

    const handleSelectLocation = (location: Location) => {
        return async () => {

            const index = locationsState.locations.findIndex((loc) => loc.name === location.name);
            const user = userObj?.user;
            if (index === -1) {
                if (user.token) {
                    const {data, errors} = await storeUserLocation({
                        variables: {
                            locationId: location.id ?? '',
                            name: location.name,
                            longitude: location.longitude,
                            latitude: location.latitude,
                        }
                    });
                    if (errors && errors.length > 0) {
                        console.log('Login failed with GraphQL errors:', errors);
                        return; // Exit early
                    }
                    // Safely access the user object with optional chaining
                    console.log('data',data)
                    dispatch(addLocation({
                        locationId: data.addLocation.locationId ?? '',
                        name: data.addLocation.name,
                        longitude: data.addLocation.longitude,
                        latitude: data.addLocation.latitude,
                    }));
                }else{
                    if(locationsState.locations.length == 0){
                        dispatch(addLocation({
                            locationId: location.id ?? '',
                            name: location.name,
                            longitude: location.longitude,
                            latitude: location.latitude,
                        }));
                    }else{
                        alert('Login to Yeoley to search more locations at once. ')
                    }
                    }

            }
            setInputValue('');
        };
    };




    const handleRemoveLocation = (location: Location) => {
        return async () => {
            const user = userObj?.user;
            if (location.locationId && user.token) {

                const {data, errors} = await removeUserLocation({
                    variables: {
                        id: location.locationId ?? '',
                    }
                });
                if (errors && errors.length > 0) {
                    console.log('Login failed with GraphQL errors:', errors);
                    return; // Exit early
                }
                console.log(data)
            }


                dispatch(removeLocation({id: location.locationId}));

            setInputValue('');
        };
    };


    return (

        <div>

            <div className="w-screen h-[16rem] bg-blue-50">
                <div className="container   self-center mx-auto max-w-2xl">

                    <div className=" flex flex-col justify-center  mx-auto px-4 py-8 sm:px-6 lg:px-8 items-center">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center">Search for
                            properties</h1>
                        <div
                            className="relative mt-4 flex flex-col justify-center  text-sm text-gray-700 tracking-tight  text-center">
                            <div
                                className="flex flex-row items-center justify-between  rounded-lg border-2 border-yellow-300 bg-white">
                                <input
                                    className="m-1 px-4 py-4  w-2/3 max-w-xl border-y-0 border-yellow-300 focus:outline-none ring-0 focus:ring-0"
                                    placeholder="Search by location"
                                    value={inputValue}
                                    onChange={handleInputChange}

                                />
                                <div className="m-0.5 px-1 py-1 w-1/3">
                                    <SelectBoxRadius name="radius" onChange={(item) => dispatch(locationRadius(item))} />
                                </div>


                            </div>
                            {resultsList.length > 0 && inputValue.length > 2 ? (
                                <div
                                    className="absolute top-14 w-full mt-0.5 z-50  bg-white rounded-b-xl border-b-2 border-x-2 border-yellow-300 text-left divider-x divider ">
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
                            ) : <div></div>
                            }
                            <div className="grid grid-cols-4 items-center  justify-start my-1 gap-2">
                                {locationsState.locations.length > 0 ? (
                                    locationsState.locations.map((location) => (
                                        <span key={location.name + "-test"}
                                              className="inline-flex justify-between items-center gap-x-0.5 rounded-md bg-yellow-200 px-2 py-1 text-xs font-medium text-black">
                                           <span className="max-w-[180px] truncate hover:truncate-0">
                                                {location.name}
                                           </span>

                                            <button type="button" onClick={handleRemoveLocation(location)}
                                                    className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-yellow-600/20">
                                                <span className="sr-only">Remove</span>
                                                <svg viewBox="0 0 14 14"
                                                     className="h-3.5 w-3.5 stroke-yellow-800/50 group-hover:stroke-yellow-800/75">
                                                  <path d="M4 4l6 6m0-6l-6 6"/>
                                                </svg>
                                                <span className="absolute -inset-1"/>
                                              </button>
                                            </span>
                                    ))
                                ) : (
                                    <span  className=" col-span-4 text-sm text-gray-900 w-full text-center">Please select locations</span>
                                )}


                            </div>

                            <span className="max-w-xl mx-auto mt-1">
                               Our unique property search is designed to locate your next property quicker.Search all the areas of interest,and find properties over multiple locations Simply login for this feature.
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
                                <SelectBoxValue name="min" onChange={(value) => dispatch(minValuation(value))}/>
                            </div>

                            <div className="w-full">
                                <label>Max Valuation</label>
                                <SelectBoxValue name="max" onChange={(value) => dispatch(maxValuation(value))}/>
                            </div>

                        </div>
                        <div className="flex flex-row gap-8">

                            <div className="w-full">
                                <label>Min Bedrooms</label>
                                <SelectBoxNumber name="minbed" onChange={(item) => {


                                    dispatch(minBedroom(item))
                                }
                                }

                                />
                            </div>

                            <div className="w-full">
                                <label>Max Bedrooms</label>
                                <SelectBoxNumber name="maxbed" onChange={(item) => dispatch(maxBedroom(item))}/>
                            </div>
                        </div>
                        <div>
                            <label>Max Offer Price</label>
                            <input className="border-2 border-yellow-300 px-4 py-2.5 rounded-xl w-full max-w-xl mb-2"
                                   placeholder="Search by location"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-center gap-8">

                {/*<button onClick={handleNew}*/}
                {/*      className="rounded-full font-bold bg-yellow-300 p-4 text-black shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"*/}
                {/*>*/}
                {/*    <span className="text-2xl ">NEW  TEST PROP</span>*/}
                {/*</button>*/}
                {locationsState.locations.length > 0 ? (

                    <Link to="/search/properties"
                          className="rounded-full font-bold bg-yellow-300 p-4 text-black shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        <span className="text-2xl ">GO</span>
                    </Link>
                ) : (
                    <button
                        type="button"
                        className="rounded-full font-bold bg-yellow-300 p-4 text-black shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        <span className="text-2xl ">NO GO</span>
                    </button>

                )
                }

            </div>

        </div>


    );
}