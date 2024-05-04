import { themes } from "@/app/themes";
import { UpdateTheme } from "./updateTheme";

export interface Theme {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  themeGuid: string;
}

export function ThemeProvider({ children, themeGuid }: ThemeProviderProps) {
  const theme =
    themes[themeGuid as keyof typeof themes] ??
    themes["3ce01499-9159-42bc-a31f-3cbba37b24f1"];

  return (
    <>
      <UpdateTheme themeGuid={themeGuid} />
      <style>
        {`
      :root {
        --background: ${theme.background};
        --foreground: ${theme.foreground};
        --card: ${theme.card};
        --card-foreground: ${theme.cardForeground};
        --popover: ${theme.popover};
        --popover-foreground: ${theme.popoverForeground};
        --primary: ${theme.primary};
        --primary-foreground: ${theme.primaryForeground};
        --secondary: ${theme.secondary};
        --secondary-foreground: ${theme.secondaryForeground};
        --muted: ${theme.muted};
        --muted-foreground: ${theme.mutedForeground};
        --accent: ${theme.accent};
        --accent-foreground: ${theme.accentForeground};
        --destructive: ${theme.destructive};
        --destructive-foreground: ${theme.destructiveForeground};
        --border: ${theme.border};
        --input: ${theme.input};
        --ring: ${theme.ring};
      } 
    `}
      </style>
      {children}
    </>
  );
}
