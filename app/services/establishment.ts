import { serviceAdapter } from "@utils/adapters/serviceAdapters";
import api from "./ofetchApi";
import { Establishment } from "../models/establishment";

interface EstablishmentUpdateDto {
  alert?: string;
  icon?: File;
  themeGuid?: string;
}

const establishmentRoute = api.route("establishment/");

const get = async (establishmentId: string) => {
  return establishmentRoute
    .get<Establishment>(establishmentId)
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

  return establishmentRoute
    .patchAuth<Establishment>(establishmentId, bodyFormData)
    .then(serviceAdapter);
};

export const establishmentService = {
  get,
  update,
};
