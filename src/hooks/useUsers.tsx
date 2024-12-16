import { useQuery } from "@tanstack/react-query";
import APIClient, { Filters } from "../services/apiClient";
import User from "../interfaces/user";

const apiClient = new APIClient<User>("users");

export const useUsers = (options?: Filters<User>) => {
  return useQuery<User[], Error>({
    queryKey: ["users", options],
    queryFn: () => apiClient.getAll(options),
    staleTime: 60 * 1_000, // 1 min,
  });
};

export const useUser = (id: string) => {
  return useQuery<User, Error>({
    queryKey: ["user", id],
    queryFn: () => apiClient.getById(id),
    staleTime: 60 * 1_000, // 1 min
  });
};

// export const useUpdateUser = (id: string, data: User) => {
//   const queryClient = useQueryClient();
//   return useMutation(() => apiClient.update(id, data), {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["users"]);
//     },
//   });
// };

// Todo: add use(Add / Update / Delete)User

export default useUsers;
