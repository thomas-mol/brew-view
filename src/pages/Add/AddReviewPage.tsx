import { motion } from "framer-motion";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import "./AddReviewPage.css";

const AddReviewPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <ReviewForm />
    </motion.div>
  );
};

export default AddReviewPage;
