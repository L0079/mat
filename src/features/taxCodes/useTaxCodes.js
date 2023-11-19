import { useQuery } from "@tanstack/react-query";
import { getTaxCodes } from "../../services/apiTaxCodes";

export function useTaxCodes() {
  const {
    isLoading,
    data: { data: taxCodes } = {},
    error,
  } = useQuery({
    queryKey: ["taxCodes"],
    queryFn: () => getTaxCodes(),
  });

  return { isLoading, error, taxCodes };
}
