import { CheckIcon } from '@heroicons/react/20/solid'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {useNavigate} from "react-router-dom";
import {openDraw} from "../../store/features/counter/counterSlice.ts";

const includedFeatures = [
    'Private Secure Offers',
    'Exclusive Property Pricing ',
    'Use on any property',
    'Official member t-shirt',
]

type CardValues = {
    price: number,
    offer: number,
    title: string,
    id: string,
    exclusive: boolean,
    onSelect: (id: string) => void; // Add onSelect prop
    selected:boolean
   }

export default function PackCard({price,offer,title,id,exclusive = false, onSelect,selected = false }:CardValues) {
    const user = useSelector((state: RootState) => state.users.user);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    return (
        <div id={id} >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className={` mx-auto  max-w-2xl rounded-3xl  ${!exclusive ? ' ring-1 ring-gray-200': 'ring-2 ring-yellow-300'}   sm:mt-8 lg:mx-0 lg:flex lg:max-w-none `}>
                    <div className="p-8 sm:p-10 lg:flex-auto">
                        <h3 className="text-xl font-bold tracking-tight text-gray-900">{title}</h3>

                        <div className="mt-10 flex items-center gap-x-4">
                            <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">What’s
                                included</h4>
                            <div className="h-px flex-auto bg-gray-100"/>
                        </div>
                        <ul
                            role="list"
                            className="mt-2 grid grid-cols-1 gap-2 text-sm leading-6 text-gray-600  sm:gap-2"
                        >
                            {includedFeatures.map((feature) => (
                                <li key={feature} className="flex gap-x-3">
                                    <CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-indigo-600"/>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="-mt-2 p-2 lg:mt-0 lg:w-md lg:max-w-md lg:flex-shrink-0">
                        <div
                            className={`rounded-2xl bg-grey-50  py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16 relative`}>
                            {(exclusive && (
                                <div
                                    className={`py-2 px-4  top-6 absolute right-0 bg-yellow-300 flex items-center justify-center rounded-tl-3xl rounded-bl-3xl`}>
                                    <p className="text-xs font-semibold text-center text-gray-900">Exclusive To this
                                        property</p></div>
                                ))}

                            <div className="mx-auto max-w-xs px-8">
                                <p className="text-base font-semibold text-gray-600 mt-6">{offer} offers </p>
                                <p className="mt-1 flex items-baseline justify-center gap-x-2">
                                <span className="text-5xl font-bold tracking-tight text-gray-900">£{price}</span>
                                    <span
                                        className="text-sm font-semibold leading-6 tracking-wide text-gray-600">GBP</span>
                                </p>

                            {( !user.token ? (
                                <button
                                    onClick={() =>{
                                        navigate('/login')
                                        dispatch(openDraw(false))
                                    } }
                                    className="mt-10 block w-full rounded-md bg-black px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Login / Register
                                </button>
                            ) : (
                                <button
                                    onClick={() => onSelect(id)} // Call onSelect with the id
                                    className="mt-10 block w-full rounded-md bg-black px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    {(selected ? 'Selected':'Select')}
                                </button>
                            ))}

                                <p className="mt-6 text-xs leading-5 text-gray-600">
                                    Invoices and receipts available for easy company reimbursement
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
