"use client";
import { Products, Variant } from "@/app/models/products";
import { Images } from "./components/Images";
import { useState } from "react";
import { toCurrencyValue } from "@/app/utils/misc/toCurrencyValue";
import { useRouter } from "next/navigation";
import { FavoriteButton } from "@/app/components/FavoriteButton";

interface ProductProps {
  product: Products;
  selectedVariant: Variant;
  installments: number;
}

export const Product: React.FC<ProductProps> = ({
  product,
  installments,
  selectedVariant,
}) => {
  const router = useRouter();

  const [hover, setHover] = useState(false);

  const installmentsPrice =
    (selectedVariant.promotionalPrice || selectedVariant.price) / installments;

  const imagesArray = selectedVariant
    ? [...selectedVariant.Image]
    : product.variants.flatMap((v) => v.Image);

  const handleOpenItemDetails = () => {
    if (selectedVariant?.guid) {
      router.push(`/itemDetails/${product.uuid}?v=${selectedVariant.guid}`);
    } else {
      router.push(`/itemDetails/${product.uuid}`);
    }
  };

  return (
    <div className="w-[300px] flex flex-col relative">
      <div className="absolute z-10 right-0 bg-[#f38bb0] h-[40px] rounded-bl-md rounded-tr-md">
        <FavoriteButton
          product={product}
          withoutCircle
          selectedVariantGuid={selectedVariant.guid}
        />
      </div>
      <Images
        onClick={handleOpenItemDetails}
        ProductImages={imagesArray}
        isHover={hover}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
      <div className="text-[#303030] font-bold">
        <p className="text-sm mt-2">
          {product.name} {selectedVariant && `- ${selectedVariant.name}`}
        </p>
        <p className="text-3xl">
          {toCurrencyValue(
            selectedVariant.promotionalPrice || selectedVariant.price
          )}
        </p>
        <p className="text-xs">
          Ou {installments}x de {toCurrencyValue(installmentsPrice)} no cartão
          sem juros
        </p>
      </div>

      {/* <CartActions product={product} quantity={1} /> */}
    </div>
  );
};
