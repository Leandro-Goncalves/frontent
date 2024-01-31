"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import { useUserAuthFormProps } from "../../useUserAuthForm";
import { Form } from "@/app/components/Form";

export interface useLoginContentProps {}

interface LoginContentProps {
  useUserAuthForm: useUserAuthFormProps;
  onForgotPassword: () => void;
  onRegister: () => void;
}

export function LoginContent({
  useUserAuthForm,
  onForgotPassword,
  onRegister,
}: LoginContentProps) {
  const { registerEmail, registerPassword, isLoading, handleLogin } =
    useUserAuthForm;

  const { push } = useRouter();

  return (
    <Form.Item>
      <div className="grid after:content-[' '] after:absolute after:top-0 after:h-[8px] after:w-[70%] after:left-[50%] after:bg-primary after:transform after:translate-x-[-50%] after:rounded">
        <div className="flex items-center gap-3 mb-4 flex-col">
          <h2 className="text-3xl font-bold text-primary">Login</h2>
          <h3 className="text-base font-medium text-[#221A3F] text-center">
            Entre na sua conta e veja os inumeros pijamas disponiveis e cupons
          </h3>
        </div>
        <form onSubmit={handleLogin()} className="grid gap-2">
          <div className="grid gap-1">
            <Input
              autoFocus
              id="email"
              placeholder="E-mail"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...registerEmail()}
              className="h-12"
            />
          </div>
          <div className="grid gap-1">
            <Input
              id="password"
              placeholder="Senha"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoading}
              {...registerPassword()}
              className="h-12"
            />
          </div>
          <button
            type="button"
            className="font-medium hover:underline hover:text-primary text-left mt-2"
            onClick={onForgotPassword}
          >
            Esqueceu sua senha?
          </button>
          <Button disabled={isLoading} type="submit" className="h-12 my-2">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Entrar
          </Button>
        </form>

        <div className="grid gap-1 mx-auto text-ali">
          <button
            className="font-medium hover:underline hover:text-primary text-left"
            disabled={isLoading}
            onClick={onRegister}
          >
            Registrar uma conta
          </button>
        </div>
      </div>
    </Form.Item>
  );
}
