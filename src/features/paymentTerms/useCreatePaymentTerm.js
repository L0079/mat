import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addUpdatePaymentTerm } from "../../services/apiPaymentTerms";

export function useCreatePaymentTerm() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createPaymentTerm } = useMutation({
    mutationFn: addUpdatePaymentTerm,
    onSuccess: () => {
      toast.success("New payment-term successfully created");
      queryClient.invalidateQueries({ queryKey: ["paymentTerms"] });
    },
    onError: () => toast.error("The new payment-term cannot be created"),
  });

  return { isCreating, createPaymentTerm };
}
