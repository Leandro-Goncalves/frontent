export const isSsr = (): boolean => typeof window === "undefined";

import env from "@/app/env";
import { cache } from "react";

export const getItem = cache(async (id: string) => {
  const item = await fetch(env.API_URL + "/establishment/status4").then((res) =>
    res.json()
  );
  return item;
});
