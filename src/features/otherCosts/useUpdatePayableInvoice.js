import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addUpdatePayableInvoice } from "../../services/apiPayableInvoices";

export function useUpdatePayableInvoice() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updatePayableInvoice } = useMutation({
    mutationFn: ({ payableInvoice, id }) =>
      addUpdatePayableInvoice(payableInvoice, id),
    onSuccess: () => {
      toast.success(`Payable invoice successfully update`);
      queryClient.invalidateQueries({ queryKey: ["payableInvoices"] });
      queryClient.invalidateQueries({ queryKey: ["purchaseOrders"] });
    },
    onError: () =>
      toast.error("The selected payable invoice cannot be updated"),
  });

  return { isUpdating, updatePayableInvoice };
}
