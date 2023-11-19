import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updatePayableInvoiceStatus } from "../../services/apiPayableInvoices";

export function useUpdatePayableInvoiceStatus() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updatePayableInvoice } = useMutation({
    mutationFn: ({ payableInvoice, id }) =>
      updatePayableInvoiceStatus(payableInvoice, id),
    onSuccess: () => {
      toast.success(`Payable Invoice successfully update`);
      queryClient.invalidateQueries({ queryKey: ["payableInvoices"] });
    },
    onError: () =>
      toast.error("The selected payable invoice cannot be updated"),
  });

  return { isUpdating, updatePayableInvoice };
}
