import { serviceAdapter } from "@utils/adapters/serviceAdapters";
import api from "./ofetchApi";
import { Order } from "../models/orders";

export interface Address {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  number: string;
  state: string;
  complement: string | null;
}

interface GeneratePaymentLinkDTO {
  to: Address;
  freightId: string;
  couponCode?: string;
  items: Array<{
    quantity: number;
    productGuid: string;
    variantGuid: string;
    sizeGuid: string;
  }>;
}

interface GeneratePaymentTakeoutLinkDTO {
  couponCode?: string;
  items: Array<{
    quantity: number;
    productGuid: string;
    variantGuid: string;
    sizeGuid: string;
  }>;
}

const getOrders = async () => {
  return api.getAuth<Order[]>(`checkout/orders`).then(serviceAdapter);
};

export interface getAllOrdersReturn {
  delivery: Order[];
  takeout: Order[];
  cancelled: Order[];
  finished: Order[];
}

const getAllOrders = async () => {
  return api
    .getAuth<getAllOrdersReturn>(`checkout/orders/all`)
    .then(serviceAdapter);
};

const getAllTakeoutOrders = async () => {
  return api
    .getAuth<Order[]>(`checkout/orders/takeout/all`)
    .then(serviceAdapter);
};

const generatePaymentLink = async (data: GeneratePaymentLinkDTO) => {
  return api.postAuth<any>(`checkout`, data).then(serviceAdapter);
};

const generateTakeoutPaymentLink = async (
  data: GeneratePaymentTakeoutLinkDTO
) => {
  return api.postAuth<any>(`checkout/takeout`, data).then(serviceAdapter);
};

const cancelOrder = async (orderId: string) => {
  return api
    .getAuth<any>(`checkout/orders/cancel/${orderId}`)
    .then(serviceAdapter);
};

const finishedOrder = async (orderId: string) => {
  return api
    .getAuth<any>(`checkout/orders/finished/${orderId}`)
    .then(serviceAdapter);
};

export const checkoutService = {
  getOrders,
  generatePaymentLink,
  generateTakeoutPaymentLink,
  getAllOrders,
  getAllTakeoutOrders,
  cancelOrder,
  finishedOrder,
};
