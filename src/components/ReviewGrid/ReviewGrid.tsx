import { motion } from "framer-motion";
import Review from "../../interfaces/review";
import ReviewCard from "../ReviewCard/ReviewCard";
import styles from "./ReviewGrid.module.css";

interface Props {
  reviews: Review[] | undefined;
  favorites: string[];
}

const ReviewGrid = ({ reviews, favorites }: Props) => {
  //#region  Framer-motion code
  const container = {
    hidden: { opacity: 1, scale: 1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0.3 },
    visible: {
      opacity: 1,
    },
  };

  //#endregion

  return (
    <motion.div
      className={styles.grid}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {reviews?.length != 0 ? (
        reviews?.map((review) => (
          <motion.div
            key={review.id}
            className="item"
            variants={item}
            transition={{ duration: 0.4 }}
          >
            <ReviewCard
              key={review.id}
              review={review}
              isFavorite={favorites.includes(review.id)}
            />
          </motion.div>
        ))
      ) : (
        <div className={styles.notFound}>No reviews found.</div>
      )}
    </motion.div>
  );
};

export default ReviewGrid;
