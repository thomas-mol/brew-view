import { useParams } from "react-router-dom";
import AnimatedPage from "../../components/AnimatedPage";
import NotFoundPage from "../NotFound/NotFoundPage";

const EditReviewPage = () => {
  const { id } = useParams();
  if (!id) return <NotFoundPage />;

  return (
    <AnimatedPage title="Review Details">
      <p>Edit Review Page</p>
    </AnimatedPage>
  );
};

export default EditReviewPage;
