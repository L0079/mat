import { useQuery } from "@tanstack/react-query";
import { getOtherCosts } from "../../services/apiOtherCosts";

export function useOtherCostsNoPage() {
  const page = "";
  const filter = ""; //To be implemented

  const {
    isLoading,
    data: { data: otherCosts, count } = {},
    error,
  } = useQuery({
    queryKey: ["otherCosts", "noPage"],
    queryFn: () => getOtherCosts({ page, filter }),
  });

  return { isLoading, error, otherCosts, count };
}
