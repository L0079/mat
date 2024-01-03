import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../services/apiOrders";

export function useOrdersGetByOrderNumber({ orderNumber }) {
  const page = "";
  const filter = { field: "orderNumber", mod: "eq", value: orderNumber };

  const {
    isLoading,
    data: { data: ordersByOrderNumber, count } = {},
    error,
  } = useQuery({
    queryKey: ["orders", orderNumber],
    queryFn: () => getOrders({ page, filter }),
  });

  return { isLoading, error, ordersByOrderNumber, count };
}
