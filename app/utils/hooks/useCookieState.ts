import { useState } from "react";
import { useCookies } from "./useCookies";
import { safelyParseJSON } from "../safelyParseJSON";

export function useCookieState<T = string>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const { getCookie, setCookie } = useCookies();
  const getInitialValue = (): T => {
    const defaultValue =
      typeof initialValue === "function" ? initialValue() : initialValue;

    return (
      safelyParseJSON(getCookie(key) || "", getCookie(key)) || defaultValue
    );
  };

  const [value, setValue] = useState<T>(getInitialValue);

  const setNextValue = (value: T) => {
    const stringified =
      typeof value === "string" ? value : JSON.stringify(value);

    console.log("set cookie", key, value);
    setCookie(key, stringified);
    setValue(value);
  };

  return [value, setNextValue];
}
