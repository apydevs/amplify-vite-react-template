'use client'

import { useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const data = [

        {
            "value": "",
            "selected": "selected",
            "text": "Any"
        },
        {
            "value": "50000",
            "text": "50,000"
        },
        {
            "value": "60000",
            "text": "60,000"
        },
        {
            "value": "70000",
            "text": "70,000"
        },
        {
            "value": "80000",
            "text": "80,000"
        },
        {
            "value": "90000",
            "text": "90,000"
        },
        {
            "value": "100000",
            "text": "100,000"
        },
        {
            "value": "110000",
            "text": "110,000"
        },
        {
            "value": "120000",
            "text": "120,000"
        },
        {
            "value": "125000",
            "text": "125,000"
        },
        {
            "value": "130000",
            "text": "130,000"
        },
        {
            "value": "140000",
            "text": "140,000"
        },
        {
            "value": "150000",
            "text": "150,000"
        },
        {
            "value": "160000",
            "text": "160,000"
        },
        {
            "value": "170000",
            "text": "170,000"
        },
        {
            "value": "175000",
            "text": "175,000"
        },
        {
            "value": "180000",
            "text": "180,000"
        },
        {
            "value": "190000",
            "text": "190,000"
        },
        {
            "value": "200000",
            "text": "200,000"
        },
        {
            "value": "210000",
            "text": "210,000"
        },
        {
            "value": "220000",
            "text": "220,000"
        },
        {
            "value": "230000",
            "text": "230,000"
        },
        {
            "value": "240000",
            "text": "240,000"
        },
        {
            "value": "250000",
            "text": "250,000"
        },
        {
            "value": "260000",
            "text": "260,000"
        },
        {
            "value": "270000",
            "text": "270,000"
        },
        {
            "value": "280000",
            "text": "280,000"
        },
        {
            "value": "290000",
            "text": "290,000"
        },
        {
            "value": "300000",
            "text": "300,000"
        },
        {
            "value": "325000",
            "text": "325,000"
        },
        {
            "value": "350000",
            "text": "350,000"
        },
        {
            "value": "375000",
            "text": "375,000"
        },
        {
            "value": "400000",
            "text": "400,000"
        },
        {
            "value": "425000",
            "text": "425,000"
        },
        {
            "value": "450000",
            "text": "450,000"
        },
        {
            "value": "475000",
            "text": "475,000"
        },
        {
            "value": "500000",
            "text": "500,000"
        },
        {
            "value": "550000",
            "text": "550,000"
        },
        {
            "value": "600000",
            "text": "600,000"
        },
        {
            "value": "650000",
            "text": "650,000"
        },
        {
            "value": "700000",
            "text": "700,000"
        },
        {
            "value": "800000",
            "text": "800,000"
        },
        {
            "value": "900000",
            "text": "900,000"
        },
        {
            "value": "1000000",
            "text": "1,000,000"
        },
        {
            "value": "1250000",
            "text": "1,250,000"
        },
        {
            "value": "1500000",
            "text": "1,500,000"
        },
        {
            "value": "1750000",
            "text": "1,750,000"
        },
        {
            "value": "2000000",
            "text": "2,000,000"
        },
        {
            "value": "2500000",
            "text": "2,500,000"
        },
        {
            "value": "3000000",
            "text": "3,000,000"
        },
        {
            "value": "4000000",
            "text": "4,000,000"
        },
        {
            "value": "5000000",
            "text": "5,000,000"
        },
        {
            "value": "7500000",
            "text": "7,500,000"
        },
        {
            "value": "10000000",
            "text": "10,000,000"
        },
        {
            "value": "15000000",
            "text": "15,000,000"
        },
        {
            "value": "20000000",
            "text": "20,000,000"
        },
        {
            "value": "",
            "text": "Any"
        }
];

export default function SelectBoxValue() {
    const [selected, setSelected] = useState(data[0])

    return (
        <Listbox value={selected} onChange={setSelected}>
           <div className="relative">
                <ListboxButton className="relative w-full cursor-default rounded-xl bg-white py-3 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-2 ring-inset ring-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 sm:text-sm sm:leading-6">
                    <span className="block truncate">{selected.text}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </span>
                </ListboxButton>

                <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                >
                    {data.map((person) => (
                        <ListboxOption
                            key={person.value}
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
