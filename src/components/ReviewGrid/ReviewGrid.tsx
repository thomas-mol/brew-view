import { motion } from "framer-motion";
import Review from "../../interfaces/review";
import ReviewCard from "../ReviewCard/ReviewCard";
import "./ReviewGrid.css";

interface Props {
  reviews: Review[] | undefined;
}

const ReviewGrid = ({ reviews }: Props) => {
  //#region  Framer-motion code
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

  //#endregion

  return (
    <motion.div
      className="grid"
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
            <ReviewCard key={review.id} review={review} />
          </motion.div>
        ))
      ) : (
        <div className="not-found">No reviews match these criteria..</div>
      )}
    </motion.div>
  );
};

export default ReviewGrid;
