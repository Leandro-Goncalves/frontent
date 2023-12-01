"use client";
import { useState } from "react";
import { ProductsImage, ProductsSize } from "@/app/models/products";
import { ProductImages } from "./components/ProductImages";
import { Sizes } from "../Sizes";
import { CartActions } from "@/app/components/CartActions";
import { toCurrencyValue } from "@/app/utils/misc/toCurrencyValue";
import { QuantitySelector } from "@/app/(routes)/cart/components/QuantitySelector";
import { useRouter } from "next/navigation";

interface ProductInfoProps {
  product: ProductsImage;
  installments: number;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  installments,
}) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<ProductsSize>();

  return (
    <div className="mt-5 flex gap-8 max-[1000px]:flex-col max-[1000px]:items-center">
      <ProductImages product={product} />
      <div className="max-w-xs flex flex-col max-[1000px]:max-w-2xl w-full">
        <p className="text-2xl font-medium">{product.name}</p>
        <p className="text-4xl font-extrabold mt-8 text-[#292929]">
          {toCurrencyValue(product.price)}
        </p>
        <p className="text-sm font-extrabold">Em {installments}x sem juros</p>

        <div className="flex mt-auto justify-between">
          <div>
            <p className="text-sm font-extrabold">Tamanho:</p>
            <div className="mb-4">
              <Sizes
                sizes={product.sizes}
                selectedSize={size}
                updateSize={setSize}
              />
            </div>
          </div>
          <div className="flex mb-4">
            <QuantitySelector
              quantity={quantity}
              updateQuantity={setQuantity}
            />
          </div>
        </div>
        <div>
          <CartActions
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
