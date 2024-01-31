import { InternalAxiosRequestConfig } from "axios";
import { AUTH_HEADER } from "../api";
import { useCookies } from "@/app/utils/hooks/useCookies";

export const AuthInterceptor = (config: InternalAxiosRequestConfig<any>) => {
  const isAuth = config.headers.has(AUTH_HEADER);
  const { getCookie } = useCookies();
  const token = JSON.parse(getCookie("user") || "{}")?.state?.user?.token;

  if (isAuth && token) {
    config.headers.delete(AUTH_HEADER);

    config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
};
