import { useQuery } from "@tanstack/react-query";
import { getPayableInvoices } from "../../services/apiPayableInvoices";

export function usePayableInvoicesNoPage() {
  const page = "";
  const {
    isLoading,
    data: { data: payableInvoices, count } = {},
    error,
  } = useQuery({
    queryKey: ["payableInvoices", page],
    queryFn: () => getPayableInvoices({ page }),
  });

  return { isLoading, error, payableInvoices, count };
}
