"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Whatsapp } from "@/app/assets/Whatsapp";
import { useCart } from "@/app/states/cart.state";
import { sendWhatsappMessage } from "@/app/utils/misc/sendWhatsappMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useState } from "react";

interface SubmitOrderProps {
  phone: string;
}

export const SubmitOrder: React.FC<SubmitOrderProps> = ({ phone }) => {
  const router = useRouter();

  const { cart, cleanCart, setFocusSizeGuids } = useCart();
  const isCartEmpty = cart.length === 0;
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    const isSomeProductSizeNull = cart.filter((c) => c.size === undefined);

    if (isSomeProductSizeNull.length > 0) {
      await Swal.fire({
        text: "Alguns itens do carrinho então sem o tamanho selecionado",
        icon: "error",
        confirmButtonText: "ok",
        confirmButtonColor: "#DC024F",
        didClose: () => {
          setFocusSizeGuids(isSomeProductSizeNull.map((c) => c.guid));
        },
      });
      return;
    }

    let message = `Olá, meu nome é *${name}* e eu gostaria dos seguintes itens:`;

    cart.forEach((c) => {
      message += `\n\nNome: *${
        c.product.name
      }*\nTamanho: *${c.size?.name.toUpperCase()}*\nQuantidade: *${
        c.quantity
      }*`;
    });

    sendWhatsappMessage(phone, window.encodeURIComponent(message));
    cleanCart();
    router.push("/");
  };

  if (isCartEmpty) {
    return <></>;
  }

  return (
    <div className="ml-auto max-xl:ml-0 max-xl:mr-auto p-5 border-2 rounded-3xl">
      <Input
        className="mb-5"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TooltipProvider delayDuration={0}>
        <Tooltip open={name === "" ? undefined : false}>
          <TooltipTrigger>
            <Button onClick={handleSubmit} disabled={name === ""}>
              <Whatsapp size="22px" fill="white" className="mr-2" />
              Finalizar compra pelo Whatsapp
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Preencha o nome antes de finalizar</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
