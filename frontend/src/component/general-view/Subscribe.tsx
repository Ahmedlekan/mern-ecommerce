import { motion } from "framer-motion";

const Subscribe = () => {
  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, delay: 0.2 },
    },
  };

  const hoverEffect = {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300 },
  };

  return (
    <motion.section
      className="container flex justify-between px-4 items-center max-lg:flex-col bg-gray-100 py-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Heading */}
      <motion.h3
        className="text-3xl md:text-4xl md:leading-[68px] font-palanquin
          font-bold lg:max-w-md text-center lg:text-left"
        whileHover={hoverEffect}
      >
        Sign Up for <span className="text-coral-red">Updates</span> & Newsletter
      </motion.h3>

      {/* Input and Button */}
      <motion.div
        className="w-full lg:max-w-[40%] flex items-center
          max-sm:flex-col gap-5 p-2.5 sm:border sm:border-slate-gray rounded-full bg-white"
        whileHover={hoverEffect}
      >
        <input
          type="text"
          placeholder="Subscribe@nikey.com"
          className="flex-1 p-3 border-none outline-none rounded-full text-lg"
        />
        <motion.button
          className="flex justify-center items-center gap-2 px-7 py-4 border
          font-montserrat text-lg leading-none bg-coral-red font-semibold 
          text-white border-coral-red rounded-full hover:bg-red-500 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign Up
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default Subscribe;