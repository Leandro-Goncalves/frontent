import env from "../env";
import { AuthInterceptor2 } from "./interceptors/authInterceptor";
import { FetchOptions, ofetch } from "ofetch";

const apiFetch = ofetch.create({
  baseURL: env.API_URL,
  onRequest: AuthInterceptor2,
});

type ApiOptions = Omit<FetchOptions<"json">, "method" | "body">;

const makeMethods = (route: string = "", op?: ApiOptions) => ({
  get: <T>(request: string, options?: ApiOptions) =>
    apiFetch<T>(`${route}${request}`, {
      ...op,
      ...options,
    }),
  post: <T>(request: string, body: any, options?: ApiOptions) =>
    apiFetch<T>(`${route}${request}`, {
      ...op,
      ...options,
      method: "POST",
      body,
    }),
  delete: <T>(request: string, options?: ApiOptions) =>
    apiFetch<T>(`${route}${request}`, {
      ...op,
      ...options,
      method: "DELETE",
    }),
  put: <T>(request: string, body: any, options?: ApiOptions) =>
    apiFetch<T>(`${route}${request}`, {
      ...op,
      ...options,
      method: "PUT",
      body,
    }),
  patch: <T>(request: string, body: any, options?: ApiOptions) =>
    apiFetch<T>(`${route}${request}`, {
      ...op,
      ...options,
      method: "PATCH",
      body,
    }),
  getAuth<T>(request: string, options?: ApiOptions) {
    return this.get<T>(request, {
      ...op,
      ...options,
      headers: {
        ...op?.headers,
        ...options?.headers,
        [AUTH_HEADER]: "true",
      },
    });
  },
  postAuth<T>(request: string, body: any, options?: ApiOptions) {
    return this.post<T>(request, body, {
      ...op,
      ...options,
      headers: {
        ...op?.headers,
        ...options?.headers,
        [AUTH_HEADER]: "true",
      },
    });
  },
  deleteAuth<T>(request: string, options?: ApiOptions) {
    return this.delete<T>(request, {
      ...op,
      ...options,
      headers: {
        ...op?.headers,
        ...options?.headers,
        [AUTH_HEADER]: "true",
      },
    });
  },
  putAuth<T>(request: string, body: any, options?: ApiOptions) {
    return this.put<T>(request, body, {
      ...op,
      ...options,
      headers: {
        ...op?.headers,
        ...options?.headers,
        [AUTH_HEADER]: "true",
      },
    });
  },
  patchAuth<T>(request: string, body: any, options?: ApiOptions) {
    return this.patch<T>(request, body, {
      ...op,
      ...options,
      headers: {
        ...op?.headers,
        ...options?.headers,
        [AUTH_HEADER]: "true",
      },
    });
  },
});

const apiRoute = {
  ...makeMethods(),
  route: (route: string, options?: ApiOptions) => makeMethods(route, options),
};

export const AUTH_HEADER = "useAuthHeader";

export default apiRoute;
