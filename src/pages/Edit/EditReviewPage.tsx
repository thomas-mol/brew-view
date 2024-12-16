import { useNavigate, useParams } from "react-router-dom";
import { useReview } from "../../hooks/useReviews";
import { NotFoundPage } from "../404/NotFoundPage";
import { Oval } from "react-loader-spinner";
import { TextField } from "@mui/material";
import "./EditReviewPage.css";

const EditReviewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  if (!id) {
    console.error("Error 404: Not a valid url.");
    return <NotFoundPage />;
  }
  const { data: review, isLoading, error } = useReview(id);

  if (error) navigate("/404");

  return (
    <>
      {isLoading ? (
        <div className="loading-indicator">
          <Oval color="grey" strokeWidth={5} secondaryColor="lightgrey" />
        </div>
      ) : (
        <div className="review-overview">
          <h2 className="h2">Edit review {review?.id}</h2>
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
          <button onClick={() => navigate("/")}>Back</button>
        </div>
      )}
    </>
  );
};

export default EditReviewPage;
