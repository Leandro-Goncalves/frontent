import {
  FieldValues,
  UseFormRegister,
  FormState,
  UseFormRegisterReturn,
  RegisterOptions,
} from "react-hook-form";

export type registerExtendedErrorReturn<T extends FieldValues> = (
  registerName: keyof T,
  options?: RegisterOptions<T, any> | undefined
) => UseFormRegisterReturn & {
  error: string | undefined;
};

export const registerExtendedError = <T extends FieldValues>(
  register: UseFormRegister<T>,
  formState: FormState<T>
): registerExtendedErrorReturn<T> => {
  return (
    registerName: keyof T,
    options?: RegisterOptions<T, any> | undefined
  ) => ({
    ...register(registerName as any, options),
    error: formState.errors?.[registerName]?.message?.toString(),
  });
};
