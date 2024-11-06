import banner from "../../assets/images/main-banner-1.jpg"
import headphone from "../..//assets/images/headphone.webp"
import bg2 from "../../assets/images/bg2.webp"
import bg3 from "../../assets/images/bg3.png"
import bg4 from "../../assets/images/bg4.webp"

const Hero = () => {
  
  return (
    <section className="container mx-auto w-full h-full"
      >
      <div className="flex flex-col lg:flex-row gap-4 bg-gray-50">
      
        {/* Left Main Banner */}
        <div className="flex-1 bg-gray-200 p-6 rounded-lg flex flex-col 
          justify-center items-start relative"
        >
          {/* Banner Image */}
          <img
            src={banner}
            alt="Main Banner"
            className="absolute inset-0 w-full h-full object-fill 
              rounded-lg opacity-75"
          />
          <div className="relative z-10">
            <h2 className="text-sm uppercase font-semibold text-orange-600">
              Supercharged for Pros.
            </h2>
            <h1 className="text-2xl md:text-4xl font-bold mt-2">Special Sale</h1>
            <p className="text-lg mt-2">
              From $999.00 or $41.62/mo. for 24 mo. Footnote*
            </p>
            <button className="mt-4 bg-coral-red text-white py-2 px-4 
              rounded-lg hover:bg-blue-700"
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* Right Grid for Promotions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          
          {/* Card 1 */}
          <div className="bg-blue-100 p-4 rounded-lg flex flex-col 
            sm:flex-row lg:flex-col items-center gap-4 lg:gap-2 relative"
          >
            <img
              src={headphone}
              alt="Headphone Max"
              className="w-full sm:w-1/2 lg:w-full h-32 sm:h-48 lg:h-40 object-contain rounded-md"
            />

            <div className="flex flex-col items-center sm:items-start lg:items-center text-center sm:text-left lg:text-center gap-2">
              <h3 className="text-xs sm:text-sm lg:text-base uppercase font-semibold text-red-600">
                Best Sale
              </h3>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Headphone Max</h2>
              <p className="text-xs sm:text-sm lg:text-base mt-1">From $59.00 or $10.42/mo. for 7 mo</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-pink-100 p-4 rounded-lg flex flex-col 
            sm:flex-row lg:flex-col items-center gap-4 lg:gap-2 relative"
          >
            <img
              src={bg2}
              alt="iPad Air"
              className="w-full sm:w-1/2 lg:w-full h-32 sm:h-48 lg:h-40 object-contain rounded-md"
            />
            <div className="flex flex-col items-center sm:items-start lg:items-center text-center sm:text-left lg:text-center gap-2">
              <h3 className="text-xs sm:text-sm lg:text-base uppercase font-semibold text-red-600">
                New Arrival
              </h3>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Smartwatch</h2>
              <p className="text-xs sm:text-sm lg:text-base mt-1">From $199 or $29.99/mo. for 10 mo.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-green-100 p-4 rounded-lg flex flex-col 
            sm:flex-row lg:flex-col items-center gap-4 lg:gap-2 relative"
          >
            <img
              src={bg4} 
              alt="Smartwatch 7"
              className="w-full sm:w-1/2 lg:w-full h-32 sm:h-48 lg:h-40 object-contain rounded-md"
            />
            <div className="flex flex-col items-center sm:items-start lg:items-center text-center sm:text-left lg:text-center gap-2">
              <h3 className="text-xs sm:text-sm lg:text-base uppercase font-semibold text-red-600">
                15% Off 
              </h3>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Speaker</h2>
              <p className="text-xs sm:text-sm lg:text-base mt-1">Shop the latest band styles and colors.</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-blue-50 p-4 rounded-lg flex flex-col 
            sm:flex-row lg:flex-col items-center gap-4 lg:gap-2 relative"
          >
            <img
              src={bg3}
              alt="AirPods Max"
              className="w-full sm:w-1/2 lg:w-full h-32 sm:h-48 lg:h-40 object-contain rounded-md"
            />
            <div className="flex flex-col items-center sm:items-start lg:items-center text-center sm:text-left lg:text-center gap-2">
              <h3 className="text-xs sm:text-sm lg:text-base uppercase font-semibold text-red-600">
              Free Engraving
              </h3>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Camera</h2>
              <p className="text-xs sm:text-sm lg:text-base mt-1">High-fidelity playback & ultra-low distortion.</p>
            </div>
          </div>
        </div>

      </div>

    </section>
  )
}

export default Hero