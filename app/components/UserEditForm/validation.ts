import z from "zod";

export const editValidation = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
    isEditingPassword: z.boolean(),
    newPassword: z.string().trim(),
    confirmNewPassword: z.string().trim(),
  })
  .superRefine((data, ctx) => {
    if (data.isEditingPassword) {
      if (data.newPassword.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "A nova senha deve ter pelo menos 3 caracteres",
          path: ["newPassword"],
        });
      }

      if (data.confirmNewPassword.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "A confirmação da nova senha deve ter pelo menos 3 caracteres",
          path: ["confirmNewPassword"],
        });
      }

      if (data.newPassword !== data.confirmNewPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "As senhas precisam ser iguais",
          path: ["confirmNewPassword"],
        });
      }
    }
  });

export type EditValidation = z.infer<typeof editValidation>;
