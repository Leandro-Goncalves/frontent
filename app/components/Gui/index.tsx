"use client";
import { useTheme } from "@/app/states/useTheme.state";
import { themes } from "@/app/themes";
import { useControls } from "leva";
import { useEffect } from "react";

const themeNameByGuid: Record<string, keyof typeof themes> = {
  default: "3ce01499-9159-42bc-a31f-3cbba37b24f1",
  dark: "2cd02c4e-5c77-4096-8ded-197e474368aa",
};

interface GuiProps {}

export const Gui: React.FC<GuiProps> = () => {
  const setTheme = useTheme((state) => state.setTheme);
  const { theme } = useControls({
    theme: {
      options: Object.keys(themeNameByGuid),
    },
  });

  useEffect(() => {
    const key = themeNameByGuid[theme];
    setTheme(themes[key]);
  }, [theme, setTheme]);

  return <></>;
};
