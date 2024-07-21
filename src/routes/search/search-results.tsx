'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Closest Distance', href: '#', current: false },
    { name: 'Newly Listed', href: '#', current: false },
]
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

function classNames(...classes  :any) {
    return classes.filter(Boolean).join(' ')
}
const products = [
    {
        id: 1,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 2,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 3,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 4,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 5,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    // More products...
]


export default function Search() {
    const [open, setOpen] = useState(false)
    const activeFilters = []

    return (
        <div className="bg-white">
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
                                                        onChange={(item) => {

                                                            return option.checked ? activeFilters.pop(item) : activeFilters.push(item);
                                                        }}
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

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Search for properties</h1>
                <p className="mt-4 max-w-xl text-sm text-gray-700">
                    Our thoughtfully designed workspace objects are crafted in limited runs. Improve your productivity and
                    organization with these sale items before we run out.
                </p>
            </div>

            {/* Filters */}
            <section aria-labelledby="filter-heading">
                <h2 id="filter-heading" className="sr-only">
                    Filters
                </h2>

                <div className="border-b border-gray-200 bg-white pb-4">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                    Sort
                                    <ChevronDownIcon
                                        aria-hidden="true"
                                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                    />
                                </MenuButton>
                            </div>

                            <MenuItems
                                transition
                                className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <div className="py-1">
                                    {sortOptions.map((option) => (
                                        <MenuItem key={option.name}>
                                            <a
                                                href={option.href}
                                                className={classNames(
                                                    option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                    'block px-4 py-2 text-sm data-[focus]:bg-gray-100',
                                                )}
                                            >
                                                {option.name}
                                            </a>
                                        </MenuItem>
                                    ))}
                                </div>
                            </MenuItems>
                        </Menu>
                        <input placeholder="location search" className="rounded-xl border border-gray-700 mx-2 md:mx-10 px-5 py-1 sm:1/3 w-1/2"/>
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
                        >
                            Filters
                        </button>

                        <div className="hidden sm:block">
                            <div className="flow-root">
                                <PopoverGroup className="-mx-4 flex items-center divide-x divide-gray-200">
                                    {filters.map((section, sectionIdx) => (
                                        <Popover key={section.name} className="relative inline-block px-4 text-left">
                                            <PopoverButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                                <span>{section.name}</span>
                                                {sectionIdx === 0 ? (
                                                    <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                            1
                          </span>
                                                ) : null}
                                                <ChevronDownIcon
                                                    aria-hidden="true"
                                                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                />
                                            </PopoverButton>

                                            <PopoverPanel
                                                transition
                                                className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                            >
                                                <form className="space-y-4">
                                                    {section.options.map((option, optionIdx) => (
                                                        <div key={option.value} className="flex items-center">
                                                            <input
                                                                defaultValue={option.value}
                                                                defaultChecked={option.checked}
                                                                id={`filter-${section.id}-${optionIdx}`}
                                                                name={`${section.id}[]`}
                                                                onChange={(item) => activeFilters.push(item)}
                                                                type="checkbox"
                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                            />
                                                            <label
                                                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                                                            >
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </form>
                                            </PopoverPanel>
                                        </Popover>
                                    ))}
                                </PopoverGroup>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active filters */}
                <div className="bg-gray-100 w-screen">
                    <div className="mx-auto max-w-7xl px-4 py-3 sm:flex sm:items-center sm:px-6 lg:px-8">
                        <h3 className="text-sm font-medium text-gray-500">
                            Filters
                            <span className="sr-only">, active</span>
                        </h3>

                        <div aria-hidden="true" className="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block" />

                        <div className="mt-2 sm:ml-4 sm:mt-0">
                            <div className="-m-1 flex flex-wrap items-center">
                                {activeFilters.map((activeFilter) => (
                                    <span
                                        key={activeFilter.value}
                                        className="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900"
                                    >
                    <span>{activeFilter.label}</span>
                    <button
                        type="button"
                        className="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                    >
                      <span className="sr-only">Remove filter for {activeFilter.label}</span>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 8 8" className="h-2 w-2">
                        <path d="M1 1l6 6m0-6L1 7" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container max-w-7xl mx-auto">
                <div className="my-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    alt={product.imageAlt}
                                    src={product.imageSrc}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href={product.href}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.name}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}
