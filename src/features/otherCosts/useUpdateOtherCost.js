import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addUpdateOtherCost } from "../../services/apiOtherCosts";

export function useUpdateOtherCost() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateOtherCost } = useMutation({
    mutationFn: ({ otherCost, id }) => addUpdateOtherCost(otherCost, id),
    onSuccess: () => {
      toast.success("Cost document successfully update");
      queryClient.invalidateQueries({ queryKey: ["otherCosts"] });
    },
    onError: () => toast.error("The cost document cannot be updated"),
  });

  return { isUpdating, updateOtherCost };
}
