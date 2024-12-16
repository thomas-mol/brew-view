import { Roast, SortingOptions } from "../constants/enums";
import Review from "../interfaces/review";

const sortReviews = (
  reviews: Review[],
  sortingOpt: SortingOptions
): Review[] => {
  const roastOrder = Object.values(Roast) as string[];
  switch (sortingOpt) {
    case SortingOptions.DATE_ASC:
      return [...reviews].sort((a, b) => a.date.seconds - b.date.seconds);
    case SortingOptions.DATE_DESC:
      return [...reviews].sort((a, b) => b.date.seconds - a.date.seconds);
    case SortingOptions.SCORE_ASC:
      return [...reviews].sort((a, b) => a.score - b.score);
    case SortingOptions.SCORE_DESC:
      return [...reviews].sort((a, b) => b.score - a.score);
    case SortingOptions.ROAST_ASC:
      return [...reviews].sort(
        (a, b) => roastOrder.indexOf(a.roast) - roastOrder.indexOf(b.roast)
      );
    case SortingOptions.ROAST_DESC:
      return [...reviews].sort(
        (a, b) => roastOrder.indexOf(b.roast) - roastOrder.indexOf(a.roast)
      );
    default:
      return reviews;
  }
};

export default sortReviews;
