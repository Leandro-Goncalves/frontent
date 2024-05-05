import { useFavorites } from "@/app/states/favorites.state";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Products } from "@/app/models/products";
import { cn } from "@/lib/utils";
import { useTheme } from "@/app/states/useTheme.state";
import { hslToHex } from "@/app/utils/misc/hslToHex";
import { Player } from "@lottiefiles/react-lottie-player";
import { themes } from "@/app/themes";
import { Heart2 } from "@/app/assets/Heart2";
import { LazyLottie } from "@/components/LazyLottie";
import { handleHydrateZustandSSR } from "@/app/utils/zustandSSR/handleHydrateZustandSSR";

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
  const theme = useTheme((state) => state.theme);
  const selectedTheme = theme || themes["3ce01499-9159-42bc-a31f-3cbba37b24f1"];
  const [h, s, l] = selectedTheme.foreground.replaceAll("%", "").split(" ");
  const playerRef = useRef<Player>(null);

  handleHydrateZustandSSR(useFavorites);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  console.log("favorites2", favorites);

  const isMyProductFavorite = favorites.some(
    (favorite) =>
      favorite.uuid === product.uuid &&
      favorite.selectedVariant.guid === selectedVariantGuid
  );

  const startAnimation = (e: any) => {
    e.stopPropagation();
    if (isMyProductFavorite) {
      removeFavorite(product.uuid, selectedVariantGuid);
      playerRef.current?.setSeeker(0);
    } else {
      addFavorite(product.uuid, selectedVariantGuid);
      playerRef.current?.setSeeker(25, true);
      playerRef.current?.play();
    }
  };

  return (
    <Button
      onClick={startAnimation}
      variant={"outline"}
      size={"icon"}
      className={cn(
        withoutCircle
          ? "bg-transparent hover:bg-transparent border-none"
          : "rounded-full border-[1px] border-foreground hover:bg-foreground/10 flex-shrink-0 relative"
      )}
    >
      <div className=" flex-shrink-0 w-[200px] h-[200px] absolute pointer-events-none flex">
        <LazyLottie
          loop={false}
          playerRef={playerRef}
          id="heart"
          replaceColor={[
            [0, 0, 0],
            hslToHex(parseInt(h), parseInt(s), parseInt(l)),
          ]}
          onEvent={(e) => {
            if (e === "load") {
              if (isMyProductFavorite) {
                playerRef.current?.setSeeker(116, true);
              }
            }
          }}
          src={() => import("@/app/lottieAssets/heart.json")}
          fallback={
            <Heart2
              className={cn("fill-foreground", {
                "fill-[#d52e52]": isMyProductFavorite,
              })}
            />
          }
          style={{ height: "200px", width: "200px" }}
          keepLastFrame
        />
      </div>
    </Button>
  );
};
