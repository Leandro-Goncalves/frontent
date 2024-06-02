import { serviceAdapter } from "@utils/adapters/serviceAdapters";
import api from "./ofetchApi";
import { StoreCarousel, StoreCarouselPainel } from "../models/storeCarousel";

const getAll = async () => {
  return api
    .getAuth<StoreCarouselPainel[]>(`store-carousel/all`)
    .then(serviceAdapter);
};

const get = async () => {
  return api.get<StoreCarousel[]>(`store-carousel`).then(serviceAdapter);
};

const create = async (image: File, title: string) => {
  var bodyFormData = new FormData();

  bodyFormData.append("image", image);
  bodyFormData.append("title", title);

  return api
    .postAuth<StoreCarouselPainel[]>(`store-carousel`, bodyFormData)
    .then(serviceAdapter);
};

const update = async (guid: string, title: string, image?: File) => {
  var bodyFormData = new FormData();

  bodyFormData.append("title", title);
  if (image) bodyFormData.append("image", image);

  return api
    .patchAuth<StoreCarouselPainel[]>(`store-carousel/${guid}`, bodyFormData)
    .then(serviceAdapter);
};

const updateStatus = async (guid: string, isActive: boolean) => {
  return api
    .patchAuth<StoreCarouselPainel[]>(`store-carousel/${guid}/active`, {
      isActive,
    })
    .then(serviceAdapter);
};

const updatePosition = async (position: string[]) => {
  return api
    .patchAuth<StoreCarouselPainel[]>(`store-carousel/positions`, { position })
    .then(serviceAdapter);
};

const remove = async (guid: string) => {
  return api
    .deleteAuth<StoreCarouselPainel[]>(`store-carousel/${guid}`)
    .then(serviceAdapter);
};

export const storeCarouselService = {
  getAll,
  get,
  create,
  update,
  remove,
  updateStatus,
  updatePosition,
};
