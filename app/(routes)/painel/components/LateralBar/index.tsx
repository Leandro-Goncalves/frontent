"use client";

import { Button } from "@/components/ui/button";
import {
  BadgePercent,
  Package,
  ShoppingBasket,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface LateralBarProps {}

const routes = [
  {
    name: "Produtos",
    icon: <Package className="w-4 h-4 mr-1" />,
    href: "/products",
  },
  // {
  //   name: "Loja",
  //   icon: <ShoppingCart className="w-4 h-4 mr-1" />,
  //   href: "/store",
  // },
  // {
  //   name: "Cupom de desconto",
  //   icon: <BadgePercent className="w-4 h-4 mr-1" />,
  //   href: "/coupon",
  // },
  {
    name: "pedidos",
    icon: <ShoppingBasket className="w-4 h-4 mr-1" />,
    href: "/orders",
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
              className="w-full hover:bg-[#ffd2e3] bg-[#FFEFF5] text-primary justify-start"
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
