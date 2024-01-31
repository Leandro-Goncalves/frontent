import z from "zod";

export const addUserValidation = z.object({
  name: z.string(),
});

export type AddUserValidation = z.infer<typeof addUserValidation>;
