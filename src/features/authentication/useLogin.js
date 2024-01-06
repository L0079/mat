import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { login as loginAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading: isLoggingIN, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData([user], user.user); //Set user data in cash
      navigate("/");
    },
    onError: (error) => toast.error(error.message),
    onSettled: () => navigate("/"),
    // workaround, onSuccess does not always redirect to the home page (the component is unmounted before onSuccess is executed)
  });

  return { isLoggingIN, login };
}
