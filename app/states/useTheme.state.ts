import { create } from "zustand";
import { Theme } from "@/components/theme-provider";

interface useThemeProps {
  theme?: Theme;
  setTheme: (theme: Theme) => void;
}

export const useTheme = create<useThemeProps>((set) => ({
  setTheme: (theme) => {
    set({ theme });
  },
}));
