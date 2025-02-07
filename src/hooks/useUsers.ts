import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import User from "../interfaces/user";
import APIClient, { Filters } from "../services/apiClient";

const apiClient = new APIClient<User>("users");

export const useUsers = (options?: Filters<User>) => {
  return useQuery<User[], Error>({
    queryKey: ["users", options],
    queryFn: () => apiClient.getAll(options),
  });
};

export const useUser = (id: string) => {
  return useQuery<User, Error>({
    queryKey: ["user", id],
    queryFn: () => apiClient.getById(id),
  });
};

interface MutationProps {
  toAdd: User;
  id: string;
}

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation<User, Error, MutationProps>({
    mutationFn: ({ toAdd, id }: MutationProps) => apiClient.post(toAdd, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error) => {
      console.error("Error adding user:", error);
    },
  });
};

// Todo: add use(Update / Delete)User
