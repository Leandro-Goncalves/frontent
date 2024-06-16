"use client";
import { cn } from "@/lib/utils";
import {
  BadgePercent,
  CreditCard,
  Instagram,
  LockKeyhole,
  PackageCheck,
} from "lucide-react";

interface InformativeProps {}

const data = [
  {
    Icon: PackageCheck,
    subtitle: "Enviamos seus pedidos!",
    description: "Entregamos em todo Brasil.",
  },
  {
    Icon: CreditCard,
    subtitle: "Pague como quiser!",
    description: "Cartão, pix ou boleto.",
  },
  {
    Icon: BadgePercent,
    subtitle: "Parcele em até 10x",
    description: "Sem juros!",
  },
  {
    Icon: Instagram,
    subtitle: "Siga a Cacau Store",
    description: "@caacaustore",
    link: "https://www.instagram.com/caacaustore/",
  },
  {
    Icon: LockKeyhole,
    subtitle: "Compre com segurança!",
    description: "Seus dados estão protegidos.",
  },
];

export const Informative: React.FC<InformativeProps> = () => {
  return (
    <div className="w-full p-6 bg-[#DC024F1A] mt-16 justify-center gap-6 grid grid-cols-5 max-lg:grid-cols-3 max-sm:grid-cols-2 max-[410px]:grid-cols-1">
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
