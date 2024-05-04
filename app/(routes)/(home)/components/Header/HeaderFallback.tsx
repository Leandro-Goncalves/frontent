"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ShoppingCart, MessageSquare, Heart } from "lucide-react";
import { IconButton } from "./components/IconButton";

export const HeaderFallback: React.FC<{}> = ({}) => {
  return (
    <div>
      <Skeleton className="h-8 w-full rounded-none bg-primary" />
      <header
        className={cn(
          "w-full h-[162px] bg-background flex items-center justify-between p-6 z-10"
        )}
      >
        <div className="cursor-pointer max-[1000px]:h-0 max-[1000px]:opacity-0 max-[1000px]:pointer-events-none flex items-center">
          <Skeleton className="w-[195px] h-[195px] rounded-md" />
        </div>
        <Skeleton className="w-[700px] h-10 rounded-md" />
        <div className="flex gap-6">
          <IconButton
            icon={<ShoppingCart className="w-6 h-6 text-foreground" />}
            title="Carrinho"
          />
          <IconButton
            icon={<Heart className="w-6 h-6 text-foreground" />}
            title="Favoritos"
          />
          <IconButton
            icon={<MessageSquare className="w-6 h-6 text-foreground" />}
            title="Atendimento"
          />
        </div>
      </header>
    </div>
  );
};
