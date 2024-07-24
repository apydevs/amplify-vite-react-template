import { useState } from 'react';

const PropertyCard = () => {
    const [open, setOpen] = useState(false);

    return (
      <>
          <a
          href="#"
          className="relative group bg-white rounded-3xl p-2 border-[10px] border-yellow-300"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
      >
          <div className="absolute z-1 top-0 md:top-3 lg:top-4 left-8">
              <div className="rating text-center bg-white rounded-full">
                  <p className="text-3xl sm:text-xl ml-2 md:text-2xl md:mt-3 lg:mt-2 lg:text-xl font-semibold text-stone-800">
                      <i className="fa-solid fa-star color-primary"></i> £28,000
                  </p>
                  <p className="text-xs -mt-2 text-stone-800 font-semibold">
                      <i className="fa-solid fa-star color-primary"></i> max offer
                  </p>
              </div>
          </div>
          <div className="houseMaskCard relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <img
                  src="https://imgyeoley.s3.eu-west-2.amazonaws.com/profile-photos/gregson-walk-dawley-tf4-2ga/1273e69f-00d7-4c5c-8a15-42f7b5180d31.jpg"
                  alt="Olive drab green insulated bottle with flared screw lid and flat top."
                  className="min-h-[360px] object-cover object-center group-hover:opacity-75"
              />
              {open && (
                  <div className="hidden xl:block absolute z-30 bottom-0 right-0 md:bottom-6 lg:right-0 xl:right-0 xl:bottom-0">
                      <div className="relative">
                          <img
                              src="./../src/assets/media/icon/arrow-dark.svg"
                              className="absolute bottom-0 right-1 md:bottom-1 md:right-2 border-[10px] w-18 md:w-16 rounded-full border-white z-20"
                              alt=""
                          />
                          <img
                              src="./../src/assets/media/vector-shape/bottom-shape.png"
                              className="corner-shape"
                              alt=""
                          />
                      </div>
                  </div>
              )}
          </div>
          <div className="name-rating flex items-center justify-between my-1 px-3">
              <h4 className="text-lg font-semibold text-stone-800">Telford, Shropshire</h4>
              <div className="rating text-center">
                  <p className="text-lg font-semibold text-stone-800">
                      <i className="fa-solid fa-star color-primary"></i> £289,995
                  </p>
                  <p className="text-xs -mt-2 text-stone-800 font-semibold">
                      <i className="fa-solid fa-star color-primary"></i> valuation
                  </p>
              </div>
          </div>
          <div className="px-3">
              <p className="text-sm text-stone-800 mb-2">
                  At quis nullam duis sed aliquet faucibus. Sed diam pretium cum eget.
              </p>
              <div className="flex flex-row justify-between overflow-hidden">
                  <ul className="flex flex-row justify-start items-center w-1/2">
                      <li className="flex flex-row items-center">
                          <img className="h-4" src="/assets/media/icon/double-bed-icon.png" alt="" />
                          <p className="text-lg px-2 bold light-black">3</p>
                      </li>
                      <li className="flex flex-row items-center">
                          <img className="h-4" src="/assets/media/icon/tv-icon.png" alt="" />
                          <p className="text-lg px-2 bold light-black">3</p>
                      </li>
                  </ul>
                  <div className="text-wrap max-h-6 text-sm">
                      <p className="line-clamp-1">Agents here Agents here Agents here</p>
                  </div>
              </div>
          </div>
      </a>
      </>

    );
}

export default PropertyCard;
