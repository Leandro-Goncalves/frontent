"use client";

import { useEffect, useState } from "react";
import { useCookies } from "@/app/utils/hooks/useCookies";
import { decodeToken, useJwt } from "react-jwt";
import { UserAuthForm } from "@/app/(routes)/login/components/UserAuthForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "react-toastify";

interface TokenVerifyProps {}

export const TokenVerify: React.FC<TokenVerifyProps> = () => {
  const { getCookie } = useCookies();
  const token = JSON.parse(getCookie("user") || "{}")?.state?.user?.token;

  const [isOpen, setIsOpen] = useState(false);

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const ValidateUser = (): boolean => {
    if (!token) {
      handleOpenDialog();
      toast.error("Você precisa estar logado para acessar esta página");
      return false;
    }
    const decodedToken = decodeToken<{ role: string[] }>(token);
    if (!decodedToken) {
      toast.error("Você precisa estar logado para acessar esta página");
      handleOpenDialog();
      return false;
    }

    if (!decodedToken.role.includes("admin")) {
      toast.error("O usuário não tem permissão para acessar esta página");
      handleOpenDialog();
      return false;
    }

    return true;
  };

  useEffect(() => {
    ValidateUser();
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isOpen)
    return (
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (open === false) {
            setTimeout(() => {
              const isValid = ValidateUser();
              if (isValid) {
                window.location.reload();
              }
            }, 100);
          }
          setIsOpen(open);
        }}
      >
        <DialogContent>
          <UserAuthForm
            className="p-12 rounded-lg pb-4"
            onSuccess={handleCloseDialog}
            disable={["register", "forgotPassword"]}
          />
        </DialogContent>
      </Dialog>
    );

  return <></>;
};
