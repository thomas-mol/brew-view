import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faPenToSquare,
  faHeart as fullHeart,
} from "@fortawesome/free-solid-svg-icons";
import Review from "../../interfaces/review";
import StarScore from "../Score/StarScore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { TimestampToString } from "../../utils/TimestampToString";
import "./ReviewCard.css";
import { auth, db } from "../../config/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

interface Props {
  review: Review;
  isFavorite: boolean;
}

const ReviewCard = ({ review, isFavorite }: Props) => {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(isFavorite);
  const [imageLoaded, setImageLoaded] = useState(false);

  function onLoad() {
    setImageLoaded(true);
  }

  // Put this block of code in the API class / Utility class
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

  return (
    <div className="card">
      <div className="media">
        <img
          style={{ display: imageLoaded ? "block" : "none" }}
          src={review.photo_url}
          alt=""
          onLoad={onLoad}
        />
        {!imageLoaded && <Skeleton height={200} width={200} />}
      </div>
      <div className="main">
        <div className="labels">
          <h2>{review.title}</h2>
          <p className="type">
            {review.type + " / " + review.roast + " Roast"}
          </p>
        </div>
        <div className="score">
          <StarScore score={review.score} /> <em>{review.score}</em>
        </div>
        <div className="date">{TimestampToString(review.date)}</div>
      </div>
      <div className="interactive-icons">
        {/* Edit Icon */}
        <div
          onClick={() => navigate(`/review/${review.id}`)}
          className="settings-icon"
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </div>
        {/* Favorite Icon */}
        <div
          onClick={() => toggleFavorite(auth.currentUser?.uid || " ")}
          className="favorite-icon"
        >
          {favorite ? (
            <FontAwesomeIcon icon={fullHeart} className="favorite" />
          ) : (
            <FontAwesomeIcon icon={emptyHeart} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
