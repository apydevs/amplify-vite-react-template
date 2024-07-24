
import { Gallery, Item } from 'react-photoswipe-gallery'
import BackPage from "../../components/BackPage.tsx";


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
            src: 'https://media.rightmove.co.uk/37k/36689/145771118/36689_TES240020_IMG_26_0001.jpeg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
            src: 'https://media.rightmove.co.uk/37k/36689/145771118/36689_TES240020_IMG_18_0000.jpeg',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: 'https://media.rightmove.co.uk/37k/36689/145771118/36689_TES240020_IMG_27_0000.jpeg',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: 'https://media.rightmove.co.uk/37k/36689/145771118/36689_TES240020_IMG_28_0000.jpeg',
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
        'Keepers Cottage is a modern spacious detached family home secluded in the Shropshire Countryside, that offers stylishly appointed accommodation including four bedrooms with en suite, as well as an attached self-contained one-bedroom annexe.\n' +
        '\n' +
        'The main reception room opens to the stunning sitting room, which has a part-vaulted, double-height ceiling with large skylights and full-height windows that flood the space with natural light. Limestone floors, exposed stone walls and an impressive fireplace fitted with a large log burner.\n' +
        '\n' +
        'The main house has an open-plan kitchen and breakfast room, with bi-fold doors opening onto the terrace. The Oak shaker kitchen has both base and wall level units, Granit worktops, integrated appliances and an Aga Cooker.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}



function PropertyImageGallery() {

    return (
        <div  className="container max-w-7xl mx-auto" >

            <div className="flex flex-row justify-between px-10">
                <BackPage/>
                <div>next</div>
            </div>

            <div className="flex items-center mx-auto justify-center w-full relative min-h-full">

                <div className="flex flex-col  w-full items-center  ">
                    <div className="w-full mx-auto dark:bg-gray-800" >
                        <div className="mx-auto">



                            <Gallery id="ReactGridGallery"  withCaption
                                     options={
                                            {  padding: { top: 20, bottom: 40, left: 100, right: 100 },
                                                wheelToZoom: true,

                                            }
                            }>
                                {product.images.map((image) => (
                                        <div className="my-5 mx-10">


                                            <Item
                                                key={image.src}
                                                original={image.src}
                                                thumbnail={image.src}
                                                width="1024"
                                                height="768"
                                                caption={image.alt}

                                            >
                                                {({ ref, open }) => (
                                                    <img ref={ref} onClick={open} src={image.src}  alt="sd" className="rounded-lg"/>
                                                )}
                                            </Item>
                                        </div>
                                    )
                                )}

                            </Gallery>
                        </div>
                    </div>



                </div>
            </div>
        </div>

    );
}

export default PropertyImageGallery;