import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addUpdateSupplier } from "../../services/apiSuppliers";

export function useUpdateSupplier() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdatingSupplier, mutate: updateSupplier } = useMutation(
    {
      mutationFn: ({ supplier, id }) => addUpdateSupplier(supplier, id),
      onSuccess: () => {
        toast.success("New supplier successfully updated");
        queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      },
      onError: () => toast.error("The new supplier cannot be updated"),
    }
  );

  return { isUpdatingSupplier, updateSupplier };
}
