import { useQuery } from "@tanstack/react-query";
import { getOtherCosts } from "../../services/apiOtherCosts";

export function useOtherCosts() {
  const {
    isLoading,
    data: otherCosts,
    error,
  } = useQuery({
    queryKey: ["otherCosts"],
    queryFn: () => getOtherCosts(),
  });

  return { isLoading, error, otherCosts };
}
