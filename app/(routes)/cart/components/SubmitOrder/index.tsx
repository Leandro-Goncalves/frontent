"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCart } from "@/app/states/cart.state";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { SearchCep } from "./components/SearchCep";
import { checkoutService } from "@/app/services/checkount";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/states/useUser.state";
import { useLoginDialog } from "@/app/utils/hooks/useLoginDialog";
import { useSelectAddress } from "@/app/utils/hooks/useSelectAddress";
import { DeliveryOrTakeout } from "./components/DeliveryOrTakeout";
import { TakeoutItem } from "./TakeoutItem";
import { SelectCouponSection } from "./components/SelectCouponSection";
import { OrderIndicators } from "./components/OrderIndicators";
import Swal from "sweetalert2";

interface SubmitOrderProps {
  phone: string;
}

export const SubmitOrder: React.FC<SubmitOrderProps> = ({ phone }) => {
  const { cart, cleanCart, coupon, removeCoupon } = useCart();
  const router = useRouter();
  const isCartEmpty = cart.length === 0;
  const [selectedFreight, setSelectedFreight] = useState<any>();
  const user = useUser((state) => state.user);
  const { LoginDialog, handleLogin } = useLoginDialog();
  const { SelectAddressDialog, handleSelectAddress } = useSelectAddress();
  const [selectedCEP, setSelectedCEP] = useState<string>("");
  const [isDelivery, setIsDelivery] = useState(true);

  const userIsNotLogged = user === undefined;

  const isLessThenMinimumValue = useMemo(() => {
    const subtotal = cart.reduce(
      (total, { variant, quantity }) =>
        total + (variant.promotionalPrice || variant.price) * quantity,
      0
    );

    if (!coupon || !coupon.minimumValue) return false;

    if (subtotal < coupon.minimumValue) return true;

    return false;
  }, [cart, coupon]);
  const handleTakeout = async () => {
    await checkoutService
      .generateTakeoutPaymentLink({
        couponCode: coupon?.code,
        items: cart.map((c) => ({
          quantity: c.quantity,
          productGuid: c.product.uuid,
          variantGuid: c.variant.guid,
          sizeGuid: c.size?.uuid ?? "",
        })),
      })
      .then(({ data: checkoutUrl }) => {
        cleanCart();
        removeCoupon();

        window.open(checkoutUrl.url);
        setTimeout(() => {
          router.push("/orders");
        }, 100);
      })
      .catch((err) => {
        if (err.data?.message) {
          removeCoupon();
          Swal.fire({
            icon: "error",
            text: err.data.message,
          });
        }
      });
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

    await checkoutService
      .generatePaymentLink({
        to: address,
        freightId: selectedFreight.id,
        couponCode: coupon?.code,
        items: cart.map((c) => ({
          quantity: c.quantity,
          productGuid: c.product.uuid,
          variantGuid: c.variant.guid,
          sizeGuid: c.size?.uuid ?? "",
        })),
      })
      .then(({ data: checkoutUrl }) => {
        cleanCart();
        removeCoupon();

        window.open(checkoutUrl.url);
        setTimeout(() => {
          router.push("/orders");
        }, 100);
      })
      .catch((err) => {
        if (err.data?.message) {
          removeCoupon();
          Swal.fire({
            icon: "error",
            text: err.data.message,
          });
        }
      });
  };

  if (isCartEmpty) {
    return <></>;
  }

  return (
    <>
      {SelectAddressDialog}
      {LoginDialog}
      <div className="ml-auto max-[1420px]:ml-0 max-[1420px]:mr-auto p-5 border-2 rounded-3xl w-full max-w-[444px]">
        <DeliveryOrTakeout
          isDelivery={isDelivery}
          setIsDelivery={(isDelivery) => {
            setSelectedFreight(undefined);
            setIsDelivery(isDelivery);
          }}
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
            <div className="w-full h-[1px] bg-secondary my-4" />
            <SelectCouponSection />
            <div className="w-full h-[1px] bg-secondary my-4" />
            <OrderIndicators fee={selectedFreight?.price} />
            <div className="w-full h-[1px] bg-secondary my-4" />

            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger className="w-full" asChild>
                  <Button
                    disabled={!selectedFreight || isLessThenMinimumValue}
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
            <SelectCouponSection />
            <div className="w-full h-[1px] bg-secondary my-4" />
            <OrderIndicators />
            <div className="w-full h-[1px] bg-secondary my-4" />
            <Button
              className="w-full rounded-lg h-12 mt-3"
              onClick={handleSubmit}
              disabled={isLessThenMinimumValue}
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
