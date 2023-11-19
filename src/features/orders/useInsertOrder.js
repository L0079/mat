import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addUpdateOrder } from "../../services/apiOrders";

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createOrder } = useMutation({
    mutationFn: addUpdateOrder,
    onSuccess: () => {
      toast.success("New order successfully created");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => toast.error("The new order cannot be created"),
  });

  return { isCreating, createOrder };
}
