import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteOrder as deleteOrderAPI } from "../../services/apiOrders";

export function useDeleteOrder() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteOrder } = useMutation({
    mutationFn: deleteOrderAPI,
    onSuccess: () => {
      toast.success("Selected order successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => toast.error("The selected order cannot be deleted"),
  });

  return { isDeleting, deleteOrder };
}
