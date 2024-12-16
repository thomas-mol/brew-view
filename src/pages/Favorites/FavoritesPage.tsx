import { motion } from "framer-motion";
import { useUser } from "../../hooks/useUsers";
import useReviews from "../../hooks/useReviews";
import { auth } from "../../config/firebase";
import ReviewGrid from "../../components/ReviewGrid/ReviewGrid";
import { Oval } from "react-loader-spinner";
import "./FavoritesPage.css";

const FavoritesPage = () => {
  const { data: user } = useUser(auth.currentUser?.uid || "");
  const { data: reviews, isLoading } = useReviews(undefined, user?.favorites);

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="page-title">Your Favorites ❤️</h2>
      {isLoading ? (
        <div className="loading-indicator">
          <Oval color="grey" strokeWidth={5} secondaryColor="lightgrey" />
        </div>
      ) : (
        <ReviewGrid reviews={reviews} favorites={user?.favorites || []} />
      )}
    </motion.div>
  );
};

export default FavoritesPage;
