import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deletePayableInvoice as deletePayableInvoiceAPI } from "../../services/apiPayableInvoices";

export function useDeletePayableInvoice() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deletePayableInvoice } = useMutation({
    mutationFn: deletePayableInvoiceAPI,
    onSuccess: () => {
      toast.success("Selected payable invoice successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["payableInvoices"] });
    },
    onError: () =>
      toast.error("The selected payable invoice cannot be deleted"),
  });

  return { isDeleting, deletePayableInvoice };
}
