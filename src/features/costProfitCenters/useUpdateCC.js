import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addUpdateCC } from "../../services/apiCC";

export function useUpdateCC() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateCC } = useMutation({
    mutationFn: ({ costCenter, id }) => addUpdateCC(costCenter, id),
    onSuccess: () => {
      toast.success(`Cost center successfully update`);
      queryClient.invalidateQueries({ queryKey: ["costCenters"] });
    },
    onError: () => toast.error("The selected cost center cannot be updated"),
  });

  return { isUpdating, updateCC };
}
