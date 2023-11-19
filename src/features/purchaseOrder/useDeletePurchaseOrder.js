import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deletePurchaseOrder as deletePurchaseOrderAPI } from "../../services/apiPurchaseOrders";

export function useDeletePurchaseOrder() {
  const queryClient = useQueryClient();
  const { isLoading: isDeletingPO, mutate: deletePurchaseOrder } = useMutation({
    mutationFn: deletePurchaseOrderAPI,
    onSuccess: () => {
      toast.success("Selected purchase order successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["purchaseOrders"] });
    },
    onError: () => toast.error("The selected purchase order cannot be deleted"),
  });

  return { isDeletingPO, deletePurchaseOrder };
}
