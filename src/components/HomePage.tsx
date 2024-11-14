import useReviews from "../hooks/useReviews";
import CategorySelector from "./Filter/CategorySelector";
import { Oval } from "react-loader-spinner";
import ReviewCard from "./ReviewCard";
import "./HomePage.css";
import { motion } from "framer-motion";
import { useState } from "react";

const HomePage = () => {
  const { data: reviews, isLoading } = useReviews();

  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredReviews = selectedCategory
    ? reviews?.filter((r) => r.type === selectedCategory)
    : reviews;

  const container = {
    hidden: { opacity: 1, scale: 1 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  const item = {
    hidden: { opacity: 0.5 },
    visible: {
      opacity: 1,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0.5, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <CategorySelector
        onSelectCategory={(category) => setSelectedCategory(category)}
        selectedCategory={selectedCategory}
      />
      {isLoading ? (
        <div className="loading-indicator">
          <Oval color="grey" strokeWidth={5} secondaryColor="lightgrey" />
        </div>
      ) : (
        <motion.div
          className="grid"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {filteredReviews?.map((review) => (
            <motion.div
              key={review.id}
              className="item"
              variants={item}
              transition={{ duration: 0.4 }}
            >
              <ReviewCard key={review.id} review={review} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default HomePage;
