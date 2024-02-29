import { CupomType, DiscountType } from "@/app/models/cupom";
import { z } from "zod";

export const cupomValidation = z
  .object({
    code: z
      .string({
        required_error: "O código é obrigatório",
      })
      .min(3, "O código deve ter pelo menos 3 caracteres."),
    cupomType: z.enum(
      [CupomType.GENERAL, CupomType.UNIQUE, CupomType.FIRST],
      {}
    ),
    discountType: z.enum([DiscountType.PERCENTAGE, DiscountType.AMOUNT], {}),
    minimumValue: z.number({}).optional(),
    maxDiscount: z.number({}).optional(),
    initialDate: z.date({}).optional(),
    finalDate: z.date({}).optional(),
    quantity: z.any({}),
    isUnlimited: z.boolean({}).optional(),
    discountValue: z
      .number({
        required_error: "O valor é obrigatório",
      })
      .min(1, "O valor deve ser maior que 0."),
  })
  .refine(
    ({ quantity, isUnlimited }) => {
      if (isUnlimited) return true;
      return quantity > 0;
    },
    {
      message: "A quantidade deve ser maior que 0.",
      path: ["quantity"],
    }
  );

export type CupomValidation = z.infer<typeof cupomValidation>;
