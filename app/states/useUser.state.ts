import { create } from "zustand";
import { User } from "../models/user";
import { persist } from "zustand/middleware";
import { default as Cookies } from "js-cookie";

interface useUserProps {
  user?: User;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUser = create(
  persist<useUserProps>(
    (set) => ({
      setUser: (user: User) => {
        set({ user });
      },
      logout: () => {
        set({ user: undefined });
      },
    }),
    {
      name: "user",
      storage: {
        getItem: (name) => JSON.parse(Cookies.get(name) || "{}"),
        setItem: (name, value) => {
          Cookies.set(name, JSON.stringify(value));
        },
        removeItem: (name) => Cookies.remove(name),
      },
    }
  )
);
