import { axiosAdapter } from "./axios";
import { ofetchAdapter } from "./ofetch";

export interface AdapterReturn<T, RAW = any> {
  data: T;
  status: number;
  headers: Record<string | number, string>;
  raw: RAW;
}

export const serviceAdapter = <T>(data: T) => ({
  data,
});
