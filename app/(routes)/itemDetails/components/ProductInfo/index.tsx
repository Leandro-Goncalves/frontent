"use client";
import { useMemo, useState } from "react";
import { Products, ProductsSize } from "@/app/models/products";
import { ProductImages } from "./components/ProductImages";
import { Sizes } from "../Sizes";
import { CartActions } from "@/app/components/CartActions";
import { toCurrencyValue } from "@/app/utils/misc/toCurrencyValue";
import { QuantitySelector } from "@/app/(routes)/cart/components/QuantitySelector";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import env from "@/app/env";
import { cn } from "@/lib/utils";

interface ProductInfoProps {
  product: Products;
  installments: number;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  installments,
}) => {
  const searchParams = useSearchParams();
  const vGuid = searchParams?.get("v");

  const divideImageByIndex = useMemo(() => {
    const imageObject: Record<string, number> = {};
    let accumulator = -1;
    product.variants.forEach((variant) => {
      imageObject[variant.guid] = accumulator + 1;
      accumulator += variant.Image.length;
    });
    return imageObject;
  }, [product]);

  const initialData = useMemo(() => {
    if (!vGuid) {
      return {
        variant: product.variants[0],
        firstImageIndex: 0,
      };
    }

    const variant = product.variants.find((v) => v.guid === vGuid);

    return {
      variant: variant ?? product.variants[0],
      firstImageIndex: variant ? divideImageByIndex[vGuid] : 0,
    };
  }, []); //eslint-disable-line

  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<ProductsSize>();
  const [selectedVariant, setSelectedVariant] = useState(initialData.variant);
  const [selectedImageIndex, setSelectedImageIndex] = useState(
    initialData.firstImageIndex
  );

  const images = product.variants.flatMap((v) => v.Image);
  const isSoldOut =
    selectedVariant.size.reduce((acc, size) => {
      return acc + size.quantity;
    }, 0) === 0;

  return (
    <div className="mt-5 flex gap-8 max-[1000px]:flex-col max-[1000px]:items-center flex-shrink-0">
      <ProductImages
        images={images}
        selectedImageIndex={selectedImageIndex}
        setSelectedImageIndex={setSelectedImageIndex}
      />
      <div className="max-w-xs flex flex-col max-[1000px]:max-w-2xl w-full">
        <p className="text-2xl font-medium">{product.name}</p>
        {selectedVariant.promotionalPrice ? (
          <p className="text-base font-semibold mt-8 text-foreground leading-3 line-through">
            {toCurrencyValue(selectedVariant.price)}
          </p>
        ) : (
          <></>
        )}
        <p className="text-4xl font-extrabold text-foreground">
          {toCurrencyValue(
            selectedVariant.promotionalPrice || selectedVariant.price
          )}
        </p>
        <p className="text-sm font-extrabold">
          Em até {installments}x sem juros
        </p>

        <div className="mt-auto">
          <p className="text-sm font-extrabold mb-2">
            Estampas: {selectedVariant.name}
          </p>
          <div className="flex gap-3 flex-wrap">
            {product.variants.map((variant) => {
              const isSoldOut =
                variant.size.reduce((acc, size) => {
                  return acc + size.quantity;
                }, 0) === 0;
              const isSelected = variant.guid === selectedVariant.guid;
              const handleSelectVariant = () => {
                setSelectedVariant(variant);
                setSize(undefined);
                setQuantity(1);
                if (variant.Image[0]) {
                  const ImageIndex = divideImageByIndex[variant.guid];
                  setSelectedImageIndex(ImageIndex);
                }
              };

              if (!variant.Image[0]) {
                return (
                  <button
                    disabled={isSoldOut}
                    onClick={handleSelectVariant}
                    className={cn([
                      "bg-secondary",
                      isSelected && "border-2 border-primary",
                      isSoldOut && "opacity-50",
                    ])}
                    key={variant.name}
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: 8,
                    }}
                  />
                );
              }

              return (
                <button
                  disabled={isSoldOut}
                  key={variant.name}
                  onClick={handleSelectVariant}
                >
                  <Image
                    className={cn([
                      "bg-secondary",
                      isSelected && "border-2 border-primary",
                      isSoldOut && "opacity-50",
                    ])}
                    src={`${env.CDN_URL}/${variant.Image[0].imageId}`}
                    alt={variant.name}
                    width={54}
                    height={54}
                    style={{
                      borderRadius: 8,
                      width: 54,
                      height: 54,
                      objectFit: "cover",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex mt-14 justify-between">
          <div>
            <p className="text-sm font-extrabold">Tamanho:</p>
            <div className="mb-4">
              <Sizes
                disabled={selectedVariant.isSoldOut}
                sizes={selectedVariant.size}
                selectedSize={size}
                updateSize={(newSize) => {
                  setSize(newSize);
                  setQuantity(1);
                }}
              />
            </div>
          </div>
          <div className="flex mb-4">
            <QuantitySelector
              quantity={quantity}
              updateQuantity={setQuantity}
              maxQuantity={size?.quantity ?? 1}
            />
          </div>
        </div>
        <div>
          <CartActions
            text={isSoldOut ? "Produto esgotado" : undefined}
            isDisabled={!size}
            variant={selectedVariant}
            product={product}
            quantity={quantity}
            selectedSize={size}
            onAddToCart={() => {
              router.push("/");
            }}
          />
        </div>
      </div>
    </div>
  );
};
