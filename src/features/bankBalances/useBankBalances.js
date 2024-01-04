import { useQuery } from "@tanstack/react-query";
import { getBankBalances } from "../../services/apiBankBalances";

export function useBankBalances() {
  const {
    isLoading,
    data: { data: bankBalances } = {},
    error,
  } = useQuery({
    queryKey: ["bankBalances"],
    queryFn: () => getBankBalances(),
  });

  return { isLoading, error, bankBalances };
}
