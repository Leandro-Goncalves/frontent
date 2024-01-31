import FocusTrap from "focus-trap-react";
import { Form } from "@/app/components/Form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSelectAddressForm } from "./useSelectAddressForm.hook";
import { Address } from "@/app/services/checkount";
import { NumericFormat, PatternFormat } from "react-number-format";

type SelectAddressFormProps =
  | SelectAddressFormPropsDelivery
  | SelectAddressFormPropsTakeout;

interface SelectAddressFormPropsDelivery {
  cep: string;
  type: "delivery";
  onSelectAddress: (address: Address) => void;
}

interface SelectAddressFormPropsTakeout {
  cep: string;
  type: "takeout";
  onSelectAddress: (address: Address) => void;
}

export const SelectAddressForm: React.FC<SelectAddressFormProps> = ({
  cep,
  type,
  onSelectAddress,
}) => {
  const showOnlyCPF = type === "takeout";

  const { handleCheckout, register, watch, form, erros } = useSelectAddressForm(
    cep,
    type === "delivery",
    onSelectAddress
  );
  const cepFormatted = cep
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{3})\d+?$/, "$1");

  const cpf = watch("cpf");

  return (
    <FocusTrap>
      <Form.Container className={"grid gap-6 min-w-[380px]"}>
        <Form.Item>
          <div className="grid mt-9 after:content-[' '] after:absolute after:top-0 after:h-[8px] after:w-[70%] after:left-[50%] after:bg-primary after:transform after:translate-x-[-50%] after:rounded">
            <div className="flex items-center gap-3 mb-4 flex-col">
              <h2 className="text-3xl font-bold text-primary">
                {showOnlyCPF ? "Dados" : "Endereço"}
              </h2>
              <h3 className="text-base font-medium text-[#221A3F] text-center">
                {showOnlyCPF
                  ? "Confirme seus dados para a retirada do seu produto"
                  : "Confirme seu endereço para a entrega do seu produto"}
              </h3>
            </div>
            <form onSubmit={handleCheckout()} className="grid gap-3 mx-8">
              {showOnlyCPF ? (
                <></>
              ) : (
                <>
                  <div className="grid gap-1">
                    <Input
                      disabled
                      className="h-12"
                      placeholder="CEP"
                      type="text"
                      value={cepFormatted}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Input
                      autoFocus
                      className="h-12"
                      id="street"
                      placeholder="Rua"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="street-address"
                      autoCorrect="off"
                      {...register("street")}
                    />
                  </div>
                  <div className="grid gap-1">
                    <Input
                      className="h-12"
                      id="neighborhood"
                      placeholder="Bairro"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="neighborhood"
                      autoCorrect="off"
                      {...register("neighborhood")}
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="grid gap-1 w-full">
                      <Input
                        className="h-12 w-full"
                        id="city"
                        placeholder="Cidade"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="city"
                        autoCorrect="off"
                        {...register("city")}
                      />
                    </div>
                    <div className="grid gap-1">
                      <Input
                        className="h-12 max-w-[100px]"
                        id="number"
                        placeholder="Número"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="number"
                        autoCorrect="off"
                        {...register("number")}
                      />
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <Input
                      className="h-12"
                      id="complement"
                      placeholder="Complemento"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="complement"
                      autoCorrect="off"
                      {...register("complement")}
                    />
                  </div>
                </>
              )}
              <div className="grid gap-1">
                <PatternFormat
                  format={cpf?.length === 11 ? "###.###.###-##" : "###########"}
                  customInput={Input}
                  className="h-12"
                  id="CPF"
                  placeholder="CPF"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="CPF"
                  autoCorrect="off"
                  value={cpf}
                  onValueChange={({ value }) => form.setValue("cpf", value)}
                  error={erros.cpf?.message}
                />
              </div>
              <Button type="submit" className="h-12">
                Confirmar
              </Button>
            </form>
          </div>
        </Form.Item>
        <Image
          style={{ margin: "0 auto" }}
          src={"/logo.png"}
          alt="Logo escrita Cacau"
          width={80}
          height={44}
        />
      </Form.Container>
    </FocusTrap>
  );
};
