import { create } from "zustand";
import { ProductCart } from "./cart.state";

interface useEditProductProps {
  products: ProductCart[];
  addEditProduct: (product: ProductCart) => void;
  removeEditProduct: (productGuid: string) => void;
}

export const useEditProduct = create<useEditProductProps>((set) => ({
  products: [],
  addEditProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
  removeEditProduct: (productGuid) =>
    set((state) => ({
      products: state.products.filter(({ guid }) => guid !== productGuid),
    })),
}));
