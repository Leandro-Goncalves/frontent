import { useCookies } from "@/app/utils/hooks/useCookies";
import { userService } from "../user";
import { useUser } from "@/app/states/useUser.state";
import api from "../api";
import { AxiosError } from "axios";

let isRefreshing = false;
let failedRequestQueue: Array<{
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}> = [];

export const ErrorInterceptor = async (error: any) => {
  // console.log(error);
  const user = useUser.getState().user;
  const { id, refreshToken } = user ?? {};

  const isTokenExpired = error?.response?.status === 401;

  const originalConfig = error.config;
  if (isTokenExpired && id && refreshToken && user) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        userService.refreshToken(id, refreshToken).then(({ data }) => {
          console.log(data);
          useUser.setState({ user: { ...user, ...data } });
          failedRequestQueue.forEach((request) =>
            request.onSuccess(data.token)
          );
          failedRequestQueue = [];
        });
      } catch (error: any) {
        failedRequestQueue.forEach((request) => request.onFailure(error));
        failedRequestQueue = [];
      }

      isRefreshing = false;
    }
  }
  return new Promise((resolve, reject) => {
    failedRequestQueue.push({
      onSuccess: (token: string) => {
        originalConfig.headers["Authorization"] = `Bearer ${token}`;
        console.log(originalConfig);
        resolve(api(originalConfig));
      },
      onFailure: (error: AxiosError) => {
        reject(error);
      },
    });
  });
};
