import { Oval } from "react-loader-spinner";
import { Navigate, useParams } from "react-router-dom";
import AnimatedPage from "../../components/AnimatedPage";
import ReviewDetail from "../../components/ReviewDetail/ReviewDetail";
import { useReview } from "../../hooks/useReviews";
import NotFoundPage from "../NotFound/NotFoundPage";
import { useReplies } from "../../hooks/useReplies";

const DetailPage = () => {
  const { id } = useParams();
  if (!id) return <NotFoundPage />;

  const { data: review, isLoading, error } = useReview(id);
  const { data: replies, isLoading: repliesLoading } = useReplies(id);

  if (error) return <Navigate to="/404" replace />;

  return (
    <AnimatedPage>
      {isLoading || repliesLoading ? (
        <div className="">
          <Oval color="grey" strokeWidth={5} secondaryColor="lightgrey" />
        </div>
      ) : !review || !replies ? (
        <NotFoundPage />
      ) : (
        <>
          <ReviewDetail review={review} replies={replies} />
        </>
      )}
    </AnimatedPage>
  );
};

export default DetailPage;
