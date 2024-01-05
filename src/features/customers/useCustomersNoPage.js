import { useQuery } from "@tanstack/react-query";

import { getCustomers } from "../../services/apiCustomers";

export function useCustomersNoPage() {
  const page = "";
  const filter = ""; //To be implemented

  const {
    isLoading,
    data: { data: customers, count } = {},
    error,
  } = useQuery({
    queryKey: ["customers", "noPage"],
    queryFn: () => getCustomers({ page, filter }),
  });

  return { isLoading, error, customers, count };
}
