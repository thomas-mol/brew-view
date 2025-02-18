import { Navigate, useParams } from "react-router-dom";
import AnimatedPage from "../../components/AnimatedPage";
import { useReview } from "../../hooks/useReviews";
import NotFoundPage from "../NotFound/NotFoundPage";

const EditReviewPage = () => {
  const { id } = useParams();
  if (!id) return <NotFoundPage />;

  const { data: review, isLoading, error } = useReview(id);

  if (error) return <Navigate to="/404" replace />;

  return (
    <AnimatedPage title="Review Details">
      <p>Edit Review Page</p>
    </AnimatedPage>
  );
};

export default EditReviewPage;
