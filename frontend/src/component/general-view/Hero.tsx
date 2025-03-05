import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import banner from "../../assets/images/main-banner-1.jpg";
import headphone from "../../assets/images/headphone.webp";
import bg2 from "../../assets/images/bg2.webp";
import bg3 from "../../assets/images/bg3.png";
import bg4 from "../../assets/images/bg4.webp";

const Hero = () => {
  const navigate = useNavigate();

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const hoverEffect = {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300 },
  };

  return (
    <section className="container mx-auto w-full h-full font-montserrat py-8">
      <motion.div
        className="flex flex-col lg:flex-row gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Main Banner */}
        <motion.div
          className="flex-1 bg-gray-200 p-8 rounded-lg relative overflow-hidden"
          variants={itemVariants}
          whileHover={hoverEffect}
        >
          <img
            src={banner}
            alt="Main Banner"
            className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-75"
          />
          <div className="relative z-10 text-white">
            <h2 className="text-sm uppercase font-semibold text-orange-400">
              Supercharged for Pros
            </h2>
            <h1 className="text-3xl md:text-5xl font-bold mt-2">Special Sale</h1>
            <p className="text-lg mt-2">
              From $999.00 or $41.62/mo. for 24 mo.
            </p>
            <motion.button
              className="mt-6 bg-coral-red text-white py-3 px-6 rounded-lg hover:bg-red-500 font-semibold"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/product-category")}
            >
              Shop Now
            </motion.button>
          </div>
        </motion.div>

        {/* Right Grid for Promotions */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          
          {/* Card 1 */}
          <motion.div className="bg-blue-100 p-6 rounded-lg shadow-lg
            flex flex-col items-center gap-4 relative overflow-hidden"
            variants={itemVariants}
            whileHover={hoverEffect}
          >
            <img
              src={headphone}
              alt="Headphone Max"
              className="w-full sm:w-1/2 lg:w-full h-32 sm:h-48 lg:h-40 object-contain rounded-md"
            />

            <div className="flex flex-col items-center sm:items-start
              lg:items-center text-center sm:text-left lg:text-center gap-2">
              <h3 className="text-xs sm:text-sm lg:text-base uppercase
                font-semibold text-red-600">
                Best Sale
              </h3>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Headphone Max</h2>
              <p className="text-xs sm:text-sm lg:text-base mt-1">From $59.00 or $10.42/mo. for 7 mo</p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div className="bg-pink-100 p-6 rounded-lg shadow-lg
            flex flex-col items-center gap-4 relative overflow-hidden"
            variants={itemVariants}
            whileHover={hoverEffect}
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
          </motion.div>

          {/* Card 3 */}
          <motion.div className="bg-green-100 p-6 rounded-lg shadow-lg
            flex flex-col items-center gap-4 relative overflow-hidden"
            variants={itemVariants}
            whileHover={hoverEffect}
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
          </motion.div>

          {/* Card 4 */}
          <motion.div className="bg-blue-50 p-6 rounded-lg shadow-lg
            flex flex-col items-center gap-4 relative overflow-hidden"
            variants={itemVariants}
            whileHover={hoverEffect}
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
          </motion.div>
        </div>

        
      </motion.div>
    </section>
  );
};

export default Hero;