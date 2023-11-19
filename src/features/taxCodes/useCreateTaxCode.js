import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addUpdateTaxCode } from "../../services/apiTaxCodes";

export function useCreateTaxCode() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createTaxCode } = useMutation({
    mutationFn: addUpdateTaxCode,
    onSuccess: () => {
      toast.success("New tax-code successfully created");
      queryClient.invalidateQueries({ queryKey: ["taxCodes"] });
    },
    onError: () => toast.error("The new tax-code cannot be created"),
  });

  return { isCreating, createTaxCode };
}
