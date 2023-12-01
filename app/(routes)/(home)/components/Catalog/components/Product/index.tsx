"use client";
import { ProductsImage } from "@/app/models/products";
import { Images } from "./components/Images";
import { useState } from "react";
import { toCurrencyValue } from "@/app/utils/misc/toCurrencyValue";
import { useRouter } from "next/navigation";
import { CartActions } from "@/app/components/CartActions";

interface ProductProps {
  product: Omit<ProductsImage, "description">;
  installments: number;
}

export const Product: React.FC<ProductProps> = ({ product, installments }) => {
  const router = useRouter();

  const [hover, setHover] = useState(false);

  const installmentsPrice = product.price / installments;

  const handleOpenItemDetails = () => {
    router.push(`/itemDetails/${product.uuid}`);
  };

  return (
    <div className="w-[275px] flex flex-col">
      <Images
        onClick={handleOpenItemDetails}
        ProductImages={product.Image}
        isHover={hover}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
      <div className="text-[#303030] font-bold">
        <p className="text-sm mt-2">{product.name}</p>
        <p className="text-3xl">{toCurrencyValue(product.price)}</p>
        <p className="text-xs">
          Ou {installments}x de {toCurrencyValue(installmentsPrice)} no cartão
          sem juros
        </p>
      </div>
      <CartActions product={product} quantity={1} />
    </div>
  );
};
