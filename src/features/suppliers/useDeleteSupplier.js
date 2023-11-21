import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteSupplier as deleteSupplierAPI } from "../../services/apiSuppliers";

export function useDeleteSupplier() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteSupplier } = useMutation({
    mutationFn: deleteSupplierAPI,
    onSuccess: () => {
      toast.success("Selected supplier successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
    onError: () => toast.error("The selected supplier cannot be deleted"),
  });

  return { isDeleting, deleteSupplier };
}
