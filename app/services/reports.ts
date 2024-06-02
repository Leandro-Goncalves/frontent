import { serviceAdapter } from "@utils/adapters/serviceAdapters";
import api from "./ofetchApi";
import { Products } from "../models/products";
import { Order } from "../models/orders";

export interface PaginationQueryDto {
  page: number;
  size: number;
}

export interface PaginationResponseDto<T> {
  hasMore: boolean;
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  results: T[];
}

export interface findSalesUser
  extends Pick<Order, "guid" | "total" | "updatedAt"> {
  freightValue: number;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement: string;
  userName: string;
  email: string;
}

export interface findSalesReturnDto
  extends PaginationResponseDto<findSalesUser> {}

const findSales = async (paginationQueryDto: PaginationQueryDto) => {
  return api
    .getAuth<findSalesReturnDto>(`reports/sales`, { query: paginationQueryDto })
    .then(serviceAdapter);
};

export const reportsService = {
  findSales,
};
