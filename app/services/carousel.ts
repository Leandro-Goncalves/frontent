import { serviceAdapter } from "@utils/adapters/serviceAdapters";
import api from "./api";
import { Carousel, CarouselPainel } from "../models/carousel";

const getAll = async (establishmentId: string) => {
  return api
    .getAuth<CarouselPainel[]>(`carousel/${establishmentId}/all`)
    .then(serviceAdapter);
};

const get = async (establishmentId: string) => {
  return api
    .get<Carousel[]>(`carousel/${establishmentId}`)
    .then(serviceAdapter);
};

const create = async (image: File, name: string, link?: string) => {
  var bodyFormData = new FormData();

  bodyFormData.append("image", image);
  bodyFormData.append("name", name);
  if (link) bodyFormData.append("link", link);

  return api
    .postAuth<CarouselPainel[]>(`carousel`, bodyFormData)
    .then(serviceAdapter);
};

const update = async (
  guid: string,
  name: string,
  image?: File,
  link?: string
) => {
  var bodyFormData = new FormData();

  bodyFormData.append("name", name);
  if (image) bodyFormData.append("image", image);
  if (link) bodyFormData.append("link", link);

  return api
    .patchAuth<CarouselPainel[]>(`carousel/${guid}`, bodyFormData)
    .then(serviceAdapter);
};

const updateStatus = async (guid: string, isActive: boolean) => {
  return api
    .patchAuth<CarouselPainel[]>(`carousel/${guid}/active`, { isActive })
    .then(serviceAdapter);
};

const updatePosition = async (position: string[]) => {
  return api
    .patchAuth<CarouselPainel[]>(`carousel/positions`, { position })
    .then(serviceAdapter);
};

const remove = async (guid: string) => {
  return api
    .deleteAuth<CarouselPainel[]>(`carousel/${guid}`)
    .then(serviceAdapter);
};

export const carouselService = {
  getAll,
  get,
  create,
  update,
  remove,
  updateStatus,
  updatePosition,
};
