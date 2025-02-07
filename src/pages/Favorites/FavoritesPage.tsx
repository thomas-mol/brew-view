import { Oval } from "react-loader-spinner";
import AnimatedPage from "../../components/AnimatedPage";
import ReviewGrid from "../../components/ReviewGrid/ReviewGrid";
import { auth } from "../../config/firebase";
import { useReviews } from "../../hooks/useReviews";
import { useUser } from "../../hooks/useUsers";

const FavoritesPage = () => {
  const { data: user } = useUser(auth.currentUser?.uid || "");
  const { data: reviews, isLoading } = useReviews(undefined, user?.favorites);

  return (
    <AnimatedPage title="Your Favorites ❤️">
      {isLoading ? (
        <div className="loading-indicator">
          <Oval color="grey" strokeWidth={5} secondaryColor="lightgrey" />
        </div>
      ) : (
        <ReviewGrid reviews={reviews} favorites={user?.favorites || []} />
      )}
    </AnimatedPage>
  );
};

export default FavoritesPage;
