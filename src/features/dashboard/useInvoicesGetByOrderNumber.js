import { useQuery } from "@tanstack/react-query";
import { getInvoices } from "../../services/apiInvoices";

export function useInvoicesGetByOrderNumber({ orderNumber }) {
  const page = "";
  const filter = { field: "orderNumber", mod: "eq", value: orderNumber };

  const {
    isLoading,
    data: { data: invoicesByOrderNumber, count } = {},
    error,
  } = useQuery({
    queryKey: ["invoices", orderNumber],
    queryFn: () => getInvoices({ page, filter }),
  });

  return { isLoading, error, invoicesByOrderNumber, count };
}
