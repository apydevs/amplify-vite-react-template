'use client'

import {useEffect, useState} from 'react'
import {createProperty, listProperties, searchProperties} from '../../api/propertiesApi.ts'; // Ensure the path is correct
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
import {Link, useLoaderData, useLocation, useParams} from "react-router-dom";
import { CreatePropertyInterface } from '/../../interfaces/CreatePropertyInterface.tsx';
import {Filter} from "../../interfaces/SearchInterface.tsx";
import {useSelector} from "react-redux"; // Adjust the path as needed

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
const propertyData = {address: "123 Baker Street", bathrooms: 2, bedrooms: 3, area_size: 1800, city: "London", content: "Welcome to this simply unique and stunning detached Georgian-style home of 10,000 sq ft. It is located in a highly desirable location, at arguably St Alban's premier address.", country: "UK", county: "Chester", description: "Alban House, Faircross Way, St. Albans.", epc_date: "2024-03-10", garages: 1, is_featured: true, is_published: true, is_sold: false, is_yeoley_plus: true, latitude: 51.5238, layout: "Spacious with a large living area and modern kitchen.", longitude: -0.1586, max: 900000, min: 850000, postcode: "NW1 6XE", potential_epc_rating: "A", prefix: "Mr.", slug: "123-baker-street-london", tenure: "Leasehold", title: "Alban House, Faircross Way, St. Albans.", town: "London", type: "Detached", updated_at: "2024-07-25T14:30:00Z", user_id: "b6d27284-9051-702c-cfa1-af437cdc1378", valuation: 875000, valuation_type: "certified", views: 250, year_built: 1982}


export default function Search() {

    const [isLoading, setIsLoading] = useState(true);
    const [dataProperties, setDataProperties] = useState<CreatePropertyInterface[]>([]);
    const [error, setError] = useState(false);

    // const navigation = useNavigate();
    const [open, setOpen] = useState(false)
    const activeFilters: { value: number|string, label: string }[] = []
    const searchFilters = useSelector((state) => state.filters)
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

                try {
                    const properties = await searchProperties(searchFilters);
                    setDataProperties(properties);
                    console.info(' fetching properties:', properties);

                } catch (error) {
                    console.error('Error fetching properties:', error);
                    setError(true);
                }
            setIsLoading(false);
        };

        fetchData();
    }, []); // Depend on informationId to re-fetch when it changes

    async function newProperty() {
        const createProperty2 = await createProperty(propertyData);
        console.info('property Created:', createProperty2);
        return createProperty2;
    }



    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading the data.</div>;
    }

    return (



        <div className="bg-white relative">

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

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Search for properties</h1>
                <p className="mt-4 max-w-xl text-sm text-gray-700">
                    Our thoughtfully designed workspace objects are crafted in limited runs. Improve your productivity and
                    organization with these sale items before we run out.
                </p>
            </div>

            <div>
                <section aria-labelledby="filter-heading" className="  z-50">
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
                                                                    onChange={(item) => activeFilters.push({
                                                                        value: item.target.value,
                                                                        label: option.label
                                                                    })}
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
            </div>
            {/* Filters */}
    <div onClick={newProperty} >
        new property
    </div>
            <div className="mx-3 md:mx-24 mx-auto">


                <div className="my-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {dataProperties.map((product) => (

                        // <PropertyCard ></PropertyCard>
                        <Link  to={`/search/properties/${product.id}`} key={product.id} >
                          <div className="group relative cursor-pointer">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-96 cursor-pointer">
                                <img
                                    alt={product.title}
                                    src={product.imageSrc ?? 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'}
                                    className="h-full w-full object-fill object-cover object-center lg:h-full lg:w-full cursor-pointer"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <div key={product.id}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                                {product.title}
                                        </div>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.bedrooms}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{product.bathrooms}</p>

                            </div>
                        </div>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    )
}
