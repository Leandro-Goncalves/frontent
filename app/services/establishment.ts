import { serviceAdapter } from "@utils/adapters/serviceAdapters";
import api from "./api";
import { Establishment } from "../models/establishment";

interface EstablishmentUpdateDto {
  alert?: string;
  icon?: File;
  themeGuid?: string;
}

const get = async (establishmentId: string) => {
  return api
    .get<Establishment>(`establishment/${establishmentId}`)
    .then(serviceAdapter);
};

const update = async (
  establishmentId: string,
  { alert, icon, themeGuid }: EstablishmentUpdateDto
) => {
  var bodyFormData = new FormData();

  if (alert) bodyFormData.append("alert", alert);
  if (icon) bodyFormData.append("icon", icon);
  if (themeGuid) bodyFormData.append("themeGuid", themeGuid);

  return api
    .patchAuth<Establishment>(`establishment/${establishmentId}`, bodyFormData)
    .then(serviceAdapter);
};

export const establishmentService = {
  get,
  update,
};
