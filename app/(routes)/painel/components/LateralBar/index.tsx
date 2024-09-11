import {
  AlignVerticalSpaceAround,
  BadgePercent,
  Package,
  ShoppingBasket,
  HelpCircle,
  LockKeyhole,
  PencilLine,
  Shirt,
  Heart,
  GalleryThumbnails,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { RouteItem } from "./components/RouteItem";
import { Accordion } from "@/components/ui/accordion";
import { MessageSquareQuote } from "@/app/assets/MessageSquareQuote";

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
    name: "Personalização",
    icon: <PencilLine className="w-4 h-4 mr-1" />,
    href: "/customization/",
  },
  // {
  //   name: "Delivery e retirada",
  //   icon: <Truck className="w-4 h-4 mr-1" />,
  //   href: "/delivery/",
  // },
  {
    name: "Catalogo",
    content: [
      {
        name: "carrossel",
        icon: <AlignVerticalSpaceAround className="w-4 h-4 mr-1" />,
        href: "/carousel/",
      },
      {
        name: "Feedbacks",
        icon: <MessageSquareQuote className="w-4 h-4 mr-1" />,
        href: "/feedbacks/",
      },
      {
        name: "Bloqueio",
        icon: <LockKeyhole className="w-4 h-4 mr-1" />,
        href: "/block/",
      },
    ],
  },
  {
    name: "Informações",
    content: [
      {
        name: "Tecidos",
        icon: <Shirt className="w-4 h-4 mr-1" />,
        href: "/fabrics/",
      },
      {
        name: "Dúvidas",
        icon: <HelpCircle className="w-4 h-4 mr-1" />,
        href: "/doubts/",
      },
    ],
  },
  {
    name: "cacau store",
    content: [
      {
        name: "carrossel da loja",
        icon: <GalleryThumbnails className="w-4 h-4 mr-1" />,
        href: "/storeCarousel/",
      },
      {
        name: "nossa história",
        icon: <Heart className="w-4 h-4 mr-1" />,
        href: "/ourStory/",
      },
    ],
  },
];

export const LateralBar: React.FC<LateralBarProps> = () => {
  return (
    <aside className="w-64 h-screen flex flex-col justify-start items-center border-r-2 p-4 pt-11 shrink-0">
      <Image src="/logo.png" alt="Logo" width={200} height={200} />
      <Accordion
        type="multiple"
        className="w-full flex flex-col gap-4 overflow-auto"
      >
        {routes.map((route) => (
          <RouteItem {...route} key={route.name} />
        ))}
      </Accordion>
    </aside>
  );
};
