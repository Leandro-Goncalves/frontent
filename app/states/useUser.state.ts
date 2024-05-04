import { User } from "../models/user";
import { SSRCreate } from "../utils/zustandSSR/SSRCreate";

interface useUserProps {
  user?: User;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUser = SSRCreate<useUserProps>(
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
  }
);
