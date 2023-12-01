import { Category } from "@models/category";
import { serviceAdapter } from "@utils/adapters/serviceAdapters";
import api from "./api";
import { Products, ProductsImage } from "../models/products";
import { CreateProductValidation } from "../(routes)/painel/product/components/CreateProduct/hooks/validation";

const gelAll = async (establishmentId: string) => {
  return api
    .get<ProductsImage[]>(`products/${establishmentId}`)
    .then(serviceAdapter);
};

const getOne = async (establishmentId: string, productId: string) => {
  return api
    .get<ProductsImage>(`products/${establishmentId}/${productId}`)
    .then(serviceAdapter);
};

const deleteProduct = async (productId: string) => {
  return api
    .deleteAuth<ProductsImage>(`products/${productId}`)
    .then(serviceAdapter);
};

const changeIsActive = async (productId: string, isActive: boolean) => {
  return api
    .patchAuth<ProductsImage>(`products/${productId}`, {
      isActive,
    })
    .then(serviceAdapter);
};

const create = async (product: CreateProductValidation) => {
  return api.postAuth<Products>(`products`, product).then(serviceAdapter);
};

const search = async (query: string, category: string) => {
  return api
    .get<ProductsImage[]>(`products/search?q=${query}&c=${category}`)
    .then(serviceAdapter);
};

export const productService = {
  gelAll,
  create,
  getOne,
  search,
};
