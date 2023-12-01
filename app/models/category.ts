import { ProductsImage } from "./products";

export interface Category {
  uuid: string;
  name: string;
  Products: Omit<ProductsImage, "description">[];
}
