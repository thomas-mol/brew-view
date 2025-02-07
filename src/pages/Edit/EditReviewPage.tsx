import { Button, TextField } from "@mui/material";
import { Oval } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import AnimatedPage from "../../components/AnimatedPage";
import { useReview } from "../../hooks/useReviews";
import NotFoundPage from "../NotFound/NotFoundPage";
import styles from "./EditReviewPage.module.css";

const EditReviewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  if (!id) {
    console.error("Error 404: Not a valid url.");
    return <NotFoundPage />;
  }
  const { data: review, isLoading, error } = useReview(id);

  if (error || !review) navigate("/404");

  return (
    <>
      {isLoading ? (
        <div className="loading-indicator">
          <Oval color="grey" strokeWidth={5} secondaryColor="lightgrey" />
        </div>
      ) : (
        <AnimatedPage title="Edit Review">
          <div className={styles.container}>
            <TextField
              id="standard-read-only-input"
              label="Title"
              defaultValue={review?.title}
              variant="standard"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
            <TextField
              id="standard-read-only-input"
              label="Roast"
              defaultValue={review?.roast}
              variant="standard"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
            <TextField
              id="standard-read-only-input"
              label="Location"
              defaultValue={review?.location}
              variant="standard"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
            <TextField
              id="standard-read-only-input"
              label="Type"
              defaultValue={review?.type}
              variant="standard"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
            <p>Score: {review?.score}</p>
            <Button onClick={() => navigate("/")} variant="contained">
              Back
            </Button>
          </div>
        </AnimatedPage>
      )}
    </>
  );
};

export default EditReviewPage;
