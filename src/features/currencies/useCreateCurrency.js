import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addUpdateCurrency } from "../../services/apiCurrencies";

export function useCreateCurrency() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createCurrency } = useMutation({
    mutationFn: addUpdateCurrency,
    onSuccess: () => {
      toast.success("New currency successfully created");
      queryClient.invalidateQueries({ queryKey: ["currencies"] });
    },
    onError: () => toast.error("The new currency cannot be created"),
  });

  return { isCreating, createCurrency };
}
