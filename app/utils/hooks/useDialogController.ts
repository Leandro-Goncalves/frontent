import { useRef, useState } from "react";

export const useDialogController = <T = void, D = void>() => {
  const [data, setData] = useState<{ isOpen: boolean; data?: D }>({
    isOpen: false,
  });
  const successPromise = useRef<(value: T) => void>();
  const rejectPromise = useRef<() => void>();

  const onOpenChange = (open: boolean) => {
    setData({ isOpen: open });
    if (!open) {
      rejectPromise.current?.();
    }
  };

  const handleOpen = (data: D) => {
    setData({ isOpen: true, data });
    return new Promise<T>((resolve, reject) => {
      successPromise.current = resolve;
      rejectPromise.current = reject;
    });
  };

  const handleSuccess = (value: T) => {
    setData({ isOpen: false });
    successPromise.current?.(value);
  };

  return {
    handleOpen,
    handleSuccess,
    bind: () => ({
      open: data.isOpen,
      onOpenChange,
    }),
    data: data.data,
  };
};
