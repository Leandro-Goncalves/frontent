import { serviceAdapter } from "@utils/adapters/serviceAdapters";
import api from "./api";
import { SearchFreightDto } from "../models/freight";

const calculate = async (data: SearchFreightDto) => {
  return api.post<any>(`freight`, data).then(serviceAdapter);
};

export const freightService = {
  calculate,
};
