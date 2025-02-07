import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faPenToSquare,
  faHeart as fullHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../config/firebase";
import Review from "../../interfaces/review";
import CustomImage from "../CustomImage";
import StarScore from "../Score/StarScore";
import styles from "./ReviewCard.module.css";
import { timestampToString } from "../../utils/timestampToString";

interface Props {
  review: Review;
  isFavorite: boolean;
}

const ReviewCard = ({ review, isFavorite }: Props) => {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(isFavorite);

  // Put this block of code in the API class / Utility class

  // #region Add to Favorite
  const toggleFavorite = async (id: string) => {
    const userDoc = doc(db, "users", id);

    if (favorite) {
      setFavorite(!favorite);
      await updateDoc(userDoc, {
        favorites: arrayRemove(review.id),
      }).then(() =>
        console.log(`Removed review ${review.id} from user's favorites`)
      );
    } else {
      setFavorite(!favorite);
      await updateDoc(userDoc, {
        favorites: arrayUnion(review.id),
      }).then(() =>
        console.log(`Added review ${review.id} to user's favorites`)
      );
    }
  };
  // #endregion

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
          onClick={() => toggleFavorite(auth.currentUser?.uid || " ")}
          className={`${styles.button} ${styles.favoriteButton}`}
        >
          {favorite ? (
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
