import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Review from "../interfaces/review";
import { Filters } from "../services/apiClient";
import ReviewAPIClient from "../services/reviewApi";

const apiClient = new ReviewAPIClient();

export const useReviews = (options?: Filters<Review>, ids?: string[]) => {
  return useQuery<Review[], Error>({
    queryKey: ["reviews", options, ids],
    queryFn: () => apiClient.getAll(options, ids),
    staleTime: 5 * 60 * 1000,
  });
};

export const useReview = (id: string) => {
  return useQuery<Review, Error>({
    queryKey: ["review", id],
    queryFn: () => apiClient.getById(id),
  });
};

interface MutationProps {
  image: File;
  toAdd: Review;
}

export const useAddReview = () => {
  const queryClient = useQueryClient();
  return useMutation<Review, Error, MutationProps>({
    mutationFn: ({ image, toAdd }) => apiClient.postWithImage(toAdd, image),
    onSuccess: () => queryClient.invalidateQueries(["reviews"]),
  });
};

// export const useUpdateReview = () => {
//   const queryClient = useQueryClient();
//   return useMutation<Review, Error, MutationProps>({
//     mutationFn: ({ image, review }) =>
//       image ? apiClient.putWithImage(review.id, review, image) : apiClient.put(review.id, review),
//     onSuccess: (updatedReview) => {
//       queryClient.invalidateQueries(["reviews"]);
//       queryClient.invalidateQueries(["review", updatedReview.id]);
//     },
//   });
// };

// export const useDeleteReview = () => {
//   const queryClient = useQueryClient();
//   return useMutation<void, Error, string>({
//     mutationFn: (id) => apiClient.delete(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["reviews"]);
//     },
//   });
// };
