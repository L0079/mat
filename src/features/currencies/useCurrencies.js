import { useQuery } from "@tanstack/react-query";
import { getCurrencies } from "../../services/apiCurrencies";

export function useCurrencies() {
  const {
    isLoading,
    data: { data: currencies } = {},
    error,
  } = useQuery({
    queryKey: ["currencies"],
    queryFn: () => getCurrencies(),
  });

  return { isLoading, error, currencies };
}
