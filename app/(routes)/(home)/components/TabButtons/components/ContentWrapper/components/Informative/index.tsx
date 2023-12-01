"use client";
import { cn } from "@/lib/utils";
import { CreditCard, Gift, Instagram, ShoppingBag } from "lucide-react";

interface InformativeProps {}

const data = [
  {
    Icon: Gift,
    title: "Compre e",
    subtitle: "Ganhe brindes",
    description: "(sem valor minimo)",
  },
  {
    Icon: ShoppingBag,
    title: "Embalagens",
    subtitle: "Presenteáveis",
  },
  {
    Icon: CreditCard,
    title: "Parcelamos em até",
    subtitle: "10x sem juros",
  },
  {
    Icon: Instagram,
    title: "Siga-nos no Instagram",
    subtitle: "@caacaustore",
    link: "https://www.instagram.com/caacaustore/",
  },
];

export const Informative: React.FC<InformativeProps> = () => {
  return (
    <div className="w-full p-6 bg-[#DC024F1A] mt-16 justify-center gap-6 grid grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2 max-[410px]:grid-cols-1">
      {data.map(({ Icon, title, subtitle, description, link }) => (
        <div
          key={title}
          className="flex items-center justify-center max-[410px]:justify-center gap-1"
        >
          <Icon className="w-16 h-16 max-md:w-8 max-md:h-8" />
          <div>
            <h3 className="text-xs font-semibold">{title}</h3>
            <h2
              className={cn(
                "text-base font-bold text-[#DC024F]",
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
