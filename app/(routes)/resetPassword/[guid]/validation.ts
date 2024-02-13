import z from "zod";

export const resetPasswordValidation = z
  .object({
    newPassword: z
      .string()
      .trim()
      .min(3, { message: "mínimo de 3 caracteres" }),
    confirmNewPassword: z
      .string()
      .trim()
      .min(3, { message: "mínimo de 3 caracteres" }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "as senhas não são iguais",
    path: ["confirmNewPassword"],
  });

export type ResetPasswordValidation = z.infer<typeof resetPasswordValidation>;
