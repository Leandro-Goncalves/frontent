import { serviceAdapter } from "@utils/adapters/serviceAdapters";
import api from "./api";

const gelAll = async (establishmentId: string) => {
  return api.get<string[]>(`carousel/${establishmentId}`).then(serviceAdapter);
};

export const carouselService = {
  gelAll,
};
