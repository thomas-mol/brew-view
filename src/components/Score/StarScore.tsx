import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import {
  faStar as fullStar,
  faStarHalfStroke as halfStar,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";

interface Props {
  score: number;
}

const StarScore = ({ score }: Props) => {
  const stars: IconDefinition[] = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => {
      if (index < Math.floor(score)) return fullStar;
      if (index === Math.floor(score) && score % 1 >= 0.5) return halfStar;
      return emptyStar;
    });
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
