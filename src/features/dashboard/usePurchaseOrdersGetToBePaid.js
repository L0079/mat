import { useQuery } from "@tanstack/react-query";
import { getPurchaseOrders } from "../../services/apiPurchaseOrders";

export function usePurchaseOrdersGetToBePaid() {
  const page = "";
  const filter = { field: "toBePaid", mod: "gt", value: 0 };

  const {
    isLoading,
    data: { data: ordersToBePaid, count } = {},
    error,
  } = useQuery({
    queryKey: ["purchaseOrders", page],
    queryFn: () => getPurchaseOrders({ page, filter }),
  });

  return { isLoading, error, ordersToBePaid, count };
}
