import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateFiscalYear as updateFiscalYearAPI } from "../../services/apiFiscalYear";

export function useUpdateFiscalYear() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateFiscalYear } = useMutation({
    mutationFn: (fiscalYear) => updateFiscalYearAPI(fiscalYear),
    onSuccess: () => {
      toast.success(`Fiscal year successfully update`);
      queryClient.invalidateQueries({ queryKey: ["fiscalYear"] });
    },
    onError: () => toast.error("The fiscal year information cannot be updated"),
  });

  return { isUpdating, updateFiscalYear };
}
