import { cpf } from "cpf-cnpj-validator";
import z from "zod";

export const selectAddressValidation = z.object({
  street: z.string().min(1, { message: "A rua deve ser informada" }),
  neighborhood: z.string().min(1, { message: "O bairro deve ser informado" }),
  city: z.string().min(1, { message: "A cidade deve ser informada" }),
  number: z
    .string()
    .min(1, { message: "O número deve ter pelo menos 1 caractere" }),
  complement: z.string().nullable(),
  state: z.string().min(1, { message: "O estado deve ser informado" }),
  cpf: z
    .string({ required_error: "O CPF deve ser informado" })
    .refine((v) => cpf.format(v), {
      message: "CPF inválido",
    }),
});

export const takeoutValidation = z.object({
  cpf: z
    .string({ required_error: "O CPF deve ser informado" })
    .refine((v) => cpf.isValid(v), {
      message: "CPF inválido",
    }),
});

export type SelectAddressValidation = z.infer<typeof selectAddressValidation>;
