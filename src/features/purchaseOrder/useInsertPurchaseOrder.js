import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addUpdatePurchaseOrder } from "../../services/apiPurchaseOrders";

export function useInsertPurchaseOrder() {
  const queryClient = useQueryClient();
  const { isLoading: isInsertingPO, mutate: insertPurchaseOrder } = useMutation(
    {
      mutationFn: addUpdatePurchaseOrder,
      onSuccess: () => {
        toast.success("New purchase order successfully created");
        queryClient.invalidateQueries({ queryKey: ["purchaseOrders"] });
      },
      onError: () => toast.error("The new purchase order cannot be created"),
    }
  );

  return { isInsertingPO, insertPurchaseOrder };
}
