import z from "zod";

export const AddProductValidation = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),

  description: z
    .string()
    .trim()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),

  variants: z.array(
    z
      .object({
        isFavorite: z.boolean().optional(),
        name: z.string().trim().min(3, {
          message: "O nome deve ter pelo menos 3 caracteres",
        }),
        price: z
          .number({ required_error: "O preço é obrigatório" })
          .min(1, { message: "O preço deve ser maior que 0" }),
        promotionalPrice: z.number().nullable().optional(),
        sizes: z.array(
          z.object({
            sizeGuid: z.string(),
            quantity: z.number().optional(),
          })
        ),
        images: z.object({
          0: z.any(),
          1: z.any(),
          2: z.any(),
          3: z.any(),
        }),
      })
      .refine((data) => data.price >= (data.promotionalPrice ?? 0), {
        path: ["promotionalPrice"],
        message: "O preço promocional deve ser menor ao preço normal",
      })
  ),
});
