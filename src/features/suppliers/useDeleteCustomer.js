import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteCustomer as deleteCustomerAPI } from "../../services/apiCustomers";

export function useDeleteCustomer() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCustomer } = useMutation({
    mutationFn: deleteCustomerAPI,
    onSuccess: () => {
      toast.success("Selected customer successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: () => toast.error("The selected customer cannot be deleted"),
  });

  return { isDeleting, deleteCustomer };
}
