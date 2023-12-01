import z from "zod";

export const createProductValidation = z.object({
  name: z.string().min(3, {
    message: "O nome precisa ter pelo menos 3 caracteres",
  }),
  description: z.string().min(3, {
    message: "A descrição precisa ter pelo menos 3 caracteres",
  }),
  price: z.number().min(1, {
    message: "O valor precisa ser maior que 1",
  }),
  quantity: z.number().min(1, {
    message: "O valor precisa ser maior que 1",
  }),
});

export type CreateProductValidation = z.infer<typeof createProductValidation>;
