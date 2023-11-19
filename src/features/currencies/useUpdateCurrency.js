import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addUpdateCurrency } from "../../services/apiCurrencies";

export function useUpdateCurrency() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateCurrency } = useMutation({
    mutationFn: ({ currency, id }) => addUpdateCurrency(currency, id),
    onSuccess: () => {
      toast.success(`Currency successfully update`);
      queryClient.invalidateQueries({ queryKey: ["currencies"] });
    },
    onError: () => toast.error("The selected currency cannot be updated"),
  });

  return { isUpdating, updateCurrency };
}
