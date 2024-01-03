import { useQuery } from "@tanstack/react-query";
import { getPurchaseOrders } from "../../services/apiPurchaseOrders";

export function usePurchaseOrdersGetByOrderNumber({ orderNumber }) {
  const page = "";
  const filter = { field: "orderNumber", mod: "eq", value: orderNumber };

  const {
    isLoading,
    data: { data: purchaseOrdersByOrderNumber, count } = {},
    error,
  } = useQuery({
    queryKey: ["purchaseOrders", orderNumber],
    queryFn: () => getPurchaseOrders({ page, filter }),
  });

  return { isLoading, error, purchaseOrdersByOrderNumber, count };
}
