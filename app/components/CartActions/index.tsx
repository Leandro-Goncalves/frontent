"use client";
import { Button } from "@/components/ui/button";
import heartAnimation from "@/app/lottieAssets/heart.json";
import { useLottie } from "lottie-react";
import { ProductsImage, ProductsSize } from "@/app/models/products";
import { useFavorites } from "@/app/states/favorites.state";
import { useEffect } from "react";
import { AddToCart } from "../AddToCart";

interface CartActionsProps {
  product: Omit<ProductsImage, "description">;
  quantity: number;
  selectedSize?: ProductsSize;
  onAddToCart?: () => void;
}

export const CartActions: React.FC<CartActionsProps> = ({
  product,
  quantity,
  selectedSize,
  onAddToCart,
}) => {
  const options = {
    animationData: heartAnimation,
    loop: false,
    autoplay: false,
  };
  const { View, goToAndPlay, goToAndStop } = useLottie(options);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isMyProductFavorite = favorites.some(
    (favorite) => favorite.uuid === product.uuid
  );

  const startAnimation = (e: any) => {
    e.stopPropagation();
    if (isMyProductFavorite) {
      removeFavorite(product.uuid);
      goToAndStop(0);
    } else {
      addFavorite(product.uuid);
      goToAndPlay(25, true);
    }
  };

  useEffect(() => {
    if (isMyProductFavorite) {
      goToAndStop(116, true);
    }
  }, []); // eslint-disable-line

  return (
    <div className="flex justify-between items-center gap-2 mt-3 w-full">
      <AddToCart
        product={product}
        quantity={quantity}
        selectedSize={selectedSize}
        onAddToCart={onAddToCart}
      />
      <Button
        onClick={startAnimation}
        variant={"outline"}
        size={"icon"}
        className="rounded-full border-[1px] border-black hover:bg-[#0000000c] flex-shrink-0 relative"
      >
        <div className=" flex-shrink-0 w-[200px] h-[200px] absolute pointer-events-none">
          {View}
        </div>
      </Button>
    </div>
  );
};
