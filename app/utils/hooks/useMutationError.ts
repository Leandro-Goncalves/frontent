import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface useMutationErrorProps<TData, TError, TVariables, TContext>
  extends UseMutationOptions<TData, TError, TVariables, TContext> {
  onErrorOverride?(
    error: TError,
    variables: TVariables,
    context: TContext | undefined
  ): unknown | undefined;
}

export const useMutationError = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>({
  onError,
  onErrorOverride,
  ...props
}: useMutationErrorProps<TData, TError, TVariables, TContext>) => {
  // const { toast } = useToast();

  return useMutation<TData, TError, TVariables, TContext>({
    ...props,
    onError: (error: any, ...props) => {
      if (onErrorOverride) {
        setTimeout(() => {
          onErrorOverride(error, ...props);
        }, 1);
        return;
      }
      const { _data } = error?.response ?? {};
      if (_data?.message) {
        toast.error(_data.message);
      }
      setTimeout(() => {
        onError?.(error, ...props);
      }, 1);
    },
  });
};
