"use client";

import React, { useCallback, useState } from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserEditForm } from "./useUserEditForm";
import { useRouter } from "next/navigation";
import { MotionProps, motion } from "framer-motion";
import FocusTrap from "focus-trap-react";
import { Form } from "@/app/components/Form";
import { ArrowLeftCircle } from "lucide-react";
import Image from "next/image";
import { User } from "@/app/models/user";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type UserEditFormProps = React.HTMLAttributes<HTMLDivElement> &
  MotionProps & {
    backToLogin: () => void;
    user: User;
  };

export function UserEditForm({
  className,
  backToLogin,
  user,
  ...props
}: UserEditFormProps) {
  const { register, handleRegister, isLoading, isEditingPassword, setValue } =
    useUserEditForm(backToLogin, user);

  return (
    <FocusTrap>
      <Form.Container
        className={cn("grid gap-6 min-w-[380px]", className)}
        {...props}
      >
        <Form.Item>
          <div className="grid after:content-[' '] after:absolute after:top-0 after:h-[8px] after:w-[70%] after:left-[50%] after:bg-primary after:transform after:translate-x-[-50%] after:rounded">
            <div className="flex items-center gap-3 mb-4 flex-col">
              <h2 className="text-3xl font-bold text-primary">Editar</h2>
              <h3 className="text-base font-medium text-foreground text-center">
                Editar Usuario
              </h3>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="grid gap-1 mb-3">
                    <Input
                      autoFocus
                      placeholder="E-mail"
                      disabled
                      value={user.email}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Não é permitido alterar o e-mail</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="editPassword"
                  onClick={() => {
                    setValue("isEditingPassword", !isEditingPassword);
                  }}
                />
                <label
                  htmlFor="editPassword"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70  cursor-pointer"
                >
                  Alterar senha
                </label>
              </div>
              <motion.div
                style={{ overflow: "hidden" }}
                initial={{
                  height: 0,
                }}
                animate={{
                  height: isEditingPassword ? "auto" : 0,
                }}
              >
                <div className="grid gap-1 mb-3">
                  <Input
                    id="password"
                    placeholder="Nova senha"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="current-password"
                    autoCorrect="off"
                    {...register("newPassword")}
                  />
                </div>
                <div className="grid gap-1">
                  <Input
                    id="confirmPassword"
                    placeholder="Confirme sua nova senha"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="confirm-password"
                    autoCorrect="off"
                    {...register("confirmNewPassword")}
                  />
                </div>
              </motion.div>

              <Button disabled={isLoading} type="submit">
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Salvar
              </Button>
            </form>
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
