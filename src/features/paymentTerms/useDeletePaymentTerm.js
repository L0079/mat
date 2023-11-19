import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deletePaymentTerm as deletePaymentTermAPI } from "../../services/apiPaymentTerms";

export function useDeletePaymentTerm() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deletePaymentTerm } = useMutation({
    mutationFn: deletePaymentTermAPI,
    onSuccess: () => {
      toast.success("Selected payment-term successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["paymentTerms"] });
    },
    onError: () => toast.error("The selected payment-term cannot be deleted"),
  });

  return { isDeleting, deletePaymentTerm };
}
