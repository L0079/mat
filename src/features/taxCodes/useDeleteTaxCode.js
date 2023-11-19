import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteTaxCode as deleteTaxCodeAPI } from "../../services/apiTaxCodes";

export function useDeleteTaxCode() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteTaxCode } = useMutation({
    mutationFn: deleteTaxCodeAPI,
    onSuccess: () => {
      toast.success("Selected tax-code successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["taxCodes"] });
    },
    onError: () => toast.error("The selected tax-code cannot be deleted"),
  });

  return { isDeleting, deleteTaxCode };
}
