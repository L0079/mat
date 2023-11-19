import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useGetCurrentUser() {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(),
  });

  return {
    isLoading,
    user,
    error,
    isAuthenticated: user?.role === "authenticated",
  };
}
