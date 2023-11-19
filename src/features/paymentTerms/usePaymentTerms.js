import { useQuery } from "@tanstack/react-query";
import { getPaymentTerms } from "../../services/apiPaymentTerms";

export function usePaymentTerms() {
  const {
    isLoading,
    data: { data: paymentTerms } = {},
    error,
  } = useQuery({
    queryKey: ["paymentTerms"],
    queryFn: () => getPaymentTerms(),
  });

  return { isLoading, error, paymentTerms };
}
