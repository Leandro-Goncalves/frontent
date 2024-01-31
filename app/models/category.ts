import { Products } from "./products";

export interface Category {
  uuid: string;
  name: string;
  Products: Products[];
}
