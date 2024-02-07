import { Category } from "@models/category";
import { serviceAdapter } from "@utils/adapters/serviceAdapters";
import api from "./api";

const gelAll = async (establishmentId: string) => {
  return api
    .get<Category[]>(`category/${establishmentId}`)
    .then(serviceAdapter);
};

const gelAllAuthenticated = async () => {
  return api.getAuth<Category[]>(`category`).then(serviceAdapter);
};

const gelAllAuthenticatedAdmin = async () => {
  return api.getAuth<Category[]>(`category/admin`).then(serviceAdapter);
};

const create = async (name: string) => {
  return api
    .postAuth(`category`, {
      name,
    })
    .then(serviceAdapter);
};

const remove = async (categoryId: string) => {
  return api.deleteAuth(`category/${categoryId}`).then(serviceAdapter);
};

const edit = async (categoryId: string, name: string) => {
  return api.patchAuth(`category/${categoryId}`, { name }).then(serviceAdapter);
};

const link = async (guids: string[], categoryId: string) => {
  return api
    .postAuth(`category/link/${categoryId}`, { uuids: guids })
    .then(serviceAdapter);
};

const reorder = async (guids: string[]) => {
  return api.postAuth(`category/reorder`, { guids }).then(serviceAdapter);
};

export const categoryService = {
  gelAll,
  gelAllAuthenticatedAdmin,
  gelAllAuthenticated,
  create,
  remove,
  edit,
  link,
  reorder,
};
