import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getCustomers } from "../../services/apiCustomers";
import { PAGE_SIZE } from "../../utils/constants";

export function useCustomers() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const filter = ""; //To be implemented

  const {
    isLoading,
    data: { data: customers, count } = {},
    error,
  } = useQuery({
    queryKey: ["customers", page],
    queryFn: () => getCustomers({ page, filter }),
  });

  // PRE_FETCHING
  const queryClient = useQueryClient();
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["customers", page + 1, filter],
      queryFn: () => getCustomers({ page: page + 1, filter }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["customers", page - 1],
      queryFn: () => getCustomers({ page: page - 1, filter }),
    });
  //--- END PRE-FETCHING -----------------------------------------------

  return { isLoading, error, customers, count };
}
