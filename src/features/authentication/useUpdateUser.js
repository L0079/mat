import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateUser as updateUserAPI } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateUserAPI,
    onSuccess: ({ user }) => {
      toast.success(`User ${user.user_metadata.fullName} successfully updated`);
      queryClient.setQueryData(["user"], user);
      //      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => console.log(error.message),
  });

  return { isUpdating, updateUser };
}
