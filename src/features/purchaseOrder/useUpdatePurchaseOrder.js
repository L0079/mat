import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addUpdatePurchaseOrder } from "../../services/apiPurchaseOrders";

export function useUpdatePurchaseOrder() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdatingPO, mutate: updatePurchaseOrder } = useMutation({
    mutationFn: ({ purchaseOrder, poNumber }) =>
      addUpdatePurchaseOrder(purchaseOrder, poNumber),
    onSuccess: () => {
      toast.success(`Purchase order successfully update`);
      // queryClient.invalidateQueries({ queryKey: ["payableInvoices"] });  //payable invoices
      queryClient.invalidateQueries({ queryKey: ["purchaseOrders"] });
    },
    onError: () => toast.error("The selected purchase order cannot be updated"),
  });

  return { isUpdatingPO, updatePurchaseOrder };
}
