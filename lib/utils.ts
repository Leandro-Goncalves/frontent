import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const replace = (value: string, key: string) => {
  const replacedValue = value.replaceAll(" ", ` ${key}:`);
  return `${key}:${replacedValue}`;
};

export const after = (string: string) => replace(string, "after");
export const before = (string: string) => replace(string, "before");
export const hover = (string: string) => replace(string, "hover");
export const active = (string: string) => replace(string, "active");
