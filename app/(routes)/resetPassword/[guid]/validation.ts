import z from "zod";

export const resetPasswordValidation = z
  .object({
    newPassword: z.string().trim().min(3),
    confirmNewPassword: z.string().trim().min(3),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords must match",
    path: ["confirmNewPassword"],
  });

export type ResetPasswordValidation = z.infer<typeof resetPasswordValidation>;
