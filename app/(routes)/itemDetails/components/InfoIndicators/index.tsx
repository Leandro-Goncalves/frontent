"use client";
import { MessageCircleHeart } from "@/app/assets/MessageCircleHeart";
import { sendWhatsappMessage } from "@/app/utils/misc/sendWhatsappMessage";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Gift, Lock, Package } from "lucide-react";
import { Fragment } from "react";

interface InfoIndicatorsProps {
  phone: string;
  productName: string;
}

const itens = [
  {
    Icon: Package,
    title:
      "<b>Entrega Grátis.</b> Em compras a partir de R$299,00 para sul e sudeste.",
  },
  {
    Icon: Gift,
    title:
      "<b>Primeira compra.</b> Use o cupom soucacauzete e ganhe um presente pela sua primeira compra!",
  },
  {
    Icon: Lock,
    title: "<b>Compra segura.</b> Parcele suas compras em até 10x sem juros.",
  },
];

export const InfoIndicators: React.FC<InfoIndicatorsProps> = ({
  phone,
  productName,
}) => {
  const handleClick = () => {
    sendWhatsappMessage(
      phone,
      `Olá, estava vendo o produto ${productName} e gostaria de mais informações`
    );
  };

  return (
    <div className="border rounded-2xl max-w-[388px] min-w-[320px] px-4 py-11 flex flex-col relative max-[1200px]:min-w-full max-[1200px]:max-w-full">
      {itens.map(({ Icon, title }) => (
        <Fragment key={title}>
          <div className="flex gap-4 items-center" key={title}>
            <Icon className="w-4 h-4 shrink-0" />
            <p
              className="text-sm [&>b]:text-primary"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </div>
          <Separator className="my-5" />
        </Fragment>
      ))}

      <MessageCircleHeart
        className="w-8 h-8 mx-auto mt-auto"
        color="stroke-primary"
      />
      <p className="text-base text-center">
        Deseja um atendimento personalizado? Entre em contato com a sua loja
        preferida.
      </p>
      <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 flex justify-center">
        <Button
          onClick={handleClick}
          variant={"secondary"}
          className={cn(
            "font-semibold rounded-full px-8",
            "hover:transform hover:scale-105 transition-all duration-200"
          )}
        >
          Entre em contato
        </Button>
      </div>
    </div>
  );
};
