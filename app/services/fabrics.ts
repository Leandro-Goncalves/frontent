import { serviceAdapter } from "@utils/adapters/serviceAdapters";
import api from "./ofetchApi";
import { Fabrics, FabricsPanel } from "../models/fabrics";

const getAll = async () => {
  return api.getAuth<FabricsPanel[]>(`fabrics/all`).then(serviceAdapter);
};

const get = async () => {
  return api.get<Fabrics[]>(`fabrics`).then(serviceAdapter);
};

const create = async (image: File, name: string, description: string) => {
  var bodyFormData = new FormData();

  bodyFormData.append("image", image);
  bodyFormData.append("name", name);
  bodyFormData.append("description", description);

  return api
    .postAuth<FabricsPanel[]>(`fabrics`, bodyFormData)
    .then(serviceAdapter);
};

const update = async (
  guid: string,
  name: string,
  description: string,
  image?: File
) => {
  var bodyFormData = new FormData();

  bodyFormData.append("name", name);
  if (image) bodyFormData.append("image", image);
  if (description) bodyFormData.append("description", description);

  return api
    .patchAuth<FabricsPanel[]>(`fabrics/${guid}`, bodyFormData)
    .then(serviceAdapter);
};

const updateStatus = async (guid: string, isActive: boolean) => {
  return api
    .patchAuth<FabricsPanel[]>(`fabrics/${guid}/active`, { isActive })
    .then(serviceAdapter);
};

const updatePosition = async (position: string[]) => {
  return api
    .patchAuth<FabricsPanel[]>(`fabrics/position`, { position })
    .then(serviceAdapter);
};

const remove = async (guid: string) => {
  return api.deleteAuth<FabricsPanel[]>(`fabrics/${guid}`).then(serviceAdapter);
};

export const fabricsService = {
  getAll,
  get,
  create,
  update,
  remove,
  updateStatus,
  updatePosition,
};
