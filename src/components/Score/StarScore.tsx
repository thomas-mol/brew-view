import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import {
  faStar as fullStar,
  faStarHalfStroke as halfStar,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

interface Props {
  score: number;
}

const StarScore = ({ score }: Props) => {
  const [stars, setStars] = useState<IconDefinition[]>([]);

  useEffect(() => {
    const arr = [];
    const decimal = score % 1;

    for (let index = 0; index < 5; index++) {
      if (index < Math.floor(score)) {
        arr.push(fullStar);
      } else if (index == Math.floor(score) && decimal >= 0.5) {
        arr.push(halfStar);
      } else {
        arr.push(emptyStar);
      }
    }

    setStars(arr);
  }, [score]);

  return (
    <>
      {stars?.map((star, index) => (
        <FontAwesomeIcon key={index} icon={star} />
      ))}
    </>
  );
};

export default StarScore;
