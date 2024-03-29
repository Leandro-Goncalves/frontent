import z from "zod";
import { cpf } from "cpf-cnpj-validator";

export const registerValidation = z
  .object({
    email: z.string().email({ message: "Email inválido" }),
    phone: z.string().min(10, { message: "Número inválido" }),
    name: z
      .string()
      .trim()
      .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
    password: z
      .string()
      .trim()
      .min(3, { message: "A senha deve ter pelo menos 3 caracteres" }),
    confirmPassword: z
      .string()
      .trim()
      .min(3, { message: "A senha deve ter pelo menos 3 caracteres" }),
    cpf: z
      .string({
        required_error: "CPF obrigatório",
      })
      .refine((v) => cpf.isValid(v), {
        message: "CPF inválido",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais",
    path: ["confirmPassword"],
  });

export type RegisterValidation = z.infer<typeof registerValidation>;
