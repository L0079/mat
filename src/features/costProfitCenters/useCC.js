import { useQuery } from "@tanstack/react-query";
import { getCC } from "../../services/apiCC";

export function useCC(type) {
  const {
    isLoading,
    data: { data: costCenters } = {},
    error,
  } = useQuery({
    queryKey: ["costCenters"],
    queryFn: () => getCC(type),
  });

  return { isLoading, error, costCenters };
}
