import { useQuery } from "@tanstack/react-query";

import { getSuppliers } from "../../services/apiSuppliers";

export function useSuppliersNoPage() {
  const page = "";
  const filter = ""; //To be implemented

  const {
    isLoading,
    data: { data: suppliers, count } = {},
    error,
  } = useQuery({
    queryKey: ["suppliers", "noPage"],
    queryFn: () => getSuppliers({ page, filter }),
  });

  return { isLoading, error, suppliers, count };
}
