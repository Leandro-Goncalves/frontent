"use client";
import { useCart } from "@/app/states/cart.state";
import { useFavorites } from "@/app/states/favorites.state";
import { useEffect } from "react";

interface RemoveProductAndFavoriteProps {
  guid: string;
}

export const RemoveProductAndFavorite: React.FC<
  RemoveProductAndFavoriteProps
> = ({ guid }) => {
  const removeFavorite = useFavorites((state) => state.removeFavorite);
  const removeProduct = useCart((state) => state.removeProduct);

  useEffect(() => {
    if (guid) {
      removeFavorite(guid);
      removeProduct(guid);
    }
  }, [guid]); // eslint-disable-line

  return <></>;
};
