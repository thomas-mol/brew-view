import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Oval } from "react-loader-spinner";
import ReviewFilter from "../../components/ReviewFilter/ReviewFilter";
import ReviewGrid from "../../components/ReviewGrid/ReviewGrid";
import ReviewSorter from "../../components/ReviewSorter/ReviewSorter";
import { auth } from "../../config/firebase";
import { SortingOptions } from "../../constants/enums";
import { useReviews } from "../../hooks/useReviews";
import { useUser } from "../../hooks/useUsers";
import Review from "../../interfaces/review";
import { Filters } from "../../services/apiClient";
import sortReviews from "../../utils/sortReviews";
import styles from "./HomePage.module.css";
import AnimatedPage from "../../components/AnimatedPage";

const HomePage = () => {
  const [filters, setFilters] = useState<Filters<Review>>({});
  const [sortingOpt, setSortingOpt] = useState<SortingOptions>(
    SortingOptions.DATE_DESC
  );

  const [userAuth, loadingAuth] = useAuthState(auth);
  const { data: user, isLoading: userLoading } = useUser(userAuth?.uid || "");

  const { data: reviews, isLoading: reviewsLoading } = useReviews(filters);
  const sortedReviews = reviews ? sortReviews(reviews, sortingOpt) : [];

  return (
    <AnimatedPage>
      <div className={styles.container}>
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
      {reviewsLoading || loadingAuth || userLoading ? (
        <div className={styles.loading}>
          <Oval color="grey" strokeWidth={5} secondaryColor="lightgrey" />
        </div>
      ) : (
        <ReviewGrid reviews={sortedReviews} favorites={user?.favorites || []} />
      )}
    </AnimatedPage>
  );
};

export default HomePage;
