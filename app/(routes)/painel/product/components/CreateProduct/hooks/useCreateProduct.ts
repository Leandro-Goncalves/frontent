import { useMutationError } from "@/app/utils/hooks/useMutationError";
import { CreateProductValidation, createProductValidation } from "./validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerExtendedError } from "@/app/utils/misc/registerExtendedError";
import { productService } from "@/app/services/products";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Products } from "@/app/models/products";

export const useCreateProduct = (product?: Products) => {
  const [isOpen, setIsOpen] = useState(false);

  const { formState, ...form } = useForm<CreateProductValidation>({
    resolver: zodResolver(createProductValidation),
    defaultValues: {
      ...product,
      price: product?.price ?? 0,
    },
  });
  const { price } = form.getValues();

  const create = useMutationError({
    mutationFn: async (data: CreateProductValidation) => {
      return productService.create(data).then((data) => data.data);
    },
    onError: () => {
      form.setFocus("name");
    },
    onSuccess: () => {
      toast.success("Produto criado com sucesso!");
      form.setFocus("name");
      form.reset();
      setIsOpen(false);
    },
  });

  const handleSetIsOpen = (newIsOpen: boolean) => {
    if (!newIsOpen) {
      setTimeout(() => {
        form.reset();
      }, 250);
    }
    setIsOpen(newIsOpen);
  };

  return {
    isLoading: create.isPending,
    register: registerExtendedError(form.register, formState),
    setValue: form.setValue,
    price,
    dialog: {
      isOpen,
      setIsOpen: handleSetIsOpen,
    },
    handleCreate: () => form.handleSubmit((e) => create.mutate(e)),
  };
};
