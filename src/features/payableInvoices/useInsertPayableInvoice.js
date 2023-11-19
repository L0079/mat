import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addUpdatePayableInvoice } from "../../services/apiPayableInvoices";

export function useCreatePayableInvoice() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createPayableInvoice } = useMutation({
    mutationFn: addUpdatePayableInvoice,
    onSuccess: () => {
      toast.success("New payable invoice successfully created");
      queryClient.invalidateQueries({ queryKey: ["payableInvoices"] });
    },
    onError: () => toast.error("The new payable invoice cannot be created"),
  });

  return { isCreating, createPayableInvoice };
}
