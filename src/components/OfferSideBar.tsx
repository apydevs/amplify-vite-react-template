'use client'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store.ts";
import {  openOfferDraw } from "../store/features/counter/counterSlice.ts";
import { useEffect, useState } from "react";
import OfferInput from "./elements/offerInput.tsx";

interface OfferSidebarProps {
    maxOffer: string;
}

export default function OfferSideBar({ maxOffer }: OfferSidebarProps) {
    const open = useSelector((state: RootState) => state.counter.openOfferDraw);
    const user = useSelector((state: RootState) => state.users.user);
    const [offered, setOffered] = useState<number[]>(Array.from({ length: user.offers ?? 0 }, () => 0));
    const dispatch = useDispatch();

    useEffect(() => {
        const parsedMax = parseFloat(maxOffer.replace(/,/g, ''));
        setOffered((prevOffered) => prevOffered.map((offer) => Math.min(parsedMax, offer))); // Ensure offered does not exceed maxOffer
    }, [maxOffer]);

    // Callback function to handle offer value changes
    function handleOfferChange(index: number, value: number) {
        const updatedOffered = [...offered];
        updatedOffered[index] = value;

        // Remove elements with value 0
        setOffered(updatedOffered.filter((offer) => offer !== 0));
        console.log(updatedOffered.filter((offer) => offer !== 0));
    }

    function handleSubmitOffer() {
        const validOffers = offered.filter((offer) => offer !== 0 && offer !== null && offer !== undefined);
        const offerCount = validOffers.length;
        console.log("Valid Offers:", validOffers);
        console.log("Offer Count:", offerCount);
    }

    return (
        <Dialog open={open} onClose={() => dispatch(openOfferDraw(false))} className="relative z-10">
            {open && <div className="fixed inset-0 bg-gray-100 opacity-50" />}
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <DialogPanel
                            transition
                            className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                        >
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div className="bg-[#ffe842] px-4 py-6 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <DialogTitle className="text-base font-semibold leading-6 text-black">
                                            Place An Offer
                                        </DialogTitle>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                onClick={() => dispatch(openOfferDraw(false))}
                                                className="relative rounded-md bg-white text-black hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-white"
                                            >
                                                <span className="absolute -inset-2.5" />
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-1">
                                        <p className="text-sm text-black">
                                            All offers are private, and not shown directly to anyone, whilst the listing is active.
                                        </p>
                                    </div>
                                </div>
                                <div className="relative flex-1 px-4 py-6 sm:px-6">
                                    <p className="absolute bottom-0 w-10/12 text-sm text-black mb-5 text-center">
                                        <span className="">Each offer is what you are willing to pay for this property.</span>
                                        <span className="font-bold">
                                            No Payment is required or taken upon placing offers
                                            <span className="underline cursor-pointer"> More Info</span>
                                        </span>
                                    </p>

                                    <p className="text-sm text-black mb-5">
                                        You currently have a total of <strong>{user.offers}</strong> offers.<br />
                                        <span className="mt-1">
                                            The maximum offer on this property is <strong>£{maxOffer}</strong>
                                        </span>
                                    </p>

                                    <div className="space-y-2">
                                        {Array.from({ length: user.offers ?? 0 }, (_, index) => (
                                            <OfferInput
                                                key={index}
                                                maxOffer={maxOffer}
                                                index={index}
                                                onOfferChange={handleOfferChange}
                                            />
                                        ))}

                                        {(user.offers && user.offers > 0 && (
                                            <div onClick={handleSubmitOffer} title="save offers"
                                                 className="mt-24 flex w-full items-center justify-center rounded-lg bg-yellow-300 px-5 py-2.5 text-sm font-medium text-black hover:bg-black hover:text-white focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0"
                                                 role="button">
                                                Submit Offers
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}
