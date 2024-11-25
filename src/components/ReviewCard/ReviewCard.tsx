import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faGear,
  faHeart as fullHeart,
} from "@fortawesome/free-solid-svg-icons";
import Review from "../../interfaces/review";
import "./ReviewCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StarScore from "../Score/StarScore";
import { useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { TimestampToString } from "../../utils/TimestampToString";

interface Props {
  review: Review;
}

const ReviewCard = ({ review }: Props) => {
  const [favorite, setFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  function onLoad() {
    setImageLoaded(true);
  }

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
        <div className="score">
          <StarScore score={review.score} /> <em>{review.score}</em>
        </div>
        <div className="labels">
          <h2>{review.title}</h2>
          <p className="roast">{review.roast}</p>
        </div>
        <div className="date">{TimestampToString(review.date)}</div>
      </div>
      <div className="interactive-icons">
        <div className="settings-icon">
          <FontAwesomeIcon icon={faGear} />
        </div>
        <div onClick={() => setFavorite(!favorite)} className="favorite-icon">
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
