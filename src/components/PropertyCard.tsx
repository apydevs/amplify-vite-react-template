import { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBath,faBedFront,faToilet,faSquareParking,faGarage } from "@fortawesome/pro-regular-svg-icons";

const PropertyCard = ({ property }) => {
    const [open, setOpen] = useState(false);

    return (
        <div
            onMouseOver={() => setOpen(true)}  // Set open to true when mouse enters the div
            onMouseOut={() => setOpen(false)}  // Set open to false when mouse leaves the div
            id={property.id}
            key={property.id}
        >grid

            <Link to={`/search/properties/${property.id}`}>
                <div
                    className={`group relative cursor-pointer border-[0.5rem] ${property.is_featured ? "border-yellow-300" : "border-grey-200"}  rounded-[2rem] shadow p-3`}>
                    <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:shaddow lg:h-96 cursor-pointer">
                        <div className="absolute w-[151px] h-[94px] cardTop-img flex flex-col items-start pl-5 justify-start">
                            <div className="text-sm">Max Offer</div>
                            <div className="font-semibold">
                                {property ? `£${new Intl.NumberFormat('en-GB').format(property.max)}` : ''}
                            </div>
                        </div>
                        <img
                            alt={property.title}
                            src={property.imageSrc ?? 'https://media.rightmove.co.uk/37k/36689/145771118/36689_TES240020_IMG_18_0000.jpeg'}
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full cursor-pointer rounded-[1.5rem]"
                        />
                        {open && (  // This block will only render when `open` is true
                            <div className="absolute -bottom-1 -right-1 w-16 border-white rounded-full border-[0.5rem] h-16 bg-white cardTop-arrow flex flex-col items-start pl-5 justify-start"></div>
                        )}
                    </div>
                    <div className="mt-4 w-full py-2">
                        <div>
                            <h3 className="text-md text-gray-900 px-2 mb-2">
                                <div key={property.id}>
                                    <span aria-hidden="true" className="absolute inset-0"></span>
                                    {property.title}
                                </div>
                            </h3>
                            <p className="text-sm text-gray-700 px-2 whitespace-pre-line mb-2">{property.content}</p>
                            <div className="flex flex-col justify-between px-2">
                                <div className="flex flex-row justify-between items-center">
                                    <div className="flex flex-row justify-start items-center">
                                            <span className="me-1 rounded text-xs font-medium text-black  flex flex-row">
                                                <FontAwesomeIcon icon={faBath} className="w-4 h-4 "/>
                                                <span   className="md:text-sm  mx-2">{property.bathrooms}</span>
                                             </span>
                                            <span   className="me-5 rounded px-2.5 py-0.5 text-xs font-medium text-black dark:bg-yellow-900 dark:text-yellow-300 flex flex-row">
                                                <FontAwesomeIcon icon={faBedFront} className="w-4 h-4 "/>
                                                <span
                                                    className="md:text-sm  mx-2">{property.bedrooms}</span>
                                             </span>
                                    </div>
                                    <div className="flex flex-row justify-end items-center gap-2">

                                        <div className="font-semibold text-sm text-center">
                                            <p className="text-xs text-gray-500">valuation</p>
                                            {property ? `£${new Intl.NumberFormat('en-GB').format(property.max)}` : ''}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default PropertyCard;
