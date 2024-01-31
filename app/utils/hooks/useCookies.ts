import { isSsr } from "../misc/isSsr";
import * as CookiesClientSide from "cookies-next";

interface cookieLibProps {
  getCookie: (key: string) => string | undefined;
  setCookie: (key: string, value: string) => void;
  deleteCookie: (key: string) => void;
}

export const useCookies = () => {
  let cookieLib: cookieLibProps = {
    getCookie: (key: string) => {
      return CookiesClientSide.getCookie(key);
    },
    setCookie: (key: string, value: string) => {
      return CookiesClientSide.setCookie(key, value);
    },
    deleteCookie: (key: string) => {
      return CookiesClientSide.deleteCookie(key);
    },
  };

  if (isSsr()) {
    const { cookies } =
      require("next/headers") as typeof import("next/headers");
    cookieLib = {
      getCookie: (key: string) => {
        return cookies().get(key)?.value;
      },
      setCookie: (key: string, value: string) => {
        return cookies().set(key, value);
      },
      deleteCookie: (key: string) => {
        return cookies().delete(key);
      },
    };
  }

  return cookieLib;
};
