import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addUpdateTaxCode } from "../../services/apiTaxCodes";

export function useUpdateTaxCode() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateTaxCode } = useMutation({
    mutationFn: ({ taxCode, id }) => addUpdateTaxCode(taxCode, id),
    onSuccess: () => {
      toast.success(`Tax-code successfully update`);
      queryClient.invalidateQueries({ queryKey: ["taxCodes"] });
    },
    onError: () => toast.error("The selected tax-code cannot be updated"),
  });

  return { isUpdating, updateTaxCode };
}
