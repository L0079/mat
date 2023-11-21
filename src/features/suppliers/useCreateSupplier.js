import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addUpdateSupplier } from "../../services/apiSuppliers";

export function useCreateSupplier() {
  const queryClient = useQueryClient();
  const { isLoading: isCreatingSupplier, mutate: createSupplier } = useMutation(
    {
      mutationFn: addUpdateSupplier,
      onSuccess: () => {
        toast.success("New supplier successfully created");
        queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      },
      onError: () => toast.error("The new supplier cannot be created"),
    }
  );

  return { isCreatingSupplier, createSupplier };
}
