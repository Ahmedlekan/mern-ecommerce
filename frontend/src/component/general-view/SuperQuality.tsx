import { motion } from "framer-motion";
import camera1 from "../../assets/images/camera1.jpg";

const SuperQuality = () => {
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
    <motion.div
      className="pt-10 flex justify-between items-center max-lg:flex-col container px-4 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Text Content */}
      <motion.div
        className="flex flex-1 flex-col gap-4"
        variants={itemVariants}
      >
        <h2 className="font-montserrat text-3xl md:text-4xl font-bold capitalize lg:max-w-2xl">
          We provide you{" "}
          <span className="text-coral-red">super </span>
          <span className="text-coral-red">Quality</span> products
        </h2>
        <p className="mt-4 text-base md:text-xl font-palanquin text-slate-gray">
          Experience premium craftsmanship and innovation with our top-tier products,  
          designed to enhance your lifestyle. From durable materials to cutting-edge  
          technology, every detail is crafted for excellence.
        </p>
        <p className="lg:max-w-2xl text-base md:text-xl lg:text-2xl font-palanquin text-slate-gray">
          Whether you're looking for performance, style, or reliability, our products  
          deliver unmatched quality to meet your everyday needs.
        </p>
      </motion.div>

      {/* Image */}
      <motion.div
        className="flex flex-1 justify-end items-center"
        variants={itemVariants}
        whileHover={hoverEffect}
      >
        <img
          src={camera1}
          width={550}
          height={500}
          alt="camera"
          className="object-contain rounded-lg shadow-lg"
        />
      </motion.div>
    </motion.div>
  );
};

export default SuperQuality;