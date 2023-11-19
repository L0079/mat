import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteOtherCost as deleteOtherCostAPI } from "../../services/apiOtherCosts";

export function useDeleteOtherCost() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteOtherCost } = useMutation({
    mutationFn: deleteOtherCostAPI,
    onSuccess: () => {
      toast.success("Selected cost document successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["otherCosts"] });
    },
    onError: () => toast.error("The selected cost document cannot be deleted"),
  });

  return { isDeleting, deleteOtherCost };
}
