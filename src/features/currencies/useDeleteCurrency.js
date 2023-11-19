import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteCurrency as deleteCurrencyAPI } from "../../services/apiCurrencies";

export function useDeleteCurrency() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCurrency } = useMutation({
    mutationFn: deleteCurrencyAPI,
    onSuccess: () => {
      toast.success("Selected currency successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["currencies"] });
    },
    onError: () => toast.error("The selected currency cannot be deleted"),
  });

  return { isDeleting, deleteCurrency };
}
