import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Reply from "../interfaces/reply";
import APIClient from "../services/apiClient";

const apiClient = new APIClient<Reply>("replies");

export const useReplies = (reviewId: string) => {
  return useQuery<Reply[], Error>({
    queryKey: ["replies", reviewId],
    queryFn: () => apiClient.getAll({ reviewId: reviewId }),
    staleTime: 5 * 60 * 1000,
  });
};

export const useReply = (id: string) => {
  return useQuery<Reply, Error>({
    queryKey: ["replies", id],
    queryFn: () => apiClient.getById(id),
  });
};

interface MutationProps {
  toAdd: Reply;
}

export const useAddReply = () => {
  const queryClient = useQueryClient();
  return useMutation<Reply, Error, MutationProps>({
    mutationFn: ({ toAdd }) => apiClient.post(toAdd),
    onSuccess: () => queryClient.invalidateQueries(["replies"]),
    onError: (error: any) => {
      console.error("Error adding reply:", error);
    },
  });
};

export const useDeleteReply = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id) => apiClient.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["replies"]);
    },
  });
};
