"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCart } from "@/app/states/cart.state";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SearchCep } from "./components/SearchCep";
import { toCurrencyValue } from "@/app/utils/misc/toCurrencyValue";
import { checkoutService } from "@/app/services/checkount";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/states/useUser.state";
import { useLoginDialog } from "@/app/utils/hooks/useLoginDialog";
import { useSelectAddress } from "@/app/utils/hooks/useSelectAddress";
import { DeliveryOrTakeout } from "./components/DeliveryOrTakeout";
import { TakeoutItem } from "./TakeoutItem";
import { PatternFormat } from "react-number-format";

interface SubmitOrderProps {
  phone: string;
}

export const SubmitOrder: React.FC<SubmitOrderProps> = ({ phone }) => {
  const { cart, cleanCart } = useCart();
  const router = useRouter();
  const isCartEmpty = cart.length === 0;
  const [selectedFreight, setSelectedFreight] = useState<any>();
  const user = useUser((state) => state.user);
  const { LoginDialog, handleLogin } = useLoginDialog();
  const { SelectAddressDialog, handleSelectAddress } = useSelectAddress();
  const [selectedCEP, setSelectedCEP] = useState<string>("");
  const [isDelivery, setIsDelivery] = useState(true);

  const userIsNotLogged = user === undefined;

  const productsTotal = cart.reduce(
    (total, { variant, quantity }) =>
      total + (variant.promotionalPrice || variant.price) * quantity,
    0
  );

  const orderTotal = Number(productsTotal) + Number(selectedFreight?.price);

  const handleTakeout = async () => {
    const address = await handleSelectAddress({ type: "takeout" });

    const { data: checkoutUrl } =
      await checkoutService.generateTakeoutPaymentLink({
        cpf: address.cpf,
        items: cart.map((c) => ({
          quantity: c.quantity,
          productGuid: c.product.uuid,
          variantGuid: c.variant.guid,
          sizeGuid: c.size?.uuid ?? "",
        })),
      });

    cleanCart();

    window.open(checkoutUrl.url);
    setTimeout(() => {
      router.push("/orders");
    }, 100);
  };

  const handleSubmit = async () => {
    if (userIsNotLogged) {
      await handleLogin();
    }

    if (!isDelivery) {
      handleTakeout();
      return;
    }

    const address = await handleSelectAddress({
      type: "delivery",
      cep: selectedCEP,
    });
    if (!selectedFreight.id) return;

    const { data: checkoutUrl } = await checkoutService.generatePaymentLink({
      to: address,
      freightId: selectedFreight.id,
      items: cart.map((c) => ({
        quantity: c.quantity,
        productGuid: c.product.uuid,
        variantGuid: c.variant.guid,
        sizeGuid: c.size?.uuid ?? "",
      })),
    });

    cleanCart();

    window.open(checkoutUrl.url);
    setTimeout(() => {
      router.push("/orders");
    }, 100);
  };

  if (isCartEmpty) {
    return <></>;
  }

  return (
    <>
      {SelectAddressDialog}
      {LoginDialog}
      <div className="ml-auto max-xl:ml-0 max-xl:mr-auto p-5 border-2 rounded-3xl w-full max-w-[444px]">
        <div className="flex justify-between">
          <h3 className="text-primary text-sm font-bold">Produtos</h3>
          <h3 className="text-sm font-bold">
            {toCurrencyValue(productsTotal)}
          </h3>
        </div>
        <div className="w-full h-[1px] bg-secondary mt-6 mb-3" />
        <DeliveryOrTakeout
          isDelivery={isDelivery}
          setIsDelivery={setIsDelivery}
        />
        {isDelivery ? (
          <>
            <div className="flex justify-between mt-3">
              <h3 className="text-primary text-sm font-bold">
                Fretes e prazo:
              </h3>
              <Button
                onClick={() => {
                  window.open(
                    "https://buscacepinter.correios.com.br/app/endereco/index.php",
                    "_blank"
                  );
                }}
                variant={"link"}
                style={{ textTransform: "none" }}
                className="text-sm font-normal h-auto p-0 text-black"
              >
                Não sei meu CEP
              </Button>
            </div>
            <SearchCep
              selectedFreight={selectedFreight}
              setSelectedFreight={setSelectedFreight}
              setSelectedCEP={setSelectedCEP}
              selectedCEP={selectedCEP}
            />
            {selectedFreight && (
              <>
                <div className="w-full h-[1px] bg-secondary my-4" />
                <div className="flex justify-between">
                  <h3 className="text-primary text-base font-extrabold">
                    Total
                  </h3>
                  <h3 className="text-base font-extrabold">
                    {toCurrencyValue(orderTotal)}
                  </h3>
                </div>
                <div className="w-full h-[1px] bg-secondary mt-4 mb-1" />
              </>
            )}

            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger className="w-full">
                  <Button
                    disabled={!selectedFreight}
                    className="w-full rounded-lg h-12 mt-3"
                    onClick={handleSubmit}
                  >
                    {userIsNotLogged
                      ? "FAZER LOGIN E CONTINUAR"
                      : "IR PARA O PAGAMENTO"}
                  </Button>
                </TooltipTrigger>
                {!selectedFreight ? (
                  <TooltipContent>
                    <p>Selecione o frete</p>
                  </TooltipContent>
                ) : (
                  <></>
                )}
              </Tooltip>
            </TooltipProvider>
          </>
        ) : (
          <>
            <h3 className="text-primary text-sm font-bold mt-3 mb-1">
              Retirada:
            </h3>
            <TakeoutItem />
            <div className="w-full h-[1px] bg-secondary my-4" />
            <div className="flex justify-between">
              <h3 className="text-primary text-base font-extrabold">Total</h3>
              <h3 className="text-base font-extrabold">
                {toCurrencyValue(productsTotal)}
              </h3>
            </div>
            <div className="w-full h-[1px] bg-secondary mt-4 mb-1" />
            <Button
              className="w-full rounded-lg h-12 mt-3"
              onClick={handleSubmit}
            >
              {userIsNotLogged
                ? "FAZER LOGIN E CONTINUAR"
                : "IR PARA O PAGAMENTO"}
            </Button>
          </>
        )}
      </div>
    </>
  );
};
