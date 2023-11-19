import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteInvoice as deleteInvoiceAPI } from "../../services/apiInvoices";

export function useDeleteInvoice() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteInvoice } = useMutation({
    mutationFn: deleteInvoiceAPI,
    onSuccess: () => {
      toast.success("Selected invoice successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: () => toast.error("The selected invoice cannot be deleted"),
  });

  return { isDeleting, deleteInvoice };
}
