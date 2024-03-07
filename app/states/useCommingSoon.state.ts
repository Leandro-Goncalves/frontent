import { create } from "zustand";

interface useComingSoonProps {
  shouldShow: boolean;
  setShow: (show: boolean) => void;
}

export const useComingSoon = create<useComingSoonProps>((set) => ({
  shouldShow: false,
  setShow: (show) => set(() => ({ shouldShow: show })),
}));
