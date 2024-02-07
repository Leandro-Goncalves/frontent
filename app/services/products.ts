import { serviceAdapter } from "@utils/adapters/serviceAdapters";
import api from "./api";
import { Products } from "../models/products";
import { ProductModelWithoutImage } from "../(routes)/painel/components/CategoryItem/components/ProductDialog";

const gelAll = async (establishmentId: string) => {
  return api
    .get<Products[]>(`products/${establishmentId}`)
    .then(serviceAdapter);
};

const getOne = async (establishmentId: string, productId: string) => {
  return api
    .get<Products>(`products/${establishmentId}/${productId}`)
    .then(serviceAdapter);
};

const deleteProduct = async (productId: string) => {
  return api.deleteAuth<Products>(`products/${productId}`).then(serviceAdapter);
};

const changeIsActive = async (productId: string, isActive: boolean) => {
  return api
    .patchAuth<Products>(`products/${productId}/isActive`, {
      isActive,
    })
    .then(serviceAdapter);
};

const create = async (product: ProductModelWithoutImage) => {
  return api.postAuth<Products>(`products`, product).then(serviceAdapter);
};

const search = async (query: string, category: string) => {
  return api
    .get<Products[]>(`products/search`, {
      params: { q: query, c: category },
    })
    .then(serviceAdapter);
};

const updateImage = async (variantId: string, imageArray: File[]) => {
  var bodyFormData = new FormData();

  imageArray.forEach((image) => {
    bodyFormData.append("images", image);
  });
  return api
    .postAuth(`products/${variantId}/image`, bodyFormData)
    .then(serviceAdapter);
};

const remove = async (productId: string) => {
  return api.deleteAuth(`products/${productId}`).then(serviceAdapter);
};

const update = async (productId: string, product: ProductModelWithoutImage) => {
  return api.patchAuth(`products/${productId}`, product).then(serviceAdapter);
};

export const productService = {
  gelAll,
  create,
  getOne,
  search,
  updateImage,
  remove,
  update,
  changeIsActive,
};
