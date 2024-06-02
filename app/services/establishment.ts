import { serviceAdapter } from "@utils/adapters/serviceAdapters";
import api from "./ofetchApi";
import { Establishment } from "../models/establishment";

interface EstablishmentUpdateDto {
  alert?: string;
  icon?: File;
  themeGuid?: string;
  installments?: number;
}

interface EstablishmentUpdateStoryDto {
  storyText?: string;
  storyImage?: File;
}

const establishmentRoute = api.route("establishment/");

const get = async (establishmentId: string) => {
  return establishmentRoute
    .get<Establishment>(establishmentId)
    .then(serviceAdapter);
};

const update = async (
  establishmentId: string,
  { alert, icon, themeGuid, installments }: EstablishmentUpdateDto
) => {
  var bodyFormData = new FormData();

  if (alert) bodyFormData.append("alert", alert);
  if (icon) bodyFormData.append("icon", icon);
  if (themeGuid) bodyFormData.append("themeGuid", themeGuid);
  if (installments) bodyFormData.append("installments", String(installments));

  return establishmentRoute
    .patchAuth<Establishment>(establishmentId, bodyFormData)
    .then(serviceAdapter);
};

const updateStory = async (
  establishmentId: string,
  { storyImage, storyText }: EstablishmentUpdateStoryDto
) => {
  var bodyFormData = new FormData();

  if (storyImage) bodyFormData.append("storyImage", storyImage);
  if (storyText) bodyFormData.append("storyText", storyText);

  return establishmentRoute
    .patchAuth<Establishment>(`${establishmentId}/story`, bodyFormData)
    .then(serviceAdapter);
};

export const establishmentService = {
  get,
  update,
  updateStory,
};
