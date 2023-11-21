import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addUpdateCustomer } from "../../services/apiCustomers";

export function useCreateCustomer() {
  const queryClient = useQueryClient();
  const { isLoading: isCreatingCustomer, mutate: createCustomer } = useMutation(
    {
      mutationFn: addUpdateCustomer,
      onSuccess: () => {
        toast.success("New customer successfully created");
        queryClient.invalidateQueries({ queryKey: ["customers"] });
      },
      onError: () => toast.error("The new customer cannot be created"),
    }
  );

  return { isCreatingCustomer, createCustomer };
}
