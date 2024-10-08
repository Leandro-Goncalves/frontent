"use client";
import { Products, Variant } from "@/app/models/products";
import { Images } from "./components/Images";
import { useState } from "react";
import { toCurrencyValue } from "@/app/utils/misc/toCurrencyValue";
import { useRouter } from "next/navigation";
import { FavoriteButton } from "@/app/components/FavoriteButton";
import { sendGAEvent } from "@/app/utils/GAEvents";

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
  console.log(selectedVariant);
  const isSoldOut =
    selectedVariant.size.reduce((acc, size) => {
      return acc + size.quantity;
    }, 0) === 0;

  const router = useRouter();

  const [hover, setHover] = useState(false);

  const installmentsPrice =
    (selectedVariant.promotionalPrice || selectedVariant.price) / installments;

  const imagesArray = selectedVariant
    ? [...selectedVariant.Image]
    : product.variants.flatMap((v) => v.Image);

  const handleOpenItemDetails = () => {
    sendGAEvent("products", "openProduct", { name: product.name });
    if (selectedVariant?.guid) {
      router.push(`/itemDetails/${product.uuid}?v=${selectedVariant.guid}`);
    } else {
      router.push(`/itemDetails/${product.uuid}`);
    }
  };

  return (
    <div className="w-[300px] flex flex-col relative">
      <div className="absolute z-10 right-0 bg-secondary h-[40px] rounded-bl-md rounded-tr-md">
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
        disable={isSoldOut}
      >
        {isSoldOut && (
          <div className="absolute uppercase font-bold inset-0 flex items-end justify-center bg-black/30 z-[11]">
            <p className="text-white text-center bg-gray-700 w-full p-3">
              Produto esgotado
            </p>
          </div>
        )}
        {selectedVariant.promotionalPrice && (
          <p className="text-white uppercase font-bold text-center bg-primary w-full p-3 absolute z-10 bottom-0">
            Promoção
          </p>
        )}
      </Images>
      <div className="text-foreground font-bold">
        <p className="text-sm mt-2">
          {product.name} {selectedVariant && `- ${selectedVariant.name}`}
        </p>
        {selectedVariant.promotionalPrice ? (
          <p className="text-base font-semibold pt-2 text-foreground leading-3 line-through">
            {toCurrencyValue(selectedVariant.price)}
          </p>
        ) : (
          <></>
        )}
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
