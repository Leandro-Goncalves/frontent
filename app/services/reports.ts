import { serviceAdapter } from "@utils/adapters/serviceAdapters";
import api from "./ofetchApi";
import { Order, ProductOrder } from "../models/orders";

export interface PaginationQueryDto {
  page: number;
  size: number;
  startDate?: String;
  endDate?: String;
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
  products: ProductOrder[];
}

export interface findSalesReturnDto
  extends PaginationResponseDto<findSalesUser> {}

export interface findUsers {
  uuid: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  orders: Order[];
  OrderTakeout: Order[];
}

export interface findUsersReturnDto extends PaginationResponseDto<findUsers> {}

const findSales = async (paginationQueryDto: PaginationQueryDto) => {
  return api
    .getAuth<findSalesReturnDto>(`reports/sales`, { query: paginationQueryDto })
    .then(serviceAdapter);
};

const findUsers = async (paginationQueryDto: PaginationQueryDto) => {
  return api
    .getAuth<findUsersReturnDto>(`reports/users`, { query: paginationQueryDto })
    .then(serviceAdapter);
};

export const reportsService = {
  findSales,
  findUsers,
};
