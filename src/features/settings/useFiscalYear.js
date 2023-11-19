import { useQuery } from "@tanstack/react-query";
import { getFiscalYear } from "../../services/apiFiscalYear";
import toast from "react-hot-toast";

export function useFiscalYear() {
  const {
    isLoading,
    data: { data: fiscalYear } = {},
    error,
  } = useQuery({
    queryKey: ["fiscalYear"],
    queryFn: () => getFiscalYear(),
    onError: () => toast.error("Cannot get fiscal year information"),
  });

  return { isLoading, fiscalYear, error };
}
