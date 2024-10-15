import { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from "react-redux";
import { openDraw } from "../store/features/counter/counterSlice";
import { RootState } from "../store/store";
import PackCard from "./offerpacks/PackCard";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "./stripe/checkout";
import { useGatewayIntent } from "../hooks/useGatewayIntent";
import { useOfferPacks } from "../hooks/useOfferPacks";
import { pluralize } from "../utils/pluralizeUtil";

const stripePromise = loadStripe('pk_test_e8u90ge5tOPZbvNTxaeGRlA0');

// Define the types for packs
interface OfferPack {
    id: number;
    title: string;
    price: number;
    offer: number;
    information:string;
    exclusive: boolean;
    selected: boolean;
}

export default function SideModal() {
    const [packs, setPacks] = useState<OfferPack[]>([]);
    const modal = useSelector((state: RootState) => state.counter.openDraw);
    const dispatch = useDispatch();
    const [cs, setCs] = useState<string>('');
    const attemptPaymentIntent = useGatewayIntent();
    const { loading, error, data } = useOfferPacks(); // Custom hook to fetch offer packs
    const selectedPack = packs.find(item => item.selected);

    // useEffect to fetch data when component loads
    useEffect(() => {
        if (data && data.OfferPack) {
            setPacks(data.OfferPack);
        }
    }, [data]); // Dependency on data

    async function handlePackSelection(id: number) {
        const updatedPacks = packs.map((item) => ({
            ...item,
            selected: item.id === id,
        }));
        setPacks(updatedPacks);

        const index = updatedPacks.findIndex((item) => item.id === id);
        if (index >= 0) {
            const { data, errors } = await attemptPaymentIntent({
                variables: {
                    pid: updatedPacks[index].id
                },
            });
            if (errors){
                console.log('error',errors)
            }

            if(!data && !errors){
                return (
                    <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                        <div className="animate-pulse flex space-x-4">
                            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                            <div className="flex-1 space-y-6 py-1">
                                <div className="h-2 bg-slate-700 rounded"></div>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                                    </div>
                                    <div className="h-2 bg-slate-700 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            if (data) {
                setCs(data.paymentIntent.client_secret);
            }
        }
    }

    const options = {
        clientSecret: cs,
    };

    return (
        <Dialog open={modal} onClose={() => dispatch(openDraw(false))} className="relative z-50">
            <div className="fixed inset-0"/>
            <div className="fixed inset-0 overflow-hidden ">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                        <DialogPanel className="pointer-events-auto w-screen transform transition duration-500 ease-in-out sm:duration-700">
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div className="px-4 py-6 sm:px-6 border-b">
                                    <div className="flex items-start justify-between">
                                        <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                                            Offer Packs Available
                                        </DialogTitle>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                onClick={() => dispatch(openDraw(false))}
                                                className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                                            >
                                                <XMarkIcon aria-hidden="true" className="h-6 w-6"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Main */}
                                <div className="divide-x divide-gray-200 flex flex-col lg:flex-row mx-auto container">
                                    <div className="w-full xl:w-1/2 h-screen overflow-y-scroll pb-10">
                                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl px-10 pt-5">
                                            Available Offer Packs
                                        </h2>
                                        {loading ? (
                                            <p>Loading offer packs...</p>
                                        ) : error ? (
                                            <p>Error loading offer packs: {error.message}</p>
                                        ) : (
                                            packs.map((item) => (
                                                <PackCard
                                                    key={item.id}
                                                    id={item.id}
                                                    price={item.price}
                                                    info={item.information}
                                                    title={item.title}
                                                    offer={item.offer}
                                                    exclusive={item.exclusive}
                                                    selected={item.selected}
                                                    onSelect={handlePackSelection}
                                                />
                                            ))
                                        )}
                                    </div>
                                    <div className="w-full xl:w-1/2">
                                        <div className="mx-auto max-w-2xl sm:text-center mt-5 px-10 lg:px-2.5 mb-24">
                                            <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                                Complete your purchase to place offers
                                            </h2>
                                            {selectedPack ? (
                                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                                    You have selected an offer pack that contains {pluralize(selectedPack.offer, 'offer')}.
                                                    {selectedPack.exclusive && (
                                                        <>
                                                            <br/>
                                                            <span>
                                                                <span className="font-bold text-lg">Exclusive</span> to this property!
                                                            </span>
                                                        </>
                                                    )}
                                                </p>
                                            ) : (
                                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                                    Please select an offer pack, that you would like to purchase, you will then see our secure payment processing form.
                                                </p>
                                            )}
                                            {cs && (
                                                <Elements stripe={stripePromise} options={options}>
                                                    <CheckoutForm/>
                                                </Elements>
                                            )}
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
