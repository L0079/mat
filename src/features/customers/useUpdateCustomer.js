import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addUpdateCustomer } from "../../services/apiCustomers";

export function useUpdateCustomer() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdatingCustomer, mutate: updateCustomer } = useMutation(
    {
      mutationFn: ({ customer, id }) => addUpdateCustomer(customer, id),
      onSuccess: () => {
        toast.success("New customer successfully updated");
        queryClient.invalidateQueries({ queryKey: ["customers"] });
      },
      onError: () => toast.error("The new customer cannot be updated"),
    }
  );

  return { isUpdatingCustomer, updateCustomer };
}
