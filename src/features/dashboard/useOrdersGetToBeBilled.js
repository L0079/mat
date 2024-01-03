import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../services/apiOrders";

export function useOrdersGetToBeBilled() {
  const page = "";
  const filter = { field: "toBeBilled", mod: "gt", value: 0 };

  const {
    isLoading,
    data: { data: ordersToBeBilled, count } = {},
    error,
  } = useQuery({
    queryKey: ["orders", "toBeBilled"],
    queryFn: () => getOrders({ page, filter }),
  });

  return { isLoading, error, ordersToBeBilled, count };
}
