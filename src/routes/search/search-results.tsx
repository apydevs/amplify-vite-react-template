'use client'

import  {useEffect, useState} from 'react'

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
import { PropertyInterface } from '../../interfaces/interfaces.tsx';
import PropertyCard from "../../components/PropertyCard.tsx";
import PropertyCardList from "../../components/PropertyCardList.tsx";
import PropertyCardFeaturedList from "../../components/PropertyCardFeaturedList.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {useSearchProperties} from "../../hooks/useSearchProperty.ts";
import {useNavigate} from "react-router-dom";
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

function classNames(...classes: string[]    ){
    return classes.filter(Boolean).join(' ')
}
// const propertyData = {address: "123 Baker Street", bathrooms: 2, bedrooms: 3, area_size: 1800, city: "London", content: "Welcome to this simply unique and stunning detached Georgian-style home of 10,000 sq ft. It is located in a highly desirable location, at arguably St Alban's premier address.", country: "UK", county: "Chester", description: "Alban House, Faircross Way, St. Albans.", epc_date: "2024-03-10", garages: 1, is_featured: false, is_published: true, is_sold: false, is_yeoley_plus: true, latitude: 51.5238, layout: "Spacious with a large living area and modern kitchen.", longitude: -0.1586, max: 34000, min: 1000, postcode: "NW1 6XE", potential_epc_rating: "A", prefix: "Mr.", slug: "123-baker-street-london", tenure: "Leasehold", title: "Alban House, Faircross Way, St. Albans.", town: "London", type: "Detached", updated_at: "2024-07-25T14:30:00Z", user_id: "b6d27284-9051-702c-cfa1-af437cdc1378", valuation: 275000, valuation_type: "certified", views: 250, year_built: 1982}


export default function Search() {

    const selectedFilters = useSelector((state: RootState) => state.filters);
    const selectedLocations = useSelector((state: RootState) => state.locations);
    const user = useSelector((state: RootState) => state.users.user);
    const navigate = useNavigate();


    // const navigation = useNavigate();
    const [open, setOpen] = useState(false)
    const [grid, setGrid] = useState(false)
    const activeFilters: { value: number|string, label: string }[] = []
    const [results, setResults] = useState<PropertyInterface[]>([]);
    const [pagination, setPagination] = useState({
        "total": 1,
        "per_page": 1,
        "current_page": 1,
        "last_page": 1}
    )

    const searchProperties = useSearchProperties();
    // { limit: 10, page: 1, radius: 50, locations:{} }
    // const searchFilters = useSelector((state) => state.filters)
    useEffect(() => {
        const fetchData = async () => {

            if(!selectedLocations.locations[0]){
              return   navigate('/search')
            }
            const page  =  pagination.last_page !== pagination.current_page ? pagination.current_page+1 : pagination.current_page;
            const vars = {
                variables: {
                    limit: 25,
                    page: page,
                    radius: selectedFilters.locationRadius,
                    guestLongitude: user.token ? 0 : selectedLocations.locations[0].longitude,
                    guestLatitude: user.token ? 0 :  selectedLocations.locations[0].latitude,
                }
            }
            const { data, errors } = await searchProperties(vars);

            setResults(data.searchProperty.data)
            setPagination(data.searchProperty)
            console.log(data);

            // Handle GraphQL Errors if any
            if (errors && errors.length > 0) {
                console.log('Login failed with GraphQL errors:', errors);
                return; // Exit early
            }




        };
                fetchData();
    }, []); // Depend on informationId to re-fetch when it changes

    async function handleAddMore() {

      const page  =  pagination.last_page !== pagination.current_page ? pagination.current_page+1 : pagination.current_page;
        const vars = {
            variables: {
                limit: 25,
                page: page,
                radius: selectedFilters.locationRadius,
                guestLongitude: user.token ? 0 : selectedLocations.locations[0].longitude,
                guestLatitude: user.token ? 0 :  selectedLocations.locations[0].latitude,
            }
        }
        const {data, errors} = await searchProperties(vars);

        // Handle GraphQL Errors if any
        if (errors && errors.length > 0) {
            console.log('Login failed with GraphQL errors:', errors);
            return; // Exit early
        }
        // Correctly updating the results state
        setResults(prevResults => [...prevResults, ...data.searchProperty.data]);  // Spread both arrays to form a new one
        setPagination(data.searchProperty);


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
                                    <XMarkIcon aria-hidden="true" className="h-6 w-6"/>
                                </button>
                            </div>

                            {/* Filters */}
                            <form className="mt-4">
                                {filters.map((section) => (
                                    <Disclosure key={section.name} as="div"
                                                className="border-t border-gray-200 px-4 py-6">
                                        <h3 className="-mx-2 -my-3 flow-root">
                                            <DisclosureButton
                                                className="group flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
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
                        Our thoughtfully designed workspace objects are crafted in limited runs. Improve your
                        productivity and
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
                                        <MenuButton
                                            className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
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
                                <input placeholder="location search"
                                       className="rounded-xl border border-gray-700 mx-2 md:mx-10 px-5 py-1 sm:1/3 w-1/2"/>
                                <button
                                    type="button"
                                    onClick={() => setOpen(true)}
                                    className="inline-block text-sm font-medium text-black hover:text-gray-900 sm:hidden"
                                >
                                    Filters
                                </button>

                                <div className="hidden sm:block">
                                    <div className="flow-root">
                                        <PopoverGroup className="-mx-4 flex items-center divide-x divide-gray-200">
                                            {filters.map((section, sectionIdx) => (
                                                <Popover key={section.name}
                                                         className="relative inline-block px-4 text-left">
                                                    <PopoverButton
                                                        className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                                        <span>{section.name}</span>
                                                        {sectionIdx === 0 ? (
                                                            <span
                                                                className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
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
                        <div className="bg-blue-50 w-screen">
                            <div className="mx-auto max-w-7xl px-4 py-3 sm:flex sm:items-center sm:px-6 lg:px-8  md:justify-between">

                                <div className="flex flex-row justify-start">
                                    <h3 className="text-sm font-medium text-black ">
                                        Filters
                                        <span className="sr-only">, active</span>
                                    </h3>
                                    <span onClick={() => setGrid(true)}
                                          className="text-sm mx-4 font-medium text-black ">
                                Grid
                            </span>
                                    <span onClick={() => setGrid(false)}
                                          className="text-sm mx-4 font-medium text-black ">
                                List
                            </span>
                                    <div aria-hidden="true" className="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block"/>
                                    <div className="mt-2 sm:ml-4 sm:mt-0 flex flex-row justify-end">
                                        <div className="-m-1 flex flex-wrap items-center space-x-2">
                                            <span className="text-sm font-medium">Locations:</span>
                                            {selectedLocations.locations.length > 0 ? (
                                                selectedLocations.locations.map((location) => (
                                                    <span key={location.name + "-test"}
                                                          className="inline-flex justify-between items-center gap-x-0.5 rounded-md bg-yellow-200 px-2 py-1 text-xs font-medium text-black">
                                           <span className="max-w-[180px] truncate hover:truncate-0">
                                                {location.name}
                                           </span>

                                            <button type="button"
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
                                            ) : null}
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
                        <path d="M1 1l6 6m0-6L1 7" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </button>

                  </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>


                                <div>
                                  <span>
                                       Radius : <span className="font-semibold">{selectedFilters.locationRadius} miles</span>
                                  </span>
                                </div>

                            </div>
                        </div>
                    </section>
                </div>


                <div className=" mx-auto container ">


                    {grid ?

                        <div
                            className="my-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 xl:gap-x-4">
                            {results?.map((propertyItem: PropertyInterface) => (
                                <div key={propertyItem.id}>
                                    <PropertyCard property={propertyItem}/>
                                </div>
                            ))
                            }
                            {/* Pagination Info */}
                            {/*<div>*/}
                            {/*    Page {paginatorInfo?.current_page} of {paginatorInfo?.last_page}*/}
                            {/*</div>*/}
                        </div>

                        :

                        <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-8">
                            <div className="flex flex-col lg:flex-row w-full items-start  rounded bg-white ">

                                <div
                                    className="hidden xl:block w-full  lg:w-3/12 h-full  dark:border-gray-700  bg-white mx-auto pr-4">


                                    <div className="flex items-center justify-center py-8 ">
                                        <div className="md:w-96 rounded shadow-lg p-5 bg-indigo-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={31} height={20}
                                                 viewBox="0 0 31 20" fill="none">
                                                <path id="Fill-3" d="M14.8461 1.57112H16.7062V0H14.8461V1.57112Z"
                                                      fill="#C6C6C6"/>
                                                <path id="Fill-4" d="M16.7062 1.57112H18.5662V0H16.7062V1.57112Z"
                                                      fill="#EEEEEE"/>
                                                <path id="Fill-5" d="M14.8461 3.14229H16.7062V1.57117H14.8461V3.14229Z"
                                                      fill="#A09E9E"/>
                                                <path id="Fill-6" d="M16.7062 3.14229H18.5662V1.57117H16.7062V3.14229Z"
                                                      fill="#E7E7E6"/>
                                                <path id="Fill-7"
                                                      d="M26.2509 8.28898L30.0627 3.14224H25.6106L22.9271 7.30397V0H19.2341V13.6848H22.9271V11.4483L23.6452 10.4841L25.3482 13.6848H29.8826L26.2509 8.28898Z"
                                                      fill="white"/>
                                                <path id="Fill-8"
                                                      d="M14.8732 9.88916C14.8712 9.89116 14.8689 9.89344 14.8672 9.89571C14.8515 10.7152 14.1851 11.3757 13.3616 11.3757C12.5285 11.3757 11.8532 10.7004 11.8532 9.86722V0H8.18469V10.1943C8.18469 12.6519 10.4488 13.683 12.1584 13.683C13.9024 13.683 14.3717 13.2753 14.8732 12.83V13.6848H18.5662V3.77507H14.8732V9.88916Z"
                                                      fill="#D81767"/>
                                                <path id="Fill-9"
                                                      d="M14.8461 10.0721C14.7456 10.8069 14.1244 11.3757 13.3616 11.3757C12.5285 11.3757 11.8532 10.7004 11.8532 9.86722V0H8.18469V10.1943C8.18469 12.6519 10.4488 13.683 12.1584 13.683C13.8711 13.683 14.3546 13.2895 14.8461 12.8536V10.0721Z"
                                                      fill="white"/>
                                                <path id="Fill-10" d="M14.8732 13.6847H18.5662V13.2929H14.8732V13.6847Z"
                                                      fill="#D81767"/>
                                                <path id="Fill-11" d="M14.8461 13.6848H18.5662V3.77509H14.8461V13.6848Z"
                                                      fill="white"/>
                                                <path id="Fill-12"
                                                      d="M0 0V3.4152H3.6725V13.6848H7.58035V3.42005H8.18469V3.61095H11.8532V0H0Z"
                                                      fill="white"/>
                                                <path
                                                    id="TailwindUIkit"
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M5.80659 17.1598C5.80659 17.3512 5.65158 17.5063 5.46011 17.5063C5.27319 17.5063 5.11819 17.3512 5.11819 17.1598C5.11819 16.9683 5.27319 16.8179 5.46011 16.8179C5.65158 16.8179 5.80659 16.9683 5.80659 17.1598ZM1.65487 17.4744V19.9453H1.00294V17.4744H0.113953V16.9045H2.5393V17.4744H1.65487ZM4.01111 19.6627C3.83787 19.8815 3.6008 20 3.33183 20C2.7802 20 2.35622 19.5806 2.35622 18.8421C2.35622 18.1263 2.77108 17.6887 3.33183 17.6887C3.59168 17.6887 3.83331 17.7981 4.01111 18.026V17.7434H4.59465V19.9453H4.01111V19.6627ZM3.51418 19.4848C3.18138 19.4848 2.95344 19.2249 2.95344 18.842C2.95344 18.4636 3.18138 18.2037 3.51418 18.2037C3.70566 18.2037 3.91537 18.3131 4.01111 18.459V19.234C3.91537 19.3799 3.70566 19.4848 3.51418 19.4848ZM5.75188 19.9453V17.7433H5.1729V19.9453H5.75188ZM7.4334 19.8587C7.34678 19.9362 7.18722 20 6.95016 20C6.54441 20 6.33014 19.7903 6.33014 19.3937V16.9045H6.90913V19.2387C6.90913 19.38 6.98207 19.4849 7.10972 19.4849C7.19634 19.4849 7.2784 19.453 7.31031 19.4165L7.4334 19.8587ZM8.6955 19.9453L9.16051 18.4454L9.62552 19.9453H10.2455L10.9157 17.7433H10.3094L9.89905 19.225L9.4158 17.7433H8.90065L8.4174 19.225L8.0071 17.7433H7.40532L8.07548 19.9453H8.6955ZM11.8404 17.1598C11.8404 17.3512 11.6854 17.5063 11.494 17.5063C11.307 17.5063 11.152 17.3512 11.152 17.1598C11.152 16.9683 11.307 16.8179 11.494 16.8179C11.6854 16.8179 11.8404 16.9683 11.8404 17.1598ZM11.7857 19.9453V17.7433H11.2067V19.9453H11.7857ZM12.943 18.4591V19.9453H12.364V17.7434H12.943V18.026C13.0843 17.8619 13.3578 17.6887 13.7134 17.6887C14.2012 17.6887 14.4337 17.9622 14.4337 18.3907V19.9453H13.8502V18.6141C13.8502 18.3087 13.6906 18.2038 13.4444 18.2038C13.2165 18.2038 13.0433 18.3315 12.943 18.4591ZM15.8417 20C16.1107 20 16.3477 19.8815 16.521 19.6627V19.9453H17.1045V16.9045H16.521V18.026C16.3477 17.7981 16.1016 17.6887 15.8417 17.6887C15.281 17.6887 14.8661 18.1263 14.8661 18.8421C14.8661 19.5806 15.2901 20 15.8417 20ZM15.4633 18.842C15.4633 19.2249 15.6913 19.4848 16.0241 19.4848C16.2155 19.4848 16.4252 19.3799 16.521 19.234V18.4544C16.4252 18.3086 16.2155 18.2037 16.0241 18.2037C15.6913 18.2037 15.4633 18.4636 15.4633 18.842ZM20.2442 20C21.1696 20 21.6164 19.4803 21.6164 18.7281V16.9045H20.9554V18.7099C20.9554 19.1338 20.7137 19.4256 20.2442 19.4256C19.7746 19.4256 19.5284 19.1338 19.5284 18.7099V16.9045H18.8719V18.7281C18.8719 19.4803 19.3187 20 20.2442 20ZM22.8694 16.9045V19.9453H22.222V16.9045H22.8694ZM25.2158 19.9453V19.38L25.4802 19.0974L26.0637 19.9453H26.7886L25.8905 18.7418L26.7612 17.7434H26.05L25.2158 18.7235V16.9045H24.6368V19.9453H25.2158ZM27.7179 17.1598C27.7179 17.3512 27.5629 17.5063 27.3714 17.5063C27.1845 17.5063 27.0295 17.3512 27.0295 17.1598C27.0295 16.9683 27.1845 16.8179 27.3714 16.8179C27.5629 16.8179 27.7179 16.9683 27.7179 17.1598ZM27.6632 19.9453V17.7433H27.0842V19.9453H27.6632ZM29.4632 19.8587C29.3766 19.9362 29.2216 20.0001 28.98 20.0001C28.5742 20.0001 28.36 19.7903 28.36 19.3937V18.2494H27.9952V17.7434H28.36V17.1416H28.9389V17.7434H29.3857V18.2494H28.9389V19.2387C28.9389 19.38 29.0119 19.4849 29.1395 19.4849C29.2262 19.4849 29.3082 19.453 29.3401 19.4165L29.4632 19.8587Z"
                                                    fill="white"
                                                />
                                            </svg>
                                            <h1 className="text-lg font-bold leading-7 pt-6 text-white">Learn, share and
                                                get help from our community</h1>
                                            <p className="pt-4 text-xs leading-5 pr-12 text-white">Join Tailwind UI
                                                Kit’s discord community and kickstart your next project with beautiful,
                                                accessible user interfaces.</p>
                                            <div className="pt-7 flex items-center justify-between">
                                                <button
                                                    className="text-white rounded bg-transparent focus:outline-none hover:opacity-90 p-2 text-xs font-medium leading-3">Maybe
                                                    Later
                                                </button>
                                                <button
                                                    className="text-indigo-700 rounded bg-gray-50 focus:outline-none hover:opacity-90 p-2 text-xs font-medium leading-3">Join
                                                    TUK on Discord
                                                </button>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="">
                                        <div className="relative  flex justify-center items-center ">
                                            <img className="absolute z-0 w-full h-full"
                                                 src="https://tuk-cdn.s3.amazonaws.com/can-uploader/cta_8_bg.png"
                                                 alt="background"/>
                                            <div
                                                className="relative flex justify-center items-center  flex-col-reverse py-12  px-4">
                                                <div className="flex justify-center  items-center  flex-col">
                                                    <h1 className="text-xl w-60  text-center leading-8 text-gray-800">Speak
                                                        to us about your mortgage requirements</h1>
                                                    <p className="mt-6 text-base text-center  leading-normal text-gray-600">Connecting
                                                        with your audience has never been easier with Campaign Monitor’s
                                                        straightforward email marketing and automation tools.</p>
                                                    <div
                                                        className="mt-10 w-full  flex flex-col items-center  mx-auto space-y-2">
                                                        <button
                                                            className="w-full transition duration-500 ease-in-out flex justify-center border border-blue-700 items-center p-2 text-center bg-blue-700 rounded text-sm font-medium leading-none text-white">
                                                            Sign up
                                                        </button>
                                                        <button
                                                            className="w-full mt-4 sm:mt-0  flex hover:-translate-y-1 transition duration-500 ease-in-out justify-center border border-blue-700 items-center p-2 text-center  rounded text-sm font-medium leading-none text-blue-700">
                                                            More
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="w-1/2 ">
                                                    <img
                                                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/cta_8_img.png"
                                                        alt="templates"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="flex items-center justify-center ">
                                        <div>
                                            <div
                                                className="rounded max-w-sm shadow p-6 relative bg-white dark:bg-gray-800">
                                                <div className="flex flex-col items-start">
                                                    <div>
                                                        <div
                                                            className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-100">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={50}
                                                                 height={50} viewBox="0 0 113 76" fill="none">
                                                                <path d="M55.8038 5.90554H62.7954V0H55.8038V5.90554Z"
                                                                      fill="#475293"/>
                                                                <path d="M62.7954 5.90554H69.787V0H62.7954V5.90554Z"
                                                                      fill="#FF3565"/>
                                                                <path
                                                                    d="M55.8038 11.8111H62.7954V5.90558H55.8038V11.8111Z"
                                                                    fill="#5C5C68"/>
                                                                <path
                                                                    d="M62.7954 11.8111H69.787V5.90558H62.7954V11.8111Z"
                                                                    fill="#DCE7E6"/>
                                                                <path
                                                                    d="M98.672 31.1567L113 11.8111H96.2655L86.1787 27.4542V0H72.2974V51.4384H86.1787V43.0321L88.8777 39.4078L95.2791 51.4384H112.323L98.672 31.1567Z"
                                                                    fill="#5C5C68"/>
                                                                <path
                                                                    d="M55.9056 37.1715C55.8981 37.179 55.8896 37.1876 55.8831 37.1961C55.8242 40.2764 53.3191 42.759 50.2239 42.759C47.0923 42.759 44.554 40.2207 44.554 37.089V0H30.7648V38.3186C30.7648 47.556 39.275 51.432 45.7011 51.432C52.2567 51.432 54.0207 49.8994 55.9056 48.2254V51.4384H69.787V14.1898H55.9056V37.1715Z"
                                                                    fill="#D81767"/>
                                                                <path
                                                                    d="M55.8039 37.8591C55.4258 40.6212 53.091 42.759 50.2239 42.759C47.0923 42.759 44.554 40.2207 44.554 37.089V0H30.7648V38.3186C30.7648 47.556 39.275 51.432 45.7011 51.432C52.1389 51.432 53.9564 49.9529 55.8039 48.3143V37.8591Z"
                                                                    fill="#5C5C68"/>
                                                                <path
                                                                    d="M55.9055 51.4384H69.7869V49.9658H55.9055V51.4384Z"
                                                                    fill="#D81767"/>
                                                                <path
                                                                    d="M55.8038 51.4384H69.7869V14.1898H55.8038V51.4384Z"
                                                                    fill="#FF3565"/>
                                                                <path
                                                                    d="M0 0V12.8371H13.8042V51.4384H28.4931V12.8553H30.7647V13.5729H44.554V0H0Z"
                                                                    fill="#5C5C68"/>
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M21.8261 64.5004C21.8261 65.2201 21.2435 65.8028 20.5237 65.8028C19.8212 65.8028 19.2385 65.2201 19.2385 64.5004C19.2385 63.7807 19.8212 63.2152 20.5237 63.2152C21.2435 63.2152 21.8261 63.7807 21.8261 64.5004ZM6.22048 65.6828V74.9706H3.77001V65.6828H0.428467V63.5408H9.54489V65.6828H6.22048ZM15.0772 73.9081C14.426 74.7307 13.5349 75.1762 12.5239 75.1762C10.4504 75.1762 8.85675 73.5997 8.85675 70.8236C8.85675 68.1333 10.4161 66.4882 12.5239 66.4882C13.5006 66.4882 14.4089 66.8995 15.0772 67.7563V66.6938H17.2706V74.9706H15.0772V73.9081ZM13.2093 73.2398C11.9584 73.2398 11.1016 72.2631 11.1016 70.8236C11.1016 69.4013 11.9584 68.4246 13.2093 68.4246C13.929 68.4246 14.7173 68.8359 15.0772 69.3842V72.2974C14.7173 72.8457 13.929 73.2398 13.2093 73.2398ZM21.6204 74.9706V66.6939H19.4441V74.9706H21.6204ZM27.9409 74.645C27.6153 74.9363 27.0155 75.1762 26.1245 75.1762C24.5993 75.1762 23.7939 74.388 23.7939 72.8971V63.5408H25.9702V72.3145C25.9702 72.8457 26.2444 73.2399 26.7242 73.2399C27.0498 73.2399 27.3583 73.1199 27.4782 72.9828L27.9409 74.645ZM32.6849 74.9706L34.4328 69.3328L36.1807 74.9706H38.5112L41.0302 66.6939H38.7511L37.2089 72.2631L35.3924 66.6939H33.456L31.6396 72.2631L30.0974 66.6939H27.8354L30.3544 74.9706H32.6849ZM44.5061 64.5004C44.5061 65.2201 43.9235 65.8028 43.2038 65.8028C42.5012 65.8028 41.9185 65.2201 41.9185 64.5004C41.9185 63.7807 42.5012 63.2152 43.2038 63.2152C43.9235 63.2152 44.5061 63.7807 44.5061 64.5004ZM44.3004 74.9706V66.6939H42.1242V74.9706H44.3004ZM48.6503 69.3842V74.9706H46.474V66.6938H48.6503V67.7563C49.1815 67.1394 50.2097 66.4882 51.5463 66.4882C53.3799 66.4882 54.2538 67.5164 54.2538 69.1272V74.9706H52.0604V69.9668C52.0604 68.8187 51.4607 68.4246 50.5353 68.4246C49.6785 68.4246 49.0273 68.9044 48.6503 69.3842ZM59.5462 75.1762C60.5572 75.1762 61.4483 74.7307 62.0994 73.9082V74.9706H64.2929V63.5408H62.0994V67.7563C61.4483 66.8995 60.5229 66.4882 59.5462 66.4882C57.4384 66.4882 55.879 68.1333 55.879 70.8237C55.879 73.5997 57.4727 75.1762 59.5462 75.1762ZM58.1239 70.8236C58.1239 72.2631 58.9807 73.2398 60.2316 73.2398C60.9513 73.2398 61.7396 72.8457 62.0994 72.2974V69.3671C61.7396 68.8187 60.9513 68.4246 60.2316 68.4246C58.9807 68.4246 58.1239 69.4013 58.1239 70.8236ZM76.0942 75.1762C79.5728 75.1762 81.2522 73.2227 81.2522 70.3953V63.5408H78.7674V70.3267C78.7674 71.9204 77.8592 73.0171 76.0942 73.0171C74.3292 73.0171 73.4038 71.9204 73.4038 70.3267V63.5408H70.9362V70.3953C70.9362 73.2227 72.6156 75.1762 76.0942 75.1762ZM85.9619 63.5408V74.9706H83.5285V63.5408H85.9619ZM94.7815 74.9706V72.8457L95.7754 71.7833L97.9688 74.9706H100.693L97.3177 70.4467L100.591 66.6938H97.9174L94.7815 70.3781V63.5408H92.6052V74.9706H94.7815ZM104.187 64.5004C104.187 65.2201 103.604 65.8028 102.884 65.8028C102.182 65.8028 101.599 65.2201 101.599 64.5004C101.599 63.7807 102.182 63.2152 102.884 63.2152C103.604 63.2152 104.187 63.7807 104.187 64.5004ZM103.981 74.9706V66.6939H101.805V74.9706H103.981ZM110.747 74.645C110.421 74.9363 109.839 75.1762 108.93 75.1762C107.405 75.1762 106.6 74.388 106.6 72.8971V68.596H105.229V66.6939H106.6V64.4319H108.776V66.6939H110.456V68.596H108.776V72.3145C108.776 72.8457 109.05 73.2399 109.53 73.2399C109.856 73.2399 110.164 73.1199 110.284 72.9828L110.747 74.645Z"
                                                                    fill="#5C5C68"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div
                                                            className="py-2 px-4  top-12 absolute right-0 bg-yellow-300 flex items-center justify-center rounded-tl-3xl rounded-bl-3xl">
                                                            <p className="text-xs font-semibold text-center text-gray-900">SPONSORED</p>
                                                        </div>
                                                        <div className=" pt-4">
                                                            <p className="text-xl font-semibold leading-5 pt-1 text-gray-800 dark:text-gray-100">Product
                                                                Designer</p>
                                                            <p className="text-sm leading-4 pt-2 text-gray-500 dark:text-gray-400">
                                                                <span className="text-indigo-700 font-semibold">Invision App</span>,
                                                                Singapore
                                                            </p>
                                                        </div>
                                                        <div className="mt-2">
                                                            <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">We
                                                                are looking to hire a freelance UI/UX designer fluent in
                                                                the use of Figma with at least 2 years of experience in
                                                                delivering top quality web application and mobile
                                                                application designs.</p>
                                                            <div
                                                                className="flex flex-col items-center  mt-4 space-y-4 w-full">
                                                                <div className="flex items-center">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={16}
                                                                         height={16} viewBox="0 0 36 36" fill="none">
                                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                                              d="M25.2 19.8H18C17.0064 19.8 16.2 18.9954 16.2 18V10.8C16.2 9.8046 17.0064 9 18 9C18.9936 9 19.8 9.8046 19.8 10.8V16.2H25.2C26.1954 16.2 27 17.0046 27 18C27 18.9954 26.1954 19.8 25.2 19.8ZM18 0C8.0748 0 0 8.0748 0 18C0 27.9252 8.0748 36 18 36C27.9252 36 36 27.9252 36 18C36 8.0748 27.9252 0 18 0Z"
                                                                              fill="#6B7280"/>
                                                                    </svg>
                                                                    <p className="text-sm leading-4 text-gray-500 ml-2 dark:text-gray-400">info@theagencyondemand.co.uk</p>
                                                                </div>
                                                                <div className="flex items-center ">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={16}
                                                                         height={16} viewBox="0 0 40 36" fill="none">
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            clipRule="evenodd"
                                                                            d="M19.9998 19C18.3458 19 16.9998 20.346 16.9998 22C16.9998 23.654 18.3458 25 19.9998 25C21.6538 25 22.9998 23.654 22.9998 22C22.9998 20.346 21.6538 19 19.9998 19ZM19.9999 29C16.1399 29 12.9999 25.86 12.9999 22C12.9999 18.14 16.1399 15 19.9999 15C23.8599 15 26.9999 18.14 26.9999 22C26.9999 25.86 23.8599 29 19.9999 29ZM15.9996 5.00001C15.9996 4.44801 16.4496 4.00001 16.9996 4.00001H22.9996C23.5496 4.00001 23.9996 4.44801 23.9996 5.00001V8.00001H15.9996V5.00001ZM34 8H28V5C28 2.244 25.758 0 23 0H17C14.242 0 12 2.244 12 5V8H6C2.692 8 0 10.692 0 14V30C0 33.308 2.692 36 6 36H34C37.308 36 40 33.308 40 30V14C40 10.692 37.308 8 34 8Z"
                                                                            fill="#6B7280"
                                                                        />
                                                                    </svg>
                                                                    <p className="text-sm leading-4 text-gray-500 ml-2 dark:text-gray-400">01952
                                                                        000 000</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <div className="w-full  dark:bg-gray-800 pl-4 border-l ">
                                    {results?.map((propertyItem:PropertyInterface) => (
                                        <div key={propertyItem.id}>
                                            {propertyItem.is_featured ? <PropertyCardFeaturedList property={propertyItem}/> : <PropertyCardList property={propertyItem}/>}

                                        </div>
                                    ))
                                    }
                                    {/* Pagination Info */}
                                    {pagination.current_page !== pagination.last_page ? (

                                        <div onClick={handleAddMore}
                                              className="rounded-full font-bold bg-yellow-300 p-4 text-black shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                            <span className="text-2xl ">GO</span>
                                        </div>
                                    ) : null
                                    }
                                </div>

                            </div>
                        </div>
                    }


                </div>

            </div>
        )

}
