import SurveyList from '../../components/SurvayList.tsx';

const product = {
    name: 'Basic Tee 6-Pack',
    price: '$192',
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
    ],
    images: [
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
export default function PropertyDetails() {
    return (
        <>
            <section className="bg-white pt-8 antialiased dark:bg-gray-800 md:pb-8 lg:pt-0 lg:dark:bg-gray-900">

                <div className="hidden h-[724px] overflow-hidden lg:block">
                    {/* Image gallery */}
                    <div className="absolute self-center w-screen flex flex-row justify-center">
                            <div className=" w-full mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                            <img
                                alt={product.images[0].alt}
                                src={product.images[0].src}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                <img
                                    alt={product.images[1].alt}
                                    src={product.images[1].src}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                <img
                                    alt={product.images[2].alt}
                                    src={product.images[2].src}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                        </div>
                        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                            <img
                                alt={product.images[3].alt}
                                src={product.images[3].src}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>
                    </div>
                    <img className="h-full w-full object-cover dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/playstation-cover.png" alt="" />
                    <img className="hidden h-full w-full object-cover dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/playstation-cover-dark.png" alt="" />


                </div>
               <div className="relative mx-auto max-w-screen-xl px-4 lg:-mt-32">
                    <div className="border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:rounded-lg lg:rounded-b-none lg:border lg:p-8">
                        <div className="gap-12 lg:flex">
                            <div className="min-w-0 flex-1 gap-8 sm:flex sm:items-start">
                                <div className="shrink-0">
                                    <div className="w-36 shrink-0 overflow-hidden rounded-lg">
                                        <img className="h-full w-full object-cover" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/playstation.png" alt="" />
                                    </div>
                                    <button type="button" className="mt-2 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 lg:w-full">
                                        <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M13 10a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1Z" clipRule="evenodd" />
                                            <path fillRule="evenodd" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12c0 .556-.227 1.06-.593 1.422A.999.999 0 0 1 20.5 20H4a2.002 2.002 0 0 1-2-2V6Zm6.892 12 3.833-5.356-3.99-4.322a1 1 0 0 0-1.549.097L4 12.879V6h16v9.95l-3.257-3.619a1 1 0 0 0-1.557.088L11.2 18H8.892Z" clipRule="evenodd" />
                                        </svg>
                                        Image gallery
                                    </button>
                                </div>

                                <div className="mt-4 min-w-0 flex-1 sm:mt-0">
                                    <div className="flex flex-row items-center justify-between">
                                        <span className="me-2 rounded bg-yellow-300 px-2.5 py-0.5 text-lg font-medium text-gray-900 dark:bg-yellow-900 dark:text-yellow-300 border border-black"> Max Offer £32,000 </span>
                                        <div>
                                            <span className="me-2 rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"> Bth 1 </span>
                                            <span className="me-2 rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"> Bed 2 </span>
                                            <span className="me-2 rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"> Driveway1 </span>

                                        </div>

                                    </div>

                                    <h1 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">PlayStation®5 Console</h1>

                                    <div className="mt-4 flex flex-wrap items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <a href="#" className="cursor-pointer text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white">34.5k Reviews</a>
                                        </div>

                                        <div className="flex items-center gap-1.5">
                                            <svg className="h-5 w-5 text-primary-700 dark:text-primary-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                            </svg>
                                            <p className="text-sm font-medium text-primary-700 dark:text-primary-500">Free delivery</p>
                                        </div>

                                        <div className="flex items-center gap-1.5">
                                            <svg className="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4" />
                                            </svg>
                                            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Free returns</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 hidden space-y-2 sm:block">
                                        <p className="text-base font-semibold text-gray-900 dark:text-white">Quick description:</p>
                                        <div className="space-y-4">
                                            <p className="text-base font-normal text-gray-500 dark:text-gray-400">The PS5® console* unleashes new gaming possibilities that you never anticipated.</p>
                                            <p className="text-base font-normal text-gray-500 dark:text-gray-400">Experience lightning fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio**, and an all-new generation of incredible PlayStation® games.</p>
                                            <p className="text-base font-normal text-gray-500 dark:text-gray-400">Powered by an eight-core AMD Zen 2 CPU and custom AMD Radeon GPU, the PS5 is offered in two models: with and without a 4K Blu-ray drive. Supporting a 120Hz video refresh, the PS5 is more powerful than the PS4 Pro. Rather than GDDR5 memory, GDDR6 is supported with capacity doubled from 8 to 16GB. Storage is an NVMe 825GB SSD rather than a hard drive.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="hidden border-gray-200 dark:border-gray-700 sm:mt-8 sm:block lg:hidden" />

                            <div className="mt-6 shrink-0 space-y-8 sm:mt-8 lg:mt-0 lg:w-full lg:max-w-xs">
                                <div>
                                    <p className="text-2xl font-medium leading-none text-gray-900 dark:text-white">Market Value <span className="font-extrabold">£249,999</span></p>
                                    <p className="mt-2 text-base font-normal text-gray-800 dark:text-gray-400">Valuation approved by:<span className="font-semibold">Agent Here.</span> </p>
                                </div>

                                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-1">
                                    <div className="space-y-4">
                                        <a href="#" title="" className="flex items-center justify-center rounded-lg border border-yellow-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-yellow-300 hover:text-black focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-full" role="button">
                                            <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 4v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2m6-16v2m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v10m6-16v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2" />
                                            </svg>
                                            Make an offer
                                        </a>

                                        <a href="#" title="" className="mt-4 flex w-full items-center justify-center rounded-lg bg-yellow-300 px-5 py-2.5 text-sm font-medium text-black hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0" role="button">
                                            <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                                            </svg>

                                            Buy Offer Packs
                                        </a>

                                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                            Available at a lower price from
                                            <a href="#" title="" className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">other sellers</a>.
                                        </p>
                                    </div>

                                    <div className="sm:hidden">
                                        <p className="text-base font-semibold text-gray-900 dark:text-white lg:mt-4">Quick description:</p>
                                        <div className="mt-2 space-y-4">
                                            <p className="text-base font-normal text-gray-500 dark:text-gray-400">The PS5® console* unleashes new gaming possibilities that you never anticipated.</p>
                                            <p className="text-base font-normal text-gray-500 dark:text-gray-400">Experience lightning fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio**, and an all-new generation of incredible PlayStation® games.</p>
                                            <p className="text-base font-normal text-gray-500 dark:text-gray-400">Powered by an eight-core AMD Zen 2 CPU and custom AMD Radeon GPU, the PS5 is offered in two models: with and without a 4K Blu-ray drive. Supporting a 120Hz video refresh, the PS5 is more powerful than the PS4 Pro. Rather than GDDR5 memory, GDDR6 is supported with capacity doubled from 8 to 16GB. Storage is an NVMe 825GB SSD rather than a hard drive.</p>
                                        </div>
                                    </div>

                                    <hr className="hidden border-gray-200 dark:border-gray-700 lg:block" />

                                    <ul className="hidden list-outside list-disc space-y-2 pl-4 text-sm font-normal text-gray-500 dark:text-gray-400 sm:block">
                                        <li>Due to high demand, there is a limit of 1 console per order.</li>
                                        <li>Only 1 DualSense included.</li>
                                        <li>PS5 consoles will ship separately.</li>
                                        <li>A signature will be required upon delivery for this product.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white pt-4 antialiased dark:bg-gray-800 md:pb-16 lg:pt-0 lg:dark:bg-gray-900">
                <div className="relative mx-auto max-w-7xl px-4 ">
                 <SurveyList />
                </div>
            </section>
        </>
    );
}