import { Timestamp } from "firebase/firestore";
import AnimatedPage from "../../components/AnimatedPage";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import { auth } from "../../config/firebase";
import { TReviewSchema } from "../../constants/types";
import { useAddReview } from "../../hooks/useReviews";
import Review from "../../interfaces/review";
import { useNavigate } from "react-router-dom";

const AddReviewPage = () => {
  const { mutate } = useAddReview();
  const navigate = useNavigate();

  const addReview = (data: TReviewSchema, image?: File) => {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User not authenticated");

    const dataWithUserId = {
      ...data,
      uid: userId,
      date: Timestamp.fromDate(data.date.toDate()),
    } as Review;

    if (image) {
      //* To add: Image size and type validation
      mutate({ image: image, toAdd: dataWithUserId });
      navigate("/");
    } else {
      alert("No image provided.");
    }
  };

  return (
    <AnimatedPage>
      <ReviewForm
        isEditing={false}
        onSubmit={(data, image) => addReview(data, image)}
      />
    </AnimatedPage>
  );
};

export default AddReviewPage;
