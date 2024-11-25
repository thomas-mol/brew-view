import useReviews from "../../hooks/useReviews";
import ReviewFilter from "../../components/ReviewFilter/ReviewFilter";
import { Oval } from "react-loader-spinner";
import { motion } from "framer-motion";
import { useState } from "react";
import Review from "../../interfaces/review";
import { Filters } from "../../services/apiClient";
import "./HomePage.css";
import ReviewGrid from "../../components/ReviewGrid/ReviewGrid";

const HomePage = () => {
  const [filters, setFilters] = useState<Filters<Review>>({});

  const { data: reviews, isLoading } = useReviews(filters);

  return (
    <motion.div
      initial={{ opacity: 0.5, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <ReviewFilter
        onChange={(filter) => {
          setFilters(filter);
        }}
      />
      {isLoading ? (
        <div className="loading-indicator">
          <Oval color="grey" strokeWidth={5} secondaryColor="lightgrey" />
        </div>
      ) : (
        <ReviewGrid reviews={reviews} />
      )}
    </motion.div>
  );
};

export default HomePage;
