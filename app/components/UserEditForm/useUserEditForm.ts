import { zodResolver } from "@hookform/resolvers/zod";
import { EditValidation, editValidation } from "./validation";
import { UseFormSetValue, useForm } from "react-hook-form";
import {
  registerExtendedError,
  registerExtendedErrorReturn,
} from "@/app/utils/misc/registerExtendedError";
import { FormEventHandler } from "react";
import { useMutationError } from "@/app/utils/hooks/useMutationError";
import { userService } from "@/app/services/user";
import { toast } from "react-toastify";
import { User } from "@/app/models/user";
import { useUser } from "@/app/states/useUser.state";

export interface useUserEditFormProps {
  isLoading: boolean;
  register: registerExtendedErrorReturn<EditValidation>;
  handleRegister: () => FormEventHandler<HTMLFormElement> | undefined;
  isEditingPassword: boolean;
  setValue: UseFormSetValue<{
    name: string;
    isEditingPassword: boolean;
    newPassword: string;
    confirmNewPassword: string;
  }>;
}

export const useUserEditForm = (
  backToLogin: () => void,
  user: User
): useUserEditFormProps => {
  const { setUser } = useUser();
  const { formState, ...form } = useForm<EditValidation>({
    defaultValues: {
      isEditingPassword: false,
      name: user.name,
    },
    resolver: zodResolver(editValidation),
  });

  const register = useMutationError({
    mutationFn: async (data: EditValidation) => {
      return userService
        .update(data.name, data.newPassword)
        .then((data) => data.data);
    },
    onError: () => {
      form.setFocus("name");
    },
    onSuccess: (user) => {
      setUser(user);
      toast.success("Usuário editado com sucesso!");
      backToLogin();
    },
  });

  const isEditingPassword = form.watch("isEditingPassword");

  return {
    isLoading: register.isLoading,
    register: registerExtendedError(form.register, formState),
    handleRegister: () => form.handleSubmit((e) => register.mutate(e)),
    isEditingPassword,
    setValue: form.setValue,
  };
};
