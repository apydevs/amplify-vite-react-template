'use client'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {useDispatch, useSelector} from "react-redux";
import {openDraw} from "../store/features/counter/counterSlice.ts";
import {RootState} from "../store/store.ts";
import PackCard from "./offerpacks/PackCard.tsx";

export default function SideModal() {
    const modal = useSelector((state: RootState) => state.counter.openDraw);
    const dispatch = useDispatch();

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
                                    <div className="w-full xl:w-1/2">
                                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl px-10 pt-5">Available Offer Packs</h2>
                                        <PackCard id={'1'} price={19.99} title={"20 Offers on any property"} offer={20} exclusive={false}/>
                                        <PackCard id={'1'} price={6.99} title={"5 Offers on any property"} offer={5} exclusive={true}/>
                                        <PackCard id={'2'} price={14.99} title={"16 Offers on any property"} offer={16} exclusive={false}/>
                                        <PackCard id={'1'} price={29.99} title={"30 Offers on any property"} offer={30} exclusive={true}/>

                                    </div>
                                    <div className="w-full xl:w-1/2">
                                        <div className="mx-auto max-w-2xl sm:text-center">
                                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Simple
                                                no-tricks pricing</h2>
                                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                                Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi
                                                iusto modi velit ut non voluptas
                                                in. Explicabo id ut laborum.
                                            </p>
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
