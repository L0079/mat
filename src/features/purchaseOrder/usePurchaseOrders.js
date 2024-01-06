import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getPurchaseOrders } from "../../services/apiPurchaseOrders";
import { PAGE_SIZE } from "../../utils/constants";

export function usePurchaseOrders() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("poNumber");
  const filter = !filterValue || filterValue === "*" ? null : { field: "poNumber", value: filterValue };

  // const sortByRaw = searchParams.get("sortBy")
  //   ? searchParams.get("sortBy")
  //   : "startDate-desc";
  // const [field, direction] = sortByRaw.split("-");
  // const sortBy = { field, direction };

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const {
    isLoading,
    data: { data: purchaseOrders, count } = {},
    error,
  } = useQuery({
    queryKey: ["purchaseOrders", page, filter],
    queryFn: () => getPurchaseOrders({ page, filter }),
  });

  // PRE_FETCHING
  // const queryClient = useQueryClient();
  // const pageCount = Math.ceil(count / PAGE_SIZE);
  // if (page < pageCount)
  //   queryClient.prefetchQuery({
  //     queryKey: ["purchaseOrders", page + 1],
  //     queryFn: () => getPurchaseOrders({ page: page + 1 }),
  //   });

  // if (page > 1)
  //   queryClient.prefetchQuery({
  //     queryKey: ["purchaseOrders", page - 1],
  //     queryFn: () => getPurchaseOrders({ page: page - 1 }),
  //   });

  // if (page < pageCount)
  //   queryClient.prefetchQuery({
  //     queryKey: ["bookings", filter, sortBy, page + 1],
  //     queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
  //   });

  // if (page > 1)
  //   queryClient.prefetchQuery({
  //     queryKey: ["bookings", filter, sortBy, page - 1],
  //     queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
  //   });
  //--- END PRECFETCHING -----------------------------------------------

  return { isLoading, error, purchaseOrders, count };
}
