import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordValidation, resetPasswordValidation } from "./validation";
import { useForm } from "react-hook-form";
import {
  registerExtendedError,
  registerExtendedErrorReturn,
} from "@/app/utils/misc/registerExtendedError";
import { FormEventHandler } from "react";
import { useMutationError } from "@/app/utils/hooks/useMutationError";
import { userService } from "@/app/services/user";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export interface useResetPasswordProps {
  isLoading: boolean;
  register: registerExtendedErrorReturn<ResetPasswordValidation>;
  handleReset: () => FormEventHandler<HTMLFormElement> | undefined;
}

export const useResetPassword = (guid: string): useResetPasswordProps => {
  const { push } = useRouter();
  const { formState, ...form } = useForm<ResetPasswordValidation>({
    resolver: zodResolver(resetPasswordValidation),
  });

  const reset = useMutationError({
    mutationFn: async (data: ResetPasswordValidation) => {
      return userService
        .resetPassword(data.newPassword, guid)
        .then((data) => data.data);
    },
    onError: () => {
      form.setFocus("newPassword");
    },
    onSuccess: () => {
      toast.success("Senha alterada com sucesso");
      push("/");
      form.reset();
    },
  });

  return {
    isLoading: reset.isLoading,
    register: registerExtendedError(form.register, formState),
    handleReset: () => form.handleSubmit((e) => reset.mutate(e)),
  };
};
