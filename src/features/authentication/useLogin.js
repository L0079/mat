import { useMutation, useQueryClient } from "@tanstack/react-query";
//import { useMutation } from "@tanstack/react-query";
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
      navigate("/home");
      console.log("A1A"); // workaround, otherwise it does not redirect to the home page (the component is sunmounted before onSuccess is executed)
    },
    onError: (error) => toast.error(error.message),
  });

  return { isLoggingIN, login };
}
