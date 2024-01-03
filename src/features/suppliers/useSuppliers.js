import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getSuppliers } from "../../services/apiSuppliers";
import { PAGE_SIZE } from "../../utils/constants";

export function useSuppliers() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const filter = ""; //To be implemented

  const {
    isLoading,
    data: { data: suppliers, count } = {},
    error,
  } = useQuery({
    queryKey: ["suppliers", page, filter],
    queryFn: () => getSuppliers({ page, filter }),
  });

  // PRE_FETCHING
  const queryClient = useQueryClient();
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["suppliers", page + 1, filter],
      queryFn: () => getSuppliers({ page: page + 1, filter }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["suppliers", page - 1],
      queryFn: () => getSuppliers({ page: page - 1, filter }),
    });
  //--- END PRE-FETCHING -----------------------------------------------

  return { isLoading, error, suppliers, count };
}
