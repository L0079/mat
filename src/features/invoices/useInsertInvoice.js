import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addUpdateInvoice } from "../../services/apiInvoices";

export function useCreateInvoice() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createInvoice } = useMutation({
    mutationFn: addUpdateInvoice,
    onSuccess: () => {
      toast.success("New invoice successfully created");
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: () => toast.error("The new invoice cannot be created"),
  });

  return { isCreating, createInvoice };
}
