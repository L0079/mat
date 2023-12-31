import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getOrders } from "../../services/apiOrders";
import { PAGE_SIZE } from "../../utils/constants";

export function useOrders() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("orderNumber");
  const filter = !filterValue || filterValue === "*" ? null : { field: "orderNumber", value: filterValue };

  // const sortByRaw = searchParams.get("sortBy")
  //   ? searchParams.get("sortBy")
  //   : "startDate-desc";
  // const [field, direction] = sortByRaw.split("-");
  // const sortBy = { field, direction };
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const {
    isLoading,
    data: { data: orders, count } = {},
    error,
  } = useQuery({
    queryKey: ["orders", page, filter],
    queryFn: () => getOrders({ page, filter }),
  });

  // PRE_FETCHING
  const queryClient = useQueryClient();
  if (!filter) {
    const pageCount = Math.ceil(count / PAGE_SIZE);
    if (page < pageCount)
      queryClient.prefetchQuery({
        queryKey: ["orders", page + 1],
        queryFn: () => getOrders({ page: page + 1 }),
      });

    if (page > 1)
      queryClient.prefetchQuery({
        queryKey: ["orders", page - 1],
        queryFn: () => getOrders({ page: page - 1 }),
      });
  }
  //--- END PRECFETCHING -----------------------------------------------

  return { isLoading, error, orders, count };
}
