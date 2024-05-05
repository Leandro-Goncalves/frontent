import { InternalAxiosRequestConfig } from "axios";
import { AUTH_HEADER } from "../api";
import { useCookies } from "@/app/utils/hooks/useCookies";
import { FetchContext, ResponseType } from "ofetch";

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

export const AuthInterceptor2 = (config: FetchContext<any, ResponseType>) => {
  const { getCookie } = useCookies();
  const isAuth = (config.options.headers as any)?.[AUTH_HEADER];
  const token = JSON.parse(getCookie("user") || "{}")?.state?.user?.token;

  if (isAuth && token) {
    delete (config.options.headers as any)[AUTH_HEADER];
    (config.options.headers as any)["Authorization"] = `Bearer ${token}`;
  }
};
