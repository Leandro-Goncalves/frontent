import { Category } from "@models/category";
import { serviceAdapter } from "@utils/adapters/serviceAdapters";
import api from "./api";

const gelAll = async (establishmentId: string) => {
  return api
    .get<Category[]>(`category/${establishmentId}`)
    .then(serviceAdapter);
};

export const categoryService = {
  gelAll,
};
