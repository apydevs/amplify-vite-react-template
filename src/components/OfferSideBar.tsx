'use client'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store.ts";
import { openOfferDraw } from "../store/features/counter/counterSlice.ts";
import { useEffect, useState, useCallback } from "react";
import debounce from 'lodash/debounce';

interface OfferSidebarProps {
    maxOffer: string;
}

export default function OfferSideBar({ maxOffer }: OfferSidebarProps) {
    const open = useSelector((state: RootState) => state.counter.openOfferDraw);
    const user = useSelector((state: RootState) => state.users.user);
    const [offered, setOffered] = useState<number[]>([0]);
    const [inputValues, setInputValues] = useState<string[]>([""]); // Temporary local state for input values
    const [max, setMax] = useState<number>(0);
    const dispatch = useDispatch();

    useEffect(() => {
        // Replace commas and parse with parseFloat to retain decimal places
        const parsedMax = parseFloat(maxOffer.replace(/,/g, ''));
        setMax(parsedMax);
    }, [maxOffer]);

    function autoOffer(i: number) {
        const parsedMax = parseFloat(maxOffer.replace(/,/g, ''));

        if (isNaN(parsedMax)) {
            console.error("Invalid maxOffer value.");
            return;
        }

        // Create a copy of the offered array
        const updatedOffered = [...offered];
        // Update the value at index i
        updatedOffered[i] = Math.floor(Math.random() * parsedMax) + 1000;
        setOffered(updatedOffered);

        // Update the inputValues to reflect the new offer
        const updatedInputValues = [...inputValues];
        updatedInputValues[i] = updatedOffered[i].toFixed(2); // Ensure it has two decimal places if needed
        setInputValues(updatedInputValues);
    }

    // Debounced function for setting the offered array
    const debouncedSetOffered = useCallback(
        debounce((index: number, value: string) => {
            const updatedOffered = [...offered];
            updatedOffered[index] = Number(parseFloat(value).toString() || '0.00');
            setOffered(updatedOffered);
        }, 300),
        [offered]
    );

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>, index: number): void {
        const { value } = event.target;

        if (parseFloat(value) > max) {
            alert('Offer amount exceeds maximum value');
            return;
        }

        // Update the temporary local state for the input value
        const updatedInputValues = [...inputValues];
        updatedInputValues[index] =     new Intl.NumberFormat('en-GB').format(parseFloat(value))
        // updatedInputValues[index] =  Number(parseFloat(value) || 0.00);
        setInputValues(updatedInputValues);

        // Call the debounced function to update the offered state
        debouncedSetOffered(index, value);
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
                                            Place Offer
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
                                    <p className="text-sm text-black mb-5">
                                        You currently have a total of <strong>{user.offers}</strong> offers.<br />
                                        <span className="mt-1">
                                            The maximum offer on this property is <strong>£{maxOffer}</strong>
                                        </span>
                                    </p>

                                    <div className="flex flex-row items-center justify-between rounded-lg border-2 border-yellow-300 bg-white">
                                        <span className="px-3 text-gray-400"> #1</span>
                                        <span className="text-black"> £</span>
                                        <input
                                            className="m-1 pr-4 py-4 w-full max-w-xl border-y-0 border-yellow-300 focus:outline-none ring-0 focus:ring-0"
                                            placeholder="Offer amount"
                                            value={inputValues[0]}
                                            onChange={(e) => handleInputChange(e, 0)}
                                        />
                                        <div className="m-0.5 px-1 py-1 ">
                                            <button
                                                onClick={() => autoOffer(0)}
                                                className="border-2 border-yellow-300 rounded-2xl px-4 py-2 hover:bg-black hover:text-white hover:border-gray-200"
                                            >
                                                Auto
                                            </button>
                                        </div>
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

