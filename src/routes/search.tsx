'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import {Link} from "react-router-dom";


const filters = [
    {
        id: 'type',
        name: 'Property Type',
        options: [
            { value: 'all', label: 'All Types', checked: true },
            { value: 'detached', label: 'All New Arrivals', checked: true },
            { value: 'semi-detached', label: 'Semi-detached', checked: true },
            { value: 'terraced', label: 'Terraced', checked: true },
            { value: 'bungalow', label: 'Bungalow', checked: true },
            { value: 'apartment', label: 'Apartment', checked: true },
            { value: 'land', label: 'Land', checked: true },
            { value: 'other', label: 'other', checked: true },
        ],
    },
    {
        id: 'valuation-price',
        name: 'Valuation Price',
        options: [
            { value: '49000', label: 'upto £49k', checked: false },
            { value: '159000', label: 'upto £159k', checked: false },
            { value: '250000', label: 'upto £250k', checked: false },
            { value: '500000', label: 'upto £500k', checked: false },
            { value: '750000', label: 'upto £750k', checked: false },
            { value: '1000000', label: 'upto £1m', checked: false },
            { value: '80000000', label: 'upto & over £1m', checked: false },
        ],
    },
    {
        id: 'newbuilds',
        name: 'New Builds',
        options: [
            { value: 'all', label: 'All Partners', checked: true },
            { value: 'crest', label: 'Crest Homes', checked: true },
            { value: 'shropshire-homes', label: 'Shropshire Homes', checked: true },
            { value: 'Bovis', label: 'Bovis Homes', checked: true },
        ],
    },
]





export default function Search() {
    const [open, setOpen] = useState(false)
    // const activeFilters: object = []

    return (
        <div className="container   self-center mx-auto max-w-7xl">
            {/* Mobile filter dialog */}
            <Dialog open={open} onClose={setOpen} className="relative z-40 sm:hidden">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                />

                <div className="fixed inset-0 z-40 flex">
                    <DialogPanel
                        transition
                        className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                    >
                        <div className="flex items-center justify-between px-4">
                            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Filters */}
                        <form className="mt-4">
                            {filters.map((section) => (
                                <Disclosure key={section.name} as="div" className="border-t border-gray-200 px-4 py-6">
                                    <h3 className="-mx-2 -my-3 flow-root">
                                        <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                                            <span className="font-medium text-gray-900">{section.name}</span>
                                            <span className="ml-6 flex items-center">
                        <ChevronDownIcon
                            aria-hidden="true"
                            className="h-5 w-5 rotate-0 transform group-data-[open]:-rotate-180"
                        />
                      </span>
                                        </DisclosureButton>
                                    </h3>
                                    <DisclosurePanel className="pt-6">
                                        <div className="space-y-6">
                                            {section.options.map((option, optionIdx) => (
                                                <div key={option.value} className="flex items-center">
                                                    <input
                                                        defaultValue={option.value}
                                                        defaultChecked={option.checked}
                                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                                        name={`${section.id}[]`}
                                                        type="checkbox"
                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                    <label
                                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                        className="ml-3 text-sm text-gray-500"
                                                    >
                                                        {option.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </DisclosurePanel>
                                </Disclosure>
                            ))}
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>

            <div className=" flex flex-col justify-center  mx-auto px-4 py-8 sm:px-6 lg:px-8 items-center">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center">Search for properties</h1>
                <div className="mt-4 flex flex-col justify-center  text-sm text-gray-700 tracking-tight  text-center">
                    <input className="border-2 border-yellow-400 px-4 py-2.5 rounded-xl w-full max-w-xl mb-2" placeholder="Search by location"/>
                   <span className="max-w-xl mx-auto">
                       Our thoughtfully designed workspace objects are crafted in limited runs. Improve your productivity and
                       organization with these sale items before we run out.
                   </span>

                </div>
            </div>

            {/* Filters */}

            <div className="container max-w-7xl mx-auto">
                <div className="my-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

                </div>

                <div className="flex flex-row justify-center gap-8">
                    <Link to="/search/properties" >
                        <button
                        type="button"
                        className="rounded-full bg-yellow-400 p-4 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                        <span className="text-2xl ">GO</span>
                        </button>
                    </Link>
                </div>

            </div>

        </div>
    )
}
