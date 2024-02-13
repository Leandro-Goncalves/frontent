"use client";
import { IconInput } from "@/components/ui/iconInput";
import { Search, ShoppingBasket, ShoppingCart } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { IconButton } from "./components/IconButton";
import { sendWhatsappMessage } from "@/app/utils/misc/sendWhatsappMessage";
import { useScrollPosition } from "@/app/utils/hooks/useScrollPosition";
import { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import { FavoriteButton } from "./components/FavoriteButton";
import { useCart } from "@/app/states/cart.state";
import Image from "next/image";
import {
  AddItemDialog,
  AddItemDialogRef,
} from "@/app/components/AddItemDialog";
import { AccountButton } from "./components/AccountButton";
import { MessageCircleHeart } from "@/app/assets/MessageCircleHeart";

interface ContentProps {
  phone: string;
  alert?: string;
}

const hideRoutes = ["/register", "/login", "/resetPassword", "/painel"];

export const Content: React.FC<ContentProps> = ({ phone, alert }) => {
  const router = useRouter();
  const { cart } = useCart();
  const pageScroll = useScrollPosition();
  const dialogRef = useRef<AddItemDialogRef>();
  const lastCartLength = useRef<number>(0);
  const pathname = usePathname();

  const isFixed = useMemo(() => {
    return pageScroll > 60;
  }, [pageScroll]);

  const handleOpenCart = () => {
    router.push("/cart");
  };

  const goHome = () => {
    router.push("/");
  };

  useEffect(() => {
    if (lastCartLength.current < cart.length) {
      dialogRef.current?.handleOpen();
    }

    lastCartLength.current = cart.length;
  }, [cart]);

  const needToHide = useMemo(() => {
    return hideRoutes.some((r) => pathname?.startsWith(r));
  }, [pathname]);

  if (needToHide) {
    return <></>;
  }

  return (
    <>
      {alert && (
        <p className="py-2 px-4 text-center bg-[#DC024F] text-white text-xs font-semibold italic">
          {alert}
        </p>
      )}
      <header
        className={cn(
          "relative w-full h-[162px] bg-background shadow-md flex items-center justify-between p-6 z-20 max-[1000px]:flex-col",
          isFixed && "fixed top-0 left-0 right-0 h-[120px] max-[1000px]:p-1"
        )}
      >
        <div
          className="w-[208.44px] cursor-pointer max-[1000px]:h-0 max-[1000px]:opacity-0 max-[1000px]:pointer-events-none"
          onClick={goHome}
        >
          <Image
            src={"/logo.png"}
            alt="Logo escrita Cacau"
            width={195}
            height={106}
          />
        </div>
        <IconInput
          icon={<Search className="w-5 h-5" />}
          className="max-w-[700px] bg-transparent border-black w-full"
          placeholder="O que você procura?"
          id="search"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              router.push(`/results?q=${e.currentTarget.value}`);
            }
          }}
        />
        <div className="flex gap-6">
          <div className="relative">
            <IconButton
              badge={cart.length}
              icon={<ShoppingBasket className="w-6 h-6 text-[#1B123D]" />}
              onClick={handleOpenCart}
              title="Carrinho"
            />
            <AddItemDialog dialogRef={dialogRef} />
          </div>
          <FavoriteButton />
          <IconButton
            icon={<MessageCircleHeart className="w-6 h-6 text-[#1B123D]" />}
            onClick={() => {
              sendWhatsappMessage(phone, "Olá, gostaria de mais informações");
            }}
            title="WHATSAPP"
          />
          <AccountButton />
        </div>
      </header>
      <div
        style={isFixed ? { height: "162px" } : {}}
        className="bg-[#F8DEE5]"
      />
    </>
  );
};
