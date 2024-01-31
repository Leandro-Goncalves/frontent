import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Products, Variant } from "../models/products";
import { productService } from "../services/products";
import env from "../env";

interface ProductsWithVariant extends Products {
  selectedVariant: Variant;
}

interface useFavoritesProps {
  favorites: ProductsWithVariant[];
  addFavorite: (guid: string, variantGuid: string) => Promise<Products>;
  removeFavorite: (guid: string, variantGuid: string) => void;
  removeFavoriteByGuid: (guid: string) => void;
}

export const useFavorites = create(
  persist<useFavoritesProps>(
    (set) => ({
      favorites: [],
      removeFavoriteByGuid: (guid) => {
        set((state) => ({
          favorites: state.favorites.filter((product) => product.uuid !== guid),
        }));
      },
      removeFavorite: (guid, variantGuid) => {
        set((state) => ({
          favorites: state.favorites.filter(
            (product) =>
              product.uuid !== guid &&
              (product as any).selectedVariant.guid !== variantGuid
          ),
        }));
      },
      addFavorite: async (guid, variantGuid) => {
        const product = await productService.getOne(env.ESTABLISHMENT_ID, guid);

        const productVariant = product.data.variants.find(
          (v) => v.guid === variantGuid
        );
        if (!productVariant) return product.data;

        const productWithVariant = {
          ...product.data,
          selectedVariant: productVariant,
        };

        set((state) => ({
          favorites: [...state.favorites, productWithVariant],
        }));

        return product.data;
      },
    }),
    {
      name: "favorites",
    }
  )
);
