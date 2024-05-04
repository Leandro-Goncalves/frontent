export type cartEv = {
  addProduct: {
    name: string;
    price: number;
    quantity: number;
    variant: string;
    size?: string;
  };
};
