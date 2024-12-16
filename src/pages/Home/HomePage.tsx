import useReviews from "../../hooks/useReviews";
import ReviewFilter from "../../components/ReviewFilter/ReviewFilter";
import { Oval } from "react-loader-spinner";
import { motion } from "framer-motion";
import { useState } from "react";
import Review from "../../interfaces/review";
import { Filters } from "../../services/apiClient";
import "./HomePage.css";
import ReviewGrid from "../../components/ReviewGrid/ReviewGrid";
import { useUser } from "../../hooks/useUsers";
import { auth } from "../../config/firebase";
import ReviewSorter from "../../components/ReviewSorter/ReviewSorter";
import { SortingOptions } from "../../constants/enums";
import sortReviews from "../../utils/sortReviews";

const HomePage = () => {
  const [filters, setFilters] = useState<Filters<Review>>({});
  const [sortingOpt, setSortingOpt] = useState<SortingOptions>(
    SortingOptions.DATE_DESC
  );

  const { data: reviews, isLoading } = useReviews(filters);
  const { data: user } = useUser(auth.currentUser?.uid || "");

  const sortedReviews = reviews ? sortReviews(reviews, sortingOpt) : [];

  return (
    <motion.div
      initial={{ opacity: 0.5, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="filter-sorter-container">
        <ReviewFilter
          onChange={(filter) => {
            setFilters(filter);
          }}
        />
        <ReviewSorter
          onChange={(sort) => {
            setSortingOpt(sort);
          }}
        />
      </div>
      {isLoading ? (
        <div className="loading-indicator">
          <Oval color="grey" strokeWidth={5} secondaryColor="lightgrey" />
        </div>
      ) : (
        <ReviewGrid reviews={sortedReviews} favorites={user?.favorites || []} />
      )}
    </motion.div>
  );
};

export default HomePage;
