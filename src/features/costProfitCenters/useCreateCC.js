import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { addUpdateCC } from "../../services/apiCC";

export function useCreateCC() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createCC } = useMutation({
    mutationFn: addUpdateCC,
    onSuccess: () => {
      toast.success("New cost center successfully created");
      queryClient.invalidateQueries({ queryKey: ["costCenters"] });
    },
    onError: () => toast.error("The new costCenter cannot be created"),
  });

  return { isCreating, createCC };
}
