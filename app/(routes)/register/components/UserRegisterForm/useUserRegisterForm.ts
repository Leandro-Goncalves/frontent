import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterValidation, registerValidation } from "./validation";
import { useForm } from "react-hook-form";
import {
  registerExtendedError,
  registerExtendedErrorReturn,
} from "@/app/utils/misc/registerExtendedError";
import { FormEventHandler } from "react";
import { useMutationError } from "@/app/utils/hooks/useMutationError";
import { userService } from "@/app/services/user";
import { toast } from "react-toastify";

export interface useUserRegisterFormProps {
  isLoading: boolean;
  register: registerExtendedErrorReturn<RegisterValidation>;
  handleRegister: () => FormEventHandler<HTMLFormElement> | undefined;
}

export const useUserRegisterForm = (
  backToLogin: () => void
): useUserRegisterFormProps => {
  const { formState, ...form } = useForm<RegisterValidation>({
    resolver: zodResolver(registerValidation),
  });

  const register = useMutationError({
    mutationFn: async (data: RegisterValidation) => {
      return userService
        .register(data.name, data.email, data.password)
        .then((data) => data.data);
    },
    onError: () => {
      form.setFocus("email");
    },
    onSuccess: () => {
      toast.success("Usuário criado com sucesso!");
      backToLogin();
      form.reset();
    },
  });

  return {
    isLoading: register.isLoading,
    register: registerExtendedError(form.register, formState),
    handleRegister: () => form.handleSubmit((e) => register.mutate(e)),
  };
};
