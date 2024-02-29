import { create } from "zustand";
import { Products, ProductsSize, Variant } from "../models/products";
import { v4 as uuidV4 } from "uuid";
import { Cupom } from "../models/cupom";

export interface ProductCart {
  guid: string;
  product: Products;
  quantity: number;
  size?: ProductsSize;
  variant: Variant;
}

export interface AddProductDTO {
  product: Products;
  quantity: number;
  size?: ProductsSize;
  variant: Variant;
}

interface useCartProps {
  cart: ProductCart[];

  coupon?: Cupom;
  addCoupon: (coupon: Cupom) => void;
  removeCoupon: () => void;

  addProduct: (product: AddProductDTO) => void;
  removeProduct: (productGuid: string) => void;
  updateQuantity: (productGuid: string, quantity: number) => void;
  updateSize: (productGuid: string, size: ProductsSize) => void;
  cleanCart: () => void;

  focusSizeGuids: string[];
  setFocusSizeGuids: (focusSizeGuids: string[]) => void;
  removeItemFromFocusSizeGuids: (productGuid: string) => void;
}

export const useCart = create<useCartProps>((set) => ({
  addCoupon: (coupon: Cupom) => {
    set((state) => ({
      coupon,
    }));
  },

  removeCoupon: () => {
    set(() => ({
      coupon: undefined,
    }));
  },

  cart: [],
  addProduct: async (productDTO) => {
    const product: ProductCart = {
      guid: uuidV4(),
      ...productDTO,
    };

    set((state) => ({
      cart: [...state.cart, product],
    }));
  },

  removeProduct: (productGuid) => {
    set((state) => ({
      cart: state.cart.filter(({ guid }) => guid !== productGuid),
    }));
  },

  updateQuantity: (productGuid, quantity) => {
    set((state) => ({
      cart: state.cart.map((product) =>
        product.guid === productGuid ? { ...product, quantity } : product
      ),
    }));
  },

  updateSize: (productGuid, size) => {
    set((state) => ({
      cart: state.cart.map((product) =>
        product.guid === productGuid ? { ...product, size } : product
      ),
    }));
  },

  cleanCart: () => {
    set((state) => ({
      cart: [],
    }));
  },

  focusSizeGuids: [],
  setFocusSizeGuids: (focusSizeGuids) => {
    set(() => ({
      focusSizeGuids,
    }));
  },

  removeItemFromFocusSizeGuids: (productGuid) => {
    set((state) => ({
      focusSizeGuids: state.focusSizeGuids.filter(
        (guid) => guid !== productGuid
      ),
    }));
  },
}));
