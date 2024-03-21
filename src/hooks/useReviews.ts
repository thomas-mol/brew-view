import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Review from "../interfaces/review";

const useReviews = () =>
  useQuery<Review[], Error>({
    queryKey: ["reviews"],
    queryFn: () =>
      axios.get("./src/data/MOCK_DATA2.json").then((res) => res.data),
    staleTime: 60 * 1_000, // 1 min
  });

export default useReviews;
