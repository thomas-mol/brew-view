import { useQuery } from "@tanstack/react-query";
import Review from "../interfaces/review";
import APIClient from "../services/apiClient";

const apiClient = new APIClient<Review>("reviews");

const useReviews = () => {
  return useQuery<Review[], Error>({
    queryKey: ["reviews"],
    queryFn: () => apiClient.getAll(),
    staleTime: 60 * 1_000, // 1 min,
  });
};

export default useReviews;
