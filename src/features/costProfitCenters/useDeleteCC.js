import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteCC as deleteCCAPI } from "../../services/apiCC";

export function useDeleteCC() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCC } = useMutation({
    mutationFn: deleteCCAPI,
    onSuccess: () => {
      toast.success("Selected cost center successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["costCenters"] });
    },
    onError: () => toast.error("The selected cost center cannot be deleted"),
  });

  return { isDeleting, deleteCC };
}
