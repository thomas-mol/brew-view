import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import APIClient, { Filters } from "../services/apiClient";
import Review from "../interfaces/review";
import { useNavigate } from "react-router-dom";

const apiClient = new APIClient<Review>("reviews");

export const useReviews = (options?: Filters<Review>, ids?: string[]) => {
  return useQuery<Review[], Error>({
    queryKey: ["reviews", options, ids],
    queryFn: () => apiClient.getAll(options, ids),
    staleTime: 60 * 1_000, // 1 min,
  });
};

export const useReview = (id: string) => {
  return useQuery<Review, Error>({
    queryKey: ["review", id],
    queryFn: () => apiClient.getById(id),
    staleTime: 60 * 1_000, // 1 min
  });
};

// Todo: add use(Add / Update / Delete)Review
interface MutationProps {
  image: File;
  toAdd: Review;
}

export const useAddReview = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation<Review, Error, MutationProps>({
    mutationFn: ({ image, toAdd }: MutationProps) =>
      apiClient.postWithImage(toAdd, image),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
      navigate("/");
    },
  });
};

export const useUpdateReview = () => {};

export const useDeleteReview = () => {};

export default useReviews;
