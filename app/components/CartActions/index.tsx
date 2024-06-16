"use client";
import { Products, ProductsSize, Variant } from "@/app/models/products";
import { AddToCart } from "../AddToCart";
import { FavoriteButton } from "../FavoriteButton";

interface CartActionsProps {
  product: Products;
  quantity: number;
  selectedSize?: ProductsSize;
  onAddToCart?: () => void;
  variant: Variant;
  isDisabled?: boolean;
  text?: string;
}

export const CartActions: React.FC<CartActionsProps> = ({
  product,
  quantity,
  selectedSize,
  onAddToCart,
  variant,
  isDisabled,
  text,
}) => {
  return (
    <div className="flex justify-between items-center gap-2 mt-3 w-full">
      <AddToCart
        text={text}
        product={product}
        quantity={quantity}
        selectedSize={selectedSize}
        onAddToCart={onAddToCart}
        variant={variant}
        isDisabled={isDisabled}
      />
      <FavoriteButton product={product} selectedVariantGuid={variant.guid} />
    </div>
  );
};
