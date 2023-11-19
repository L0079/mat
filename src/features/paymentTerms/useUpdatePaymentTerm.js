import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addUpdatePaymentTerm } from "../../services/apiPaymentTerms";

export function useUpdatePaymentTerm() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updatePaymentTerm } = useMutation({
    mutationFn: ({ paymentTerm, id }) => addUpdatePaymentTerm(paymentTerm, id),
    onSuccess: () => {
      toast.success(`Payment-term successfully update`);
      queryClient.invalidateQueries({ queryKey: ["paymentTerms"] });
    },
    onError: () => toast.error("The selected payment-term cannot be updated"),
  });

  return { isUpdating, updatePaymentTerm };
}
