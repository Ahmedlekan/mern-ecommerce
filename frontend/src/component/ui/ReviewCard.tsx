import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

type ReviewCardProps = {
  imgURL: string;
  customerName: string;
  rating: number;
  feedback: string;
};

const ReviewCard = ({ imgURL, customerName, rating, feedback }: ReviewCardProps) => {
  // Framer Motion Variants
  const hoverEffect = {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300 },
  };

  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg overflow-hidden p-6 cursor-pointer"
      whileHover={hoverEffect}
    >
      <div className="flex flex-col items-center gap-4">
        <img
          src={imgURL}
          alt={customerName}
          className="w-20 h-20 rounded-full object-cover"
        />
        <h3 className="text-xl font-bold">{customerName}</h3>
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar
              key={i}
              className={`text-${i < rating ? "coral-red" : "gray-300"} text-lg`}
            />
          ))}
        </div>
        <p className="text-center text-gray-700">{feedback}</p>
      </div>
    </motion.div>
  );
};

export default ReviewCard;