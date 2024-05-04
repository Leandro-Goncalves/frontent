"use client";
import { useEffect } from "react";
import { useTheme } from "@/app/states/useTheme.state";
import { themes } from "@/app/themes";

interface UpdateThemeProps {
  themeGuid: string;
}

export const UpdateTheme: React.FC<UpdateThemeProps> = ({ themeGuid }) => {
  const { setTheme } = useTheme();

  useEffect(() => {
    if (themeGuid) {
      const newTheme =
        themes[themeGuid as keyof typeof themes] ??
        themes["3ce01499-9159-42bc-a31f-3cbba37b24f1"];
      setTheme(newTheme);
    }
  }, [themeGuid, setTheme]);

  return <></>;
};
