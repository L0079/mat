import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addUpdateInvoice } from "../../services/apiInvoices";

export function useUpdateInvoice() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateInvoice } = useMutation({
    mutationFn: ({ invoice, id }) => addUpdateInvoice(invoice, id),
    onSuccess: () => {
      toast.success(`Invoice successfully update`);
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => toast.error("The selected invoice cannot be updated"),
  });

  return { isUpdating, updateInvoice };
}
