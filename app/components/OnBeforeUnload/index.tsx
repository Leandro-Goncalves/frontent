"use client";

import { useCart } from "@/app/states/cart.state";
import { useEffect } from "react";

interface OnBeforeUnloadProps {}

export const OnBeforeUnload: React.FC<OnBeforeUnloadProps> = () => {
  const cart = useCart((state) => state.cart);
  useEffect(() => {
    window.onbeforeunload = () => {
      if (cart.length > 0) {
        return "Are you sure you want to leave?";
      }
    };
  }, [cart]);

  return <></>;
};
