export enum CupomType {
  GENERAL = "GENERAL",
  UNIQUE = "UNIQUE",
  FIRST = "FIRST",
}

export enum DiscountType {
  PERCENTAGE = "PERCENTAGE",
  AMOUNT = "AMOUNT",
}

export interface Cupom {
  guid: string;
  code: string;
  cupomType: CupomType;
  discountType: DiscountType;
  discountValue: number;
  isActive: boolean;
  finalDate?: Date;
  initialDate?: Date;
  maxDiscount?: number;
  minimumValue?: number;
  quantity: number;
  isUnlimited?: boolean;
}
