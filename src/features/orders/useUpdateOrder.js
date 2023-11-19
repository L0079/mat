import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addUpdateOrder } from "../../services/apiOrders";

export function useUpdateOrder() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateOrder } = useMutation({
    mutationFn: ({ order, orderNumber }) => addUpdateOrder(order, orderNumber),
    onSuccess: () => {
      toast.success(`Order successfully update`);
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => toast.error("The selected order cannot be updated"),
  });

  return { isUpdating, updateOrder };
}
