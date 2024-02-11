"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserRegisterForm } from "./useUserRegisterForm";
import { useRouter } from "next/navigation";
import { MotionProps, motion } from "framer-motion";
import FocusTrap from "focus-trap-react";
import { Form } from "@/app/components/Form";
import { ArrowLeftCircle } from "lucide-react";
import Image from "next/image";
import { PatternFormat } from "react-number-format";

type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement> &
  MotionProps & {
    backToLogin: () => void;
  };

export function UserRegisterForm({
  className,
  backToLogin,
  ...props
}: UserRegisterFormProps) {
  const { form, register, handleRegister, isLoading } =
    useUserRegisterForm(backToLogin);

  const phone = form.watch("phone");

  return (
    <FocusTrap>
      <Form.Container
        className={cn("grid gap-6 min-w-[380px]", className)}
        {...props}
      >
        <Form.Item>
          <div className="grid after:content-[' '] after:absolute after:top-0 after:h-[8px] after:w-[70%] after:left-[50%] after:bg-primary after:transform after:translate-x-[-50%] after:rounded">
            <div className="flex items-center gap-3 mb-4 flex-col">
              <h2 className="text-3xl font-bold text-primary">Registrar</h2>
              <h3 className="text-base font-medium text-[#221A3F] text-center">
                Registre-se e fique por dentro das novidades todos os dias
              </h3>
            </div>
            <form onSubmit={handleRegister()} className="grid gap-3">
              <div className="grid gap-1">
                <Input
                  autoFocus
                  id="name"
                  placeholder="Nome"
                  type="name"
                  autoCapitalize="none"
                  autoComplete="name"
                  autoCorrect="off"
                  {...register("name")}
                />
              </div>
              <div className="grid gap-1">
                <Input
                  id="email"
                  placeholder="E-mail"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  {...register("email")}
                />
              </div>
              <div className="grid gap-1">
                <PatternFormat
                  className="w-full"
                  format="(##) #####-####"
                  allowEmptyFormatting
                  mask="_"
                  customInput={Input}
                  value={phone}
                  onValueChange={(e) => form.setValue("phone", e.value)}
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
                  {...register("password")}
                />
              </div>
              <div className="grid gap-1">
                <Input
                  id="confirmPassword"
                  placeholder="Confirme sua senha"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="confirm-password"
                  autoCorrect="off"
                  {...register("confirmPassword")}
                />
              </div>
              <Button disabled={isLoading} type="submit">
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Registrar
              </Button>
            </form>
            <div className="grid gap-1 mx-auto text-ali">
              <Button
                disabled={isLoading}
                onClick={backToLogin}
                className="h-12"
                variant={"link"}
              >
                <ArrowLeftCircle className="mr-2 h-4 w-4" />
                Voltar ao login
              </Button>
            </div>
          </div>
        </Form.Item>
        <Image
          style={{ margin: "0 auto" }}
          src={"/logo.png"}
          alt="Logo escrita Cacau"
          width={80}
          height={44}
        />
      </Form.Container>
    </FocusTrap>
  );
}
