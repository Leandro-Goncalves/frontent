import { StateCreator, create } from "zustand";
import { PersistOptions, persist } from "zustand/middleware";
import { default as Cookies } from "js-cookie";

export const SSRCreate = <A>(
  initializer: StateCreator<A, [["zustand/persist", unknown]], []>,
  options: Omit<PersistOptions<A, A>, "storage">
) => {
  return create(
    persist<A>(initializer, {
      ...options,
      storage: {
        getItem: (name: any) => {
          const cookie = JSON.parse(Cookies.get(name) || "{}");
          console.log("get item", name, cookie);

          return cookie;
        },
        setItem: (name: any, value: any) => {
          // console.log("set item", name, value);
          Cookies.set(name, JSON.stringify(value));
        },
        removeItem: (name: any) => Cookies.remove(name),
      },
    })
  );
};
