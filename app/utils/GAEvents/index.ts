"use client";
import { cartEv } from "./events/cartEvent";
import { productsEv } from "./events/productsEvent";
import { tabsEv } from "./events/tabsEvent";
import ReactGA from "react-ga4";

export type GAEvents = {
  tabs: tabsEv;
  products: productsEv;
  cart: cartEv;
};

type NullableParam<T> = T extends void ? [] : [params: T];

export const sendGAEvent = <
  T extends keyof GAEvents,
  K extends keyof GAEvents[T]
>(
  category: T,
  action: K,
  ...[params]: NullableParam<GAEvents[T][K]>
) => {
  const label = window.location.pathname + window.location.search;

  console.log("GA event:", category, ":", action, ":", label);
  ReactGA.event(action as any, {
    category: category,
    label,
    ...params,
  });
};
