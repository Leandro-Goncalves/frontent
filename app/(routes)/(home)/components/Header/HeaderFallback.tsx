"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ShoppingCart, MessageSquare, Heart } from "lucide-react";
import { IconButton } from "./components/IconButton";
import Image from "next/image";

export const HeaderFallback: React.FC<{}> = ({}) => {
  return (
    <div>
      <Skeleton className="h-8 w-full rounded-none bg-[#DC024F]" />
      <header
        className={cn(
          "w-full h-[162px] bg-[#F8DEE5] flex items-center justify-between p-6 z-10"
        )}
      >
        <div className="w-[208.44px]">
          <Image
            src={"/logo.png"}
            alt="Logo escrita Cacau"
            width={195}
            height={106}
          />
        </div>
        <Skeleton className="w-[700px] h-10 rounded-md" />
        <div className="flex gap-6">
          <IconButton
            icon={<ShoppingCart className="w-6 h-6 text-[#1B123D]" />}
            title="Carrinho"
          />
          <IconButton
            icon={<Heart className="w-6 h-6 text-[#1B123D]" />}
            title="Favoritos"
          />
          <IconButton
            icon={<MessageSquare className="w-6 h-6 text-[#1B123D]" />}
            title="Atendimento"
          />
        </div>
      </header>
    </div>
  );
};
