import { useFavorites } from "@/app/states/favorites.state";
import { Button } from "@/components/ui/button";
import heartAnimation from "@/app/lottieAssets/heart.json";
import { useLottie } from "lottie-react";
import { useEffect } from "react";
import { Products } from "@/app/models/products";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  product: Products;
  selectedVariantGuid: string;
  withoutCircle?: boolean;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  product,
  selectedVariantGuid,
  withoutCircle,
}) => {
  const options = {
    animationData: heartAnimation,
    loop: false,
    autoplay: false,
  };
  const { View, goToAndPlay, goToAndStop } = useLottie(options);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isMyProductFavorite = favorites.some(
    (favorite) =>
      favorite.uuid === product.uuid &&
      favorite.selectedVariant.guid === selectedVariantGuid
  );

  const startAnimation = (e: any) => {
    e.stopPropagation();
    if (isMyProductFavorite) {
      removeFavorite(product.uuid, selectedVariantGuid);
      goToAndStop(0);
    } else {
      addFavorite(product.uuid, selectedVariantGuid);
      goToAndPlay(25, true);
    }
  };

  useEffect(() => {
    if (isMyProductFavorite) {
      goToAndStop(116, true);
    }
  }, []); // eslint-disable-line

  return (
    <Button
      onClick={startAnimation}
      variant={"outline"}
      size={"icon"}
      className={cn(
        withoutCircle
          ? "bg-transparent hover:bg-transparent border-none"
          : "rounded-full border-[1px] border-black hover:bg-[#0000000c] flex-shrink-0 relative"
      )}
    >
      <div className=" flex-shrink-0 w-[200px] h-[200px] absolute pointer-events-none">
        {View}
      </div>
    </Button>
  );
};
