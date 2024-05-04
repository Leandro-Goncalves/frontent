import { serviceAdapter } from "@utils/adapters/serviceAdapters";
import api from "./api";
import { Doubts } from "../models/doubts";

const getAll = async () => {
  return api.get<Doubts[]>(`doubts`).then(serviceAdapter);
};

const create = async (question: string, answer: string) => {
  return api
    .postAuth<Doubts[]>(`doubts`, {
      question,
      answer,
    })
    .then(serviceAdapter);
};

const updatePosition = async (position: string[]) => {
  return api
    .patchAuth<Doubts[]>(`doubts/position`, { position })
    .then(serviceAdapter);
};

const update = async (guid: string, question?: string, answer?: string) => {
  return api
    .patchAuth<Doubts[]>(`doubts/${guid}`, {
      question,
      answer,
    })
    .then(serviceAdapter);
};

const remove = async (guid: string) => {
  return api.deleteAuth<Doubts[]>(`doubts/${guid}`).then(serviceAdapter);
};

export const doubtsService = {
  getAll,
  create,
  update,
  remove,
  updatePosition,
};
