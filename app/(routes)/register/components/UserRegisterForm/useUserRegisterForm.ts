import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterValidation, registerValidation } from "./validation";
import { UseFormReturn, useForm } from "react-hook-form";
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
  form: UseFormReturn<
    {
      email: string;
      phone: string;
      name: string;
      password: string;
      confirmPassword: string;
    },
    any,
    undefined
  >;
}

export const useUserRegisterForm = (
  backToLogin: () => void
): useUserRegisterFormProps => {
  const f = useForm<RegisterValidation>({
    resolver: zodResolver(registerValidation),
  });

  const { formState, ...form } = f;

  const register = useMutationError({
    mutationFn: async (data: RegisterValidation) => {
      return userService
        .register(data.name, data.email, data.password, data.phone)
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
    form: f,
    isLoading: register.isLoading,
    register: registerExtendedError(form.register, formState),
    handleRegister: () =>
      form.handleSubmit((e) => register.mutate(e), console.log),
  };
};
