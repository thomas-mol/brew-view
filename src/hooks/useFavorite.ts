import { useMutation, useQueryClient } from "@tanstack/react-query";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

interface MutationProps {
  userId: string;
  isFavorite: boolean;
}

export const useAddFavorite = (reviewId: string) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, MutationProps>({
    mutationFn: async ({ userId, isFavorite }) => {
      const userDoc = doc(db, "users", userId);
      if (isFavorite) {
        await updateDoc(userDoc, { favorites: arrayRemove(reviewId) });
        console.log(
          `Review ${reviewId} removed from user ${userId}'s favorites`
        );
      } else {
        await updateDoc(userDoc, { favorites: arrayUnion(reviewId) });
        console.log(`Review ${reviewId} added to user ${userId}'s favorites`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => console.error("Error updating favorite: ", error),
  });
};
