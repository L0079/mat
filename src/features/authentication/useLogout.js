import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { logout as logoutAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, mutate: logout } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      queryClient.removeQueries(); //Set user data in cash
      navigate("/login");
    },
    onError: (error) => toast.error(error.message),
  });

  return { isLoading, logout };
}
