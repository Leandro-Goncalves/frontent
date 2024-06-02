import { Variant } from "./products";

export enum OrderStatus {
  pending = "pending",
  success = "success",
  cancelled = "cancelled",
  finished = "finished",
  expired = "expired",
}

interface ProductOrder {
  id: string;
  title: string;
  description: string;
  quantity: number;
  unit_price: number;
  variant: Omit<Variant, "Image">;
  sizeGuid: string;
}

export interface Order {
  guid: string;
  products: ProductOrder[];
  total: number;
  status: OrderStatus;
  paymentLink: string;
  userId: string;
  tracking?: string;
  createdAt: Date;
  updatedAt: Date;
}
