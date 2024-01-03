import { useQuery } from "@tanstack/react-query";
import { getPayableInvoices } from "../../services/apiPayableInvoices";

export function usePayableInvoicesGetByPoNumber({ orderNumber, poArray }) {
  const page = "";
  const filter = { field: "poNumber", mod: "in", value: poArray };

  const {
    isLoading,
    data: { data: payableInvoicesByPoNumber, count } = {},
    error,
  } = useQuery({
    queryKey: ["payableInvoices", orderNumber],
    queryFn: () => getPayableInvoices({ page, filter }),
  });

  return { isLoading, error, payableInvoicesByPoNumber, count };
}
