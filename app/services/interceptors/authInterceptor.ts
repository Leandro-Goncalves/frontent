import { InternalAxiosRequestConfig } from "axios";
import { AUTH_HEADER } from "../api";

export const AuthInterceptor = (config: InternalAxiosRequestConfig<any>) => {
  const isAuth = config.headers.has(AUTH_HEADER);

  if (isAuth) {
    config.headers.delete(AUTH_HEADER);

    config.headers.set(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );
  }

  return config;
};
