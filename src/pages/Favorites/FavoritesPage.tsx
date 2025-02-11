import { Oval } from "react-loader-spinner";
import AnimatedPage from "../../components/AnimatedPage";
import ReviewGrid from "../../components/ReviewGrid/ReviewGrid";
import { auth } from "../../config/firebase";
import { useReviews } from "../../hooks/useReviews";
import { useUser } from "../../hooks/useUsers";
import styles from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const userId = auth.currentUser?.uid;
  const { data: user, isLoading: isUserLoading } = useUser(userId || "");
  const { data: reviews, isLoading: isReviewsLoading } = useReviews(
    undefined,
    user?.favorites
  );

  const isLoading = isUserLoading || isReviewsLoading;

  return (
    <AnimatedPage title="Your Favorites ❤️">
      {isLoading ? (
        <div className={styles.loading}>
          <Oval color="grey" strokeWidth={5} secondaryColor="lightgrey" />
        </div>
      ) : (
        <ReviewGrid reviews={reviews} favorites={user?.favorites || []} />
      )}
    </AnimatedPage>
  );
};

export default FavoritesPage;
