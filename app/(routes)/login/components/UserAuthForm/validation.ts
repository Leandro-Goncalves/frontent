import z from "zod";

export const userValidation = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .trim()
    .min(3, { message: "A senha deve ter pelo menos 3 caracteres" }),
});

export type UserValidation = z.infer<typeof userValidation>;

export const resetPasswordValidation = z.object({
  email: z.string().email(),
});

export type ResetPasswordValidation = z.infer<typeof resetPasswordValidation>;
