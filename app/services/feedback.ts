import { serviceAdapter } from "@utils/adapters/serviceAdapters";
import api from "./ofetchApi";
import { Feedback } from "../models/feedback";

const getAll = async (guid: string) => {
  return api.getAuth<Feedback[]>(`feedbacks/${guid}/all`).then(serviceAdapter);
};

const get = async (guid: string) => {
  return api.get<Feedback[]>(`feedbacks/${guid}/all`).then(serviceAdapter);
};

const create = async (image: File, name: string) => {
  var bodyFormData = new FormData();

  bodyFormData.append("image", image);
  bodyFormData.append("name", name);

  return api
    .postAuth<Feedback[]>(`feedbacks`, bodyFormData)
    .then(serviceAdapter);
};

const update = async (guid: string, name: string, image?: File) => {
  var bodyFormData = new FormData();

  bodyFormData.append("name", name);
  if (image) bodyFormData.append("image", image);

  return api
    .patchAuth<Feedback[]>(`feedbacks/${guid}`, bodyFormData)
    .then(serviceAdapter);
};

const updateStatus = async (guid: string, isActive: boolean) => {
  return api
    .patchAuth<Feedback[]>(`feedbacks/${guid}/active`, { isActive })
    .then(serviceAdapter);
};

const updatePosition = async (position: string[]) => {
  return api
    .patchAuth<Feedback[]>(`feedbacks/positions`, { position })
    .then(serviceAdapter);
};

const remove = async (guid: string) => {
  return api.deleteAuth<Feedback[]>(`feedbacks/${guid}`).then(serviceAdapter);
};

export const feedbackService = {
  getAll,
  get,
  create,
  update,
  remove,
  updateStatus,
  updatePosition,
};
