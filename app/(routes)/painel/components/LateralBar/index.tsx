"use client";

import { Button } from "@/components/ui/button";
import {
  AlignVerticalSpaceAround,
  BadgePercent,
  Package,
  ShoppingBasket,
  HelpCircle,
  LockKeyhole,
  PencilLine,
  Shirt,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface LateralBarProps {}

const routes = [
  {
    name: "Produtos",
    icon: <Package className="w-4 h-4 mr-1" />,
    href: "/products/",
  },
  {
    name: "pedidos",
    icon: <ShoppingBasket className="w-4 h-4 mr-1" />,
    href: "/orders/",
  },
  {
    name: "Cupom de desconto",
    icon: <BadgePercent className="w-4 h-4 mr-1" />,
    href: "/coupon/",
  },
  {
    name: "carrossel",
    icon: <AlignVerticalSpaceAround className="w-4 h-4 mr-1" />,
    href: "/carousel/",
  },
  {
    name: "Tecidos",
    icon: <Shirt className="w-4 h-4 mr-1" />,
    href: "/fabrics/",
  },
  {
    name: "Duvidas",
    icon: <HelpCircle className="w-4 h-4 mr-1" />,
    href: "/doubts/",
  },
  {
    name: "Personalização",
    icon: <PencilLine className="w-4 h-4 mr-1" />,
    href: "/customization/",
  },
  {
    name: "Bloqueio",
    icon: <LockKeyhole className="w-4 h-4 mr-1" />,
    href: "/block/",
  },
];

export const LateralBar: React.FC<LateralBarProps> = () => {
  const { push } = useRouter();
  const path = usePathname();

  const handleClick = (route: string) => {
    push("/painel" + route);
  };

  return (
    <aside className="w-64 h-screen flex flex-col justify-start items-center border-r-2 p-4 pt-11 shrink-0">
      <Image src="/logo.png" alt="Logo" width={200} height={200} />
      <div className="w-full flex flex-col gap-4">
        {routes.map((route) => {
          const isActive = path === `/painel${route.href}`;
          const Icon = route.icon;

          if (isActive) {
            return (
              <Button
                onClick={() => handleClick(route.href)}
                key={route.name}
                className="w-full display justify-start"
              >
                {Icon}
                {route.name}
              </Button>
            );
          }

          return (
            <Button
              onClick={() => handleClick(route.href)}
              key={route.name}
              className="w-full hover:bg-card hover:g-card/50 bg-card/50 text-primary justify-start"
            >
              {Icon}
              {route.name}
            </Button>
          );
        })}
      </div>
    </aside>
  );
};
