import {
  faHeart,
  faPenToSquare,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { useAddFavorite } from "../../hooks/useFavorite";
import Review from "../../interfaces/review";
import timeToString from "../../utils/timeToString.ts";
import CustomImage from "../CustomImage";
import StarScore from "../Score/StarScore";
import styles from "./ReviewCard.module.css";

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
          <Link to={`/review/${review.id}`}>{review.title}</Link>
          <p>{review.type + " / " + review.roast + " Roast"}</p>
        </div>
        <div className={styles.score}>
          <StarScore score={review.score} />
          <p>{review.score}</p>
        </div>
        <div className={styles.date}>{timeToString(review.date)}</div>
      </div>
      <div className={styles.buttonContainer}>
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
            <FontAwesomeIcon icon={faHeart} className={styles.favorite} />
          ) : (
            <FontAwesomeIcon icon={faHeart} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
