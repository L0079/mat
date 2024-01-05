import { useQuery } from "@tanstack/react-query";
import { getInvoices } from "../../services/apiInvoices";

export function useInvoicesNoPage() {
  const page = "";
  const {
    isLoading,
    data: { data: invoices, count } = {},
    error,
  } = useQuery({
    queryKey: ["invoices", "noPage"],
    queryFn: () => getInvoices({ page }),
  });

  return { isLoading, error, invoices, count };
}
