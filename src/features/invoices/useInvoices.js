import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getInvoices } from "../../services/apiInvoices";
import { PAGE_SIZE } from "../../utils/constants";

export function useInvoices() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("statusId");
  const filter = !filterValue || filterValue === "0" ? "" : { field: "statusId", value: filterValue };
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const {
    isLoading,
    data: { data: invoices, count } = {},
    error,
  } = useQuery({
    queryKey: ["invoices", page, filter],
    queryFn: () => getInvoices({ page, filter }),
  });

  // PRE_FETCHING
  const queryClient = useQueryClient();
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["invoices", page + 1, filter],
      queryFn: () => getInvoices({ page: page + 1, filter }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["Invoices", page - 1],
      queryFn: () => getInvoices({ page: page - 1, filter }),
    });
  //--- END PRE-FETCHING -----------------------------------------------

  return { isLoading, error, invoices, count };
}
