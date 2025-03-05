import { motion } from "framer-motion";

type BlogCardProps = {
  image: string;
  date: string;
  title: string;
  description: string;
};

const BlogCard = ({ image, date, title, description }: BlogCardProps) => {
  // Framer Motion Variants
  const hoverEffect = {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300 },
  };

  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
      whileHover={hoverEffect}
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <p className="text-gray-600 text-sm">{date}</p>
        <h3 className="text-xl font-bold my-2">{title}</h3>
        <p className="text-gray-700 mb-4">{description}</p>
        <motion.button
          className="mt-4 bg-coral-red text-white py-2 px-4 rounded-lg hover:bg-red-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Read More
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BlogCard;