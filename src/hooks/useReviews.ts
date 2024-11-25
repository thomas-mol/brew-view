import { useQuery } from "@tanstack/react-query";
import Review from "../interfaces/review";
import APIClient, { Filters } from "../services/apiClient";

const apiClient = new APIClient<Review>("reviews");

const useReviews = (options?: Filters<Review>) => {
  return useQuery<Review[], Error>({
    queryKey: ["reviews", options],
    queryFn: () => apiClient.getAll(options),
    staleTime: 60 * 1_000, // 1 min,
  });
};

export default useReviews;
