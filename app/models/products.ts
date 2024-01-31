export interface ProductsSize {
  uuid: string;
  name: string;
  quantity: number;
}

export interface Variant {
  guid: string;
  name: string;
  price: number;
  promotionalPrice: number;
  size: ProductsSize[];
  Image: Image[];
}

export interface Products {
  uuid: string;
  name: string;
  description: string;
  isActive: boolean;
  variants: Variant[];
}
export interface Image {
  imageId: string;
}
