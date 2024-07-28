import { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBath,faBedFront } from "@fortawesome/pro-regular-svg-icons";

const PropertyCardList = ({ property }) => {
    const [open, setOpen] = useState(false);

    return (
        <div
            onMouseOver={() => setOpen(true)}  // Set open to true when mouse enters the div
            onMouseOut={() => setOpen(false)}  // Set open to false when mouse leaves the div
            id={property.id}
            key={property.id}
        >
list
            <Link to={`/search/properties/${property.id}`}>
                <div className={`group relative cursor-pointer border-[0.5rem] ${property.is_featured ? "border-yellow-300" : "border-grey-200"}  
                rounded-[0.5rem] shadow grid grid-cols-2 `}>

                    <div className="flex flex-col col-span-1">
                        <div className="flex flex-row space-x-2">
                            <img
                                alt={property.title}
                                src={property.imageSrc ?? 'https://media.rightmove.co.uk/37k/36689/145771118/36689_TES240020_IMG_18_0000.jpeg'}
                                className="object-cover object-center  lg:h-72 lg:w-full cursor-pointer "
                            />
                        </div>
                            <div className="px-2 bg-yellow-300 min-h-8">
                                {property.title}
                            </div>
                    </div>

                    <div className="p-5 flex flex-col">
                        <span className="px-5">{property.title} </span>
                        <p className="px-5 my-2 text-sm text-gray-700 px-2 whitespace-pre-line mb-2">{property.content}</p>

                    </div>

                </div>
            </Link>
        </div>
    );
}

export default PropertyCardList;
