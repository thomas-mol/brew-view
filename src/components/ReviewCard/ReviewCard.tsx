import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faPenToSquare,
  faSpinner,
  faHeart as fullHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { useAddFavorite } from "../../hooks/useFavorite";
import Review from "../../interfaces/review";
import { timestampToString } from "../../utils/TimestampToString";
import CustomImage from "../CustomImage";
import StarScore from "../Score/StarScore";
import styles from "./ReviewCard.module.css";
import { useState } from "react";

interface Props {
  review: Review;
  isFavorite: boolean;
}

const ReviewCard = ({ review, isFavorite }: Props) => {
  const navigate = useNavigate();
  const { mutate: toggleFavorite, isLoading } = useAddFavorite(review.id);
  const [favorite, setFavorite] = useState(isFavorite);

  const handleToggle = () => {
    if (!auth.currentUser) return;
    toggleFavorite({ userId: auth.currentUser.uid, isFavorite: favorite });
    setFavorite((prev) => !prev);
  };

  return (
    <div className={styles.card}>
      <div className={styles.media}>
        <CustomImage src={review.photo_url} />
      </div>
      <div className={styles.main}>
        <div>
          <h2>{review.title}</h2>
          <p>{review.type + " / " + review.roast + " Roast"}</p>
        </div>
        <div className={styles.score}>
          <StarScore score={review.score} /> <em>{review.score}</em>
        </div>
        <div className={styles.date}>{timestampToString(review.date)}</div>
      </div>
      <div className={styles.actionButtonsContainer}>
        <div
          onClick={() => navigate(`/review/${review.id}`)}
          className={`${styles.button} ${styles.settingsButton}`}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </div>
        <div
          onClick={handleToggle}
          className={`${styles.button} ${styles.favoriteButton}`}
        >
          {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
          ) : favorite ? (
            <FontAwesomeIcon icon={fullHeart} className={styles.favorite} />
          ) : (
            <FontAwesomeIcon icon={emptyHeart} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
