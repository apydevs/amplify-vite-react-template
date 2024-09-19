'use client'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {useDispatch, useSelector} from "react-redux";
import {openDraw} from "../store/features/counter/counterSlice.ts";
import {RootState} from "../store/store.ts";
import PackCard from "./offerpacks/PackCard.tsx";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "./stripe/checkout.tsx";
import {useState} from "react";

import {useGatewayIntent} from "../hooks/useGatewayIntent.ts";

const stripePromise = loadStripe('pk_test_e8u90ge5tOPZbvNTxaeGRlA0');

const packs =
    [
        {
            id:'1',
            price:2.99,
            title:"1 Offers on any property",
            offer:1,
            exclusive:false,
            selected:false
        },
        {
            id:'2',
            price:8.99,
            title:"8 Offers on any property",
            offer:8,
            exclusive:false,
            selected:false
        },
        {
            id:'3',
            price:14.99,
            title:"20 Offers on any property",
            offer:20,
            exclusive:false,
            selected:false
        },
        {
            id:'4',
            price:19.99,
            title:"26 Offers on this property only",
            offer:26,
            exclusive:true,
            selected:false
        }
]

export default function SideModal() {

    const modal = useSelector((state: RootState) => state.counter.openDraw);
    const dispatch = useDispatch();
    const attemptPaymentIntent = useGatewayIntent();

    const [cs, setCs] = useState('')
    const selectedPack = packs.find(item => item.selected);



    async function handlePackSelection(id: string) {

        console.log(id)
        packs.map((item)=> item.selected = false);
        const index = packs.findIndex((item)=> item.id == id);

        packs[index].selected = true
        const {data, errors} = await attemptPaymentIntent({
            variables: {
                amount: packs[index].price
            },
        });

        console.log('data',data)
        setCs(data.paymentIntent.client_secret)
        console.log('errors',errors)


    }

    const options = {
        // passing the client secret obtained from the server
        clientSecret: cs,
    };


    return (
        <Dialog open={modal} onClose={()=>dispatch(openDraw(false))} className="relative z-50">
            <div className="fixed inset-0" />
            <div className="fixed inset-0 overflow-hidden ">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full  ">
                        <DialogPanel
                            transition
                            className="pointer-events-auto w-screen  transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                        >
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div className="px-4 py-6 sm:px-6 border-b">
                                    <div className="flex items-start justify-between">
                                        <DialogTitle className="text-base font-semibold leading-6 text-gray-900">Offer Packs Available</DialogTitle>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                onClick={() =>  dispatch(openDraw(false))}
                                                className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                                            >
                                                <span className="absolute -inset-2.5" />
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Main */}
                                <div className="divide-x divide-gray-200 flex flex-col lg:flex-row mx-auto container">
                                    <div className="w-full xl:w-1/2 h-screen overflow-y-scroll">
                                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl px-10 pt-5">Available Offer Packs</h2>

                                        {packs.map((item)=>

                                            <PackCard id={item.id} price={item.price} title={item.title} offer={item.offer} exclusive={item.exclusive} selected={item.selected}  onSelect={handlePackSelection} />

                                        )}
                                    <div className="my-10"></div>
                                    </div>
                                    <div className="w-full xl:w-1/2">
                                        <div className="mx-auto max-w-2xl sm:text-center mt-5">
                                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Simple
                                                no-tricks pricing</h2>
                                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                                Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi
                                                iusto modi velit ut non voluptas
                                                in. Explicabo id ut laborum.
                                            </p>




                                            {cs && (
                                                <Elements stripe={stripePromise} options={options}>
                                                    <CheckoutForm />
                                                </Elements>
                                            )}
                                            {selectedPack && (
                                                <PackCard
                                                    key={selectedPack.id}
                                                    id={selectedPack.id}
                                                    price={selectedPack.price}
                                                    title={selectedPack.title}
                                                    offer={selectedPack.offer}
                                                    exclusive={selectedPack.exclusive}
                                                    selected={selectedPack.selected}
                                                    onSelect={handlePackSelection}
                                                />
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
    )
}
