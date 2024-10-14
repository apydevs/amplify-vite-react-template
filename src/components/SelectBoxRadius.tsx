'use client'

import React, {useEffect, useState} from 'react'
import {  Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import {DataRadiusItem, SelectBoxRadiusProps} from "../interfaces/interfaces.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../store/store.ts";


const data = [
    {
        "id": 1,
        "value": 0.0,
        "text": "This area only"
    },
    {
        "id": 2,
        "value": 0.25,
        "text": "Within ¼ mile"
    },
    {
        "id": 3,
        "value": 0.5,
        "text": "Within ½ mile"
    },
    {
        "id": 4,
        "value": 1.0,
        "text": "Within 1 mile"
    },
    {
        "id": 5,
        "value": 3.0,
        "text": "Within 3 miles"
    },
    {
        "id": 6,
        "value": 5.0,
        "text": "Within 5 miles"
    },
    {
        "id": 7,
        "value": 10.0,
        "text": "Within 10 miles"
    },
    {
        "id": 8,
        "value": 15.0,
        "text": "Within 15 miles"
    },
    {
        "id": 9,
        "value": 20.0,
        "text": "Within 20 miles"
    },
    {
        "id": 10,
        "value": 30.0,
        "text": "Within 30 miles"
    },
    {
        "id": 11,
        "value": 40.0,
        "text": "Within 40 miles"
    }
]

const SelectBoxRadius : React.FC<SelectBoxRadiusProps> = ({ onChange, name }) => {
    const selectedFilters = useSelector((state: RootState) => state.filters);

    const [selected, setSelected] =  useState <DataRadiusItem>({
        "id": 1,
        "value": selectedFilters.locationRadius ?? 0.0,
        "text": "This area only"
    })

    useEffect(() => {
        const fetchData = async () => {
            const index = data.findIndex(item => item.value === selectedFilters.locationRadius);
            setSelected(data[index]);
        };
        fetchData();
    }, []); // Depend on informationId to re-fetch when it changes

    const handleChange = (item: DataRadiusItem) => {
        setSelected(item);
        onChange(item);
        console.log(item)

    };
    return (
        <Listbox value={selected} onChange={handleChange}>
           <div className="relative">
                <ListboxButton className="relative w-full cursor-default rounded-xl bg-white py-3 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-2 ring-inset ring-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 sm:text-sm sm:leading-6">
                    <span className="block truncate">{selected.text}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </span>
                </ListboxButton>

                <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm no-scrollbar"
                >
                    {data.map((person) => (
                        <ListboxOption
                            key={`${name}-${person.id}`}
                            value={person}
                            className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-yellow-300 data-[focus]:text-white"
                        >
                            <span className="block truncate font-normal group-data-[selected]:font-semibold">{person.text}</span>

                            <span className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="h-5 w-5" />
              </span>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    )
}
export default SelectBoxRadius;