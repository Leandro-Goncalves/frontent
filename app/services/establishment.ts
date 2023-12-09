import { serviceAdapter } from "@utils/adapters/serviceAdapters";
import api from "./api";
import { Establishment } from "../models/establishment";

const get = async (establishmentId: string) => {
  return api
    .get<Establishment>(`establishment/${establishmentId}`)
    .then(serviceAdapter);
};

export const establishmentService = {
  get,
};
