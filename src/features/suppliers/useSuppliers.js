import { useQuery } from "@tanstack/react-query";
import { getSuppliers } from "../../services/apiSuppliers";

export function useSuppliers() {
  const {
    isLoading,
    data: { data: suppliers } = {},
    error,
  } = useQuery({
    queryKey: ["suppliers"],
    queryFn: () => getSuppliers(),
  });

  return { isLoading, error, suppliers };
}
