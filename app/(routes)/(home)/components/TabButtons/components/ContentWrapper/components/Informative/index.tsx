"use client";
import { cn } from "@/lib/utils";
import { BadgePercent, Gift, Instagram, PackageCheck } from "lucide-react";

interface InformativeProps {}

const data = [
  {
    Icon: PackageCheck,
    subtitle: "Ganhe frete grátis",
    description: "Ganhe frete grátis a partir de R$299 em compras",
  },
  {
    Icon: Gift,
    subtitle: "Presente na primeira compra",
    description: "Ative o cupom: Soucacauzete",
  },
  {
    Icon: BadgePercent,
    subtitle: "Parcele em até 10x",
    description: "Sem juros!",
  },
  {
    Icon: Instagram,
    subtitle: "Siga a Cacau Store",
    description: "@caacaustore",
    link: "https://www.instagram.com/caacaustore/",
  },
];

export const Informative: React.FC<InformativeProps> = () => {
  return (
    <div className="w-full p-6 bg-[#DC024F1A] mt-16 justify-center gap-6 grid grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2 max-[410px]:grid-cols-1">
      {data.map(({ Icon, subtitle, description, link }, index) => (
        <div
          key={index}
          className="flex items-center justify-center max-[410px]:mr-auto max-[410px]:justify-center gap-1"
        >
          <Icon className="w-16 h-16 max-md:w-8 max-md:h-8" />
          <div>
            <h2
              className={cn(
                "text-base font-bold text-primary",
                link && "cursor-pointer"
              )}
              onClick={() => {
                if (link) {
                  window.open(link, "_blank");
                }
              }}
            >
              {subtitle}
            </h2>
            <p className="text-xs font-semibold">{description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
