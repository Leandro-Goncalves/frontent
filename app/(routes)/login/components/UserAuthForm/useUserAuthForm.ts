import React, { FormEvent, FormEventHandler } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetPasswordValidation,
  userValidation,
  UserValidation,
} from "./validation";
import { useMutationError } from "@/app/utils/hooks/useMutationError";
import { userService } from "@/app/services/user";
import { toast } from "react-toastify";
import { useUser } from "@/app/states/useUser.state";

export interface useUserAuthFormProps {
  registerEmail: () => any;
  registerPassword: () => any;
  isLoading: boolean;
  handleLogin: () => FormEventHandler<HTMLFormElement> | undefined;
  handleResetPassword: (event: FormEvent<HTMLFormElement>) => void;
  errors: FieldErrors<UserValidation>;
}

export const useUserAuthForm = (
  setPage: (value: string) => void,
  onSuccess: () => void
): useUserAuthFormProps => {
  const { setUser } = useUser();
  const { formState, ...form } = useForm<UserValidation>({
    resolver: zodResolver(userValidation),
  });

  const login = useMutationError({
    mutationFn: async (data: UserValidation) => {
      return userService
        .login(data.email, data.password)
        .then((data) => data.data);
    },
    onError: () => {
      form.setFocus("email");
    },
    onSuccess: (user) => {
      setUser(user);
      onSuccess();
      form.reset();
    },
  });

  const resetPassword = useMutationError({
    mutationFn: async (data: ResetPasswordValidation) => {
      return userService
        .generateResetPasswordLink(data.email)
        .then((data) => data.data);
    },
    onError: () => {
      form.setFocus("email");
    },
    onSuccess: () => {
      toast.success(
        "Se o email informado estiver registrado, um link de redefinição de senha foi enviado para ele."
      );
      form.reset();
      setPage("login");
    },
  });

  return {
    registerEmail: () => ({
      ...form.register("email"),
      error: formState.errors.email?.message,
      onKeyDown: (e: any) => {
        if (e.key === "Enter") {
          form.setFocus("password");
          e.preventDefault();
        }
      },
    }),
    registerPassword: () => ({
      ...form.register("password"),
      error: formState.errors.password?.message,
    }),
    isLoading: login.isLoading || resetPassword.isLoading,
    handleLogin: () => form.handleSubmit((e) => login.mutate(e)),
    handleResetPassword: (event) => {
      event.preventDefault();
      resetPassword.mutate({ email: form.getValues("email") });
    },
    errors: formState.errors,
  };
};
