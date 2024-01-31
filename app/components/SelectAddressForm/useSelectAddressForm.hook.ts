import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  SelectAddressValidation,
  selectAddressValidation,
  takeoutValidation,
} from "./validation";
import getCEP from "cep-promise";
import { Address } from "@/app/services/checkount";
import { registerExtendedError } from "@/app/utils/misc/registerExtendedError";

export const useSelectAddressForm = (
  cep: string,
  isDelivery: boolean,
  onSelectAddress: (address: Address) => void
) => {
  const { formState, ...form } = useForm<SelectAddressValidation>({
    resolver: zodResolver(
      isDelivery ? selectAddressValidation : takeoutValidation
    ),
  });

  useEffect(() => {
    if (!isDelivery) return;
    const getCepData = async (cep: string) => {
      const cepData = await getCEP(cep);
      form.setValue("street", cepData.street);
      form.setValue("neighborhood", cepData.neighborhood);
      form.setValue("city", cepData.city);
      form.setValue("state", cepData.state);
    };

    getCepData(cep);
  }, [cep, form, isDelivery]);

  return {
    watch: form.watch,
    erros: formState.errors,
    form,
    register: registerExtendedError(form.register, formState),
    handleCheckout: () =>
      form.handleSubmit((v) => onSelectAddress({ ...v, cep })),
  };
};
