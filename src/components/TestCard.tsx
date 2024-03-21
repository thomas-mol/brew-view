import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faGear,
  faHeart as fullHeart,
} from "@fortawesome/free-solid-svg-icons";
import Review from "../interfaces/review";
import "./TestCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StarScore from "./Score/StarScore";
import { useState } from "react";

interface Props {
  review: Review;
}

const TestCard = ({ review }: Props) => {
  const [favorite, setFavorite] = useState(false);

  return (
    <div className="card">
      <div className="media">
        <img src={review.photo?.url} alt="" />
      </div>
      <div className="main">
        <div className="score">
          <StarScore score={review.score} /> <em>{review.score}</em>
        </div>
        <div className="labels">
          <h2>{review.title}</h2>
          <p className="roast">{review.roast.toLowerCase()}</p>
        </div>
        <div className="settings-icon card-icon-container">
          <FontAwesomeIcon icon={faGear} />
        </div>
        <div
          onClick={() => setFavorite(!favorite)}
          className="favorite-icon card-icon-container"
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

export default TestCard;
