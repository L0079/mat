import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getOtherCosts } from "../../services/apiOtherCosts";
import { PAGE_SIZE } from "../../utils/constants";

export function useOtherCosts() {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const filterValue = searchParams.get("statusId");
  const filter = !filterValue || filterValue === "0" ? "" : { field: "statusId", value: filterValue };

  const {
    isLoading,
    data: { data: otherCosts, count } = {},
    error,
  } = useQuery({
    queryKey: ["otherCosts", page, filter],
    queryFn: () => getOtherCosts({ page, filter }),
  });

  // PRE_FETCHING
  const queryClient = useQueryClient();
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["otherCosts", page + 1, filter],
      queryFn: () => getOtherCosts({ page: page + 1, filter }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["otherCosts", page - 1],
      queryFn: () => getOtherCosts({ page: page - 1, filter }),
    });
  //--- END PRE-FETCHING -----------------------------------------------

  return { isLoading, error, otherCosts, count };
}
