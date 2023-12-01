import { axiosAdapter } from "./axios";

export interface AdapterReturn<T, RAW = any> {
  data: T;
  status: number;
  headers: Record<string | number, string>;
  raw: RAW;
}

export const serviceAdapter = axiosAdapter;
