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
    initialDate: z.any({}).optional(),
    finalDate: z.any({}).optional(),
    quantity: z.any({}),
    isUnlimited: z.boolean({}).optional(),
    discountValue: z
      .number({
        required_error: "O valor é obrigatório",
      })
      .min(1, "O valor deve ser maior que 0."),
  })
  .superRefine(({ quantity, isUnlimited }, ctx) => {
    console.log({ quantity, isUnlimited });
    if (isUnlimited) return;
    if (quantity < 1) {
      ctx.addIssue({
        message: "A quantidade deve ser maior que 0.",
        code: "custom",
        path: ["quantity"],
      });
    }
  });

export type CupomValidation = z.infer<typeof cupomValidation>;
