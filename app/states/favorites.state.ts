import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Products } from "../models/products";
import { productService } from "../services/products";
import env from "../env";

interface useFavoritesProps {
  favorites: Products[];
  addFavorite: (guid: string) => Promise<Products>;
  removeFavorite: (guid: string) => void;
}

export const useFavorites = create(
  persist<useFavoritesProps>(
    (set) => ({
      favorites: [],
      removeFavorite: (guid) => {
        set((state) => ({
          favorites: state.favorites.filter((product) => product.uuid !== guid),
        }));
      },
      addFavorite: async (guid) => {
        const product = await productService.getOne(env.ESTABLISHMENT_ID, guid);

        set((state) => ({
          favorites: [...state.favorites, product.data],
        }));

        return product.data;
      },
    }),
    {
      name: "favorites",
    }
  )
);
