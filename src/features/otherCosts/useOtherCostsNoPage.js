import { useQuery } from "@tanstack/react-query";
import { getOtherCosts } from "../../services/apiOtherCosts";

export function useOtherCostsNoPage() {
  const {
    isLoading,
    data: otherCosts,
    error,
  } = useQuery({
    queryKey: ["otherCosts", "noPage"],
    queryFn: () => getOtherCosts(),
  });

  return { isLoading, error, otherCosts };
}
