export interface ProductsSize {
  uuid: string;
  name: string;
}

export interface Products {
  uuid: string;
  name: string;
  description: string;
  value: number;
  price: number;
  quantity: number;
  isActive: boolean;
  sizes: ProductsSize[];
}

export interface ProductsImage extends Products {
  Image: Image[];
}

export interface Image {
  imageId: string;
}
