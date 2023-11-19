import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateInvoiceStatus } from "../../services/apiInvoices";

export function useUpdateInvoiceStatus() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateInvoice } = useMutation({
    mutationFn: ({ invoice, id }) => updateInvoiceStatus(invoice, id),
    onSuccess: () => {
      toast.success(`Invoice successfully update`);
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: () => toast.error("The selected invoice cannot be updated"),
  });

  return { isUpdating, updateInvoice };
}
