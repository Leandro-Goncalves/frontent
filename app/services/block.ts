import { serviceAdapter } from "@utils/adapters/serviceAdapters";
import api from "./ofetchApi";
import { Block } from "../models/block";

type CreateBlockDto = Pick<Block, "name" | "description" | "link">;
type UpdateBlockDto = Partial<CreateBlockDto>;

const baseUrl = "block";

const getActive = async () => {
  return api.get<Block | {}>(`${baseUrl}/active`).then(serviceAdapter);
};

const getAll = async () => {
  return api.getAuth<Block[]>(baseUrl).then(serviceAdapter);
};

const create = async (createBlockDto: CreateBlockDto) => {
  return api.postAuth<Block[]>(baseUrl, createBlockDto).then(serviceAdapter);
};

const updatePosition = async (position: string[]) => {
  return api
    .patchAuth<Block[]>(`${baseUrl}/position`, { position })
    .then(serviceAdapter);
};

const updateStatus = async (guid: string, isActive: boolean) => {
  return api
    .patchAuth<Block[]>(`${baseUrl}/${guid}/active`, { isActive })
    .then(serviceAdapter);
};

const update = async (guid: string, updateBlockDto: UpdateBlockDto) => {
  return api
    .patchAuth<Block[]>(`${baseUrl}/${guid}`, updateBlockDto)
    .then(serviceAdapter);
};

const remove = async (guid: string) => {
  return api.deleteAuth<Block[]>(`${baseUrl}/${guid}`).then(serviceAdapter);
};

export const blockService = {
  getActive,
  getAll,
  create,
  update,
  remove,
  updatePosition,
  updateStatus,
};
