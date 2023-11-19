import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addUpdateOtherCost } from "../../services/apiOtherCosts";

export function useCreateOtherCost() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createOtherCost } = useMutation({
    mutationFn: addUpdateOtherCost,
    onSuccess: () => {
      toast.success("New cost document successfully created");
      queryClient.invalidateQueries({ queryKey: ["otherCosts"] });
    },
    onError: () => toast.error("The new cost document cannot be created"),
  });

  return { isCreating, createOtherCost };
}
