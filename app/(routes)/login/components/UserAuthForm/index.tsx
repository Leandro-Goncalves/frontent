"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { useUserAuthForm } from "./useUserAuthForm";
import { MotionProps } from "framer-motion";
import { LoginContent } from "./components/LoginContent";
import { ForgotPasswordContent } from "./components/ForgotPasswordContent";
import FocusTrap from "focus-trap-react";
import { Form } from "@/app/components/Form";
import { UserRegisterForm } from "@/app/(routes)/register/components/UserRegisterForm";
import Image from "next/image";

export type Disables = "forgotPassword" | "register";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement> &
  MotionProps & {
    onSuccess: () => void;
    disable?: Disables[];
  };

export function UserAuthForm({
  className,
  onSuccess,
  disable = [],
  ...props
}: UserAuthFormProps) {
  const [page, setPage] = useState("login");
  const useUserAuth = useUserAuthForm(setPage, onSuccess);

  const handleOpenForgotPassword = () => {
    setPage("forgotPassword");
  };

  const handleCloseForgotPassword = () => {
    setPage("login");
  };

  if (page === "register") {
    return (
      <UserRegisterForm
        className="p-12 pb-4 rounded-lg"
        backToLogin={() => setPage("login")}
      />
    );
  }

  return (
    <FocusTrap>
      <Form.Container
        className={cn("grid gap-6 min-w-[380px]", className)}
        {...props}
      >
        {page === "forgotPassword" && (
          <ForgotPasswordContent
            key="forgotPassword"
            useUserAuthForm={useUserAuth}
            handleBack={handleCloseForgotPassword}
          />
        )}

        {page === "login" && (
          <LoginContent
            key="login"
            disable={disable}
            useUserAuthForm={useUserAuth}
            onForgotPassword={handleOpenForgotPassword}
            onRegister={() => setPage("register")}
          />
        )}
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
