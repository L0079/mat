import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getPayableInvoices } from "../../services/apiPayableInvoices";
import { PAGE_SIZE } from "../../utils/constants";

export function usePayableInvoices() {
  const [searchParams] = useSearchParams();
  //const filterValue = searchParams.get("status");
  // const filter =
  //   !filterValue || filterValue === "all"
  //     ? null
  //     : { field: "status", value: filterValue };

  // const sortByRaw = searchParams.get("sortBy")
  //   ? searchParams.get("sortBy")
  //   : "startDate-desc";
  // const [field, direction] = sortByRaw.split("-");
  // const sortBy = { field, direction };

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const {
    isLoading,
    data: { data: payableInvoices, count } = {},
    error,
    // } = useQuery({
    //   queryKey: ["bookings", filter, sortBy, page],
    //   queryFn: () => getBookings({ filter, sortBy, page }),
    // });
  } = useQuery({
    queryKey: ["payableInvoices", page],
    queryFn: () => getPayableInvoices({ page }),
  });

  // PRE_FETCHING
  const queryClient = useQueryClient();
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["payableInvoices", page + 1],
      queryFn: () => getPayableInvoices({ page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["payableInvoices", page - 1],
      queryFn: () => getPayableInvoices({ page: page - 1 }),
    });

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

  return { isLoading, error, payableInvoices, count };
}
