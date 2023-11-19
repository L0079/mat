import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { signup as signupAPI } from "../../services/apiAuth";

export function useSignup() {
  const { isLoading, mutate: signup } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signupAPI({ email, password, fullName }),
    onSuccess: (data) => {
      console.log(data);
      toast.success(
        `User ${data.user.user_metadata.fullName} successfully added`
      );
    },
    onError: (error) => console.log(error.message),
  });

  return { isLoading, signup };
}
