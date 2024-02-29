import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import env from "../env";
import { AuthInterceptor } from "./interceptors/authInterceptor";
import MockAdapter from "axios-mock-adapter";
import establishmentHandler from "../mock/api/establishment/[guid]";
import carouselHandler from "../mock/api/carousel/[guid]";
import categoryHandler from "../mock/api/category/[guid]";
import SearchHandler from "../mock/api/products/search";
import productHandler from "../mock/api/products/[establishmentGuid]/[guid]";
import { ErrorInterceptor } from "./interceptors/errorInterceptor";

type axiosFunction = <T = any, R = AxiosResponse<T, any>, D = any>(
  url: string,
  config?: AxiosRequestConfig<D> | undefined
) => Promise<R>;

type axiosFunctionData = <T = any, R = AxiosResponse<T, any>, D = any>(
  url: string,
  data?: D | undefined,
  config?: AxiosRequestConfig<D> | undefined
) => Promise<R>;

interface AxiosInstanceExtended extends AxiosInstance {
  getAuth: axiosFunction;
  deleteAuth: axiosFunction;
  postAuth: axiosFunctionData;
  putAuth: axiosFunctionData;
  patchAuth: axiosFunctionData;
}

const api = axios.create({
  baseURL: env.API_URL,
}) as AxiosInstanceExtended;

api.interceptors.request.use(AuthInterceptor);

export const AUTH_HEADER = "useAuthHeader";

api["getAuth"] = async (url, config) => {
  return api.get(url, {
    ...config,
    headers: { ...config?.headers, [AUTH_HEADER]: true },
  });
};

api["deleteAuth"] = async (url, config) => {
  return api.delete(url, {
    ...config,
    headers: { ...config?.headers, [AUTH_HEADER]: true },
  });
};

api["postAuth"] = async (url, data, config) => {
  return api.post(url, data, {
    ...config,
    headers: { ...config?.headers, [AUTH_HEADER]: true },
  });
};

api["putAuth"] = async (url, data, config) => {
  return api.put(url, data, {
    ...config,
    headers: { ...config?.headers, [AUTH_HEADER]: true },
  });
};

api["patchAuth"] = async (url, data, config) => {
  return api.patch(url, data, {
    ...config,
    headers: { ...config?.headers, [AUTH_HEADER]: true },
  });
};

export default api;
