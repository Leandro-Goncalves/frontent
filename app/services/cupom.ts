import { serviceAdapter } from "@utils/adapters/serviceAdapters";
import api from "./ofetchApi";
import { Cupom } from "../models/cupom";

const create = async (coupon: Omit<Cupom, "guid" | "isActive">) => {
  return api.postAuth<Cupom>(`coupon`, coupon).then(serviceAdapter);
};

const listAll = async () => {
  return api.getAuth<Cupom[]>(`coupon`).then(serviceAdapter);
};

const update = async (couponGuid: string, coupon: Partial<Cupom>) => {
  return api.patchAuth(`coupon/${couponGuid}`, coupon).then(serviceAdapter);
};

const updateActive = async (
  couponGuid: string,
  coupon: Pick<Cupom, "isActive">
) => {
  return api
    .patchAuth(`coupon/${couponGuid}/active`, coupon)
    .then(serviceAdapter);
};

const get = async (couponCode: string) => {
  return api.get<Cupom>(`coupon/${couponCode}`).then(serviceAdapter);
};

const remove = async (couponGuid: string) => {
  return api.deleteAuth(`coupon/${couponGuid}`).then(serviceAdapter);
};

export const couponService = {
  create,
  listAll,
  update,
  updateActive,
  remove,
  get,
};
