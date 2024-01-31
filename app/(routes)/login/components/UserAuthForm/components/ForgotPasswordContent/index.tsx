"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { useUserAuthFormProps } from "../../useUserAuthForm";
import { Form } from "@/app/components/Form";

export interface useForgotPasswordContentProps {}

interface ForgotPasswordContentProps {
  useUserAuthForm: useUserAuthFormProps;
  handleBack: () => void;
}

export function ForgotPasswordContent({
  useUserAuthForm,
  handleBack,
}: ForgotPasswordContentProps) {
  const { registerEmail, isLoading, handleResetPassword } = useUserAuthForm;

  return (
    <Form.Item>
      <div className="grid after:content-[' '] after:absolute after:top-0 after:h-[8px] after:w-[70%] after:left-[50%] after:bg-primary after:transform after:translate-x-[-50%] after:rounded">
        <div className="flex items-center gap-4 mb-4">
          <Button
            onClick={handleBack}
            size="icon"
            className="w-10 h-10 rounded-"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h2 className="text-lg">Recuperar Senha</h2>
        </div>
        <form onSubmit={handleResetPassword} className="grid gap-3">
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
            />
          </div>
          <Button disabled={isLoading} type="submit">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Criar Link de Recuperação
          </Button>
        </form>
      </div>
    </Form.Item>
  );
}
