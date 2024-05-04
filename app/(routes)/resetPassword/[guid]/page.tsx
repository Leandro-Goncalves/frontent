"use client";
import { Form } from "@/app/components/Form";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { useResetPassword } from "./useResetPassword";
import Image from "next/image";
import { PasswordInput } from "@/components/ui/password-input";

export default function Register() {
  const params = useParams();
  const { guid } = params as any;
  const { isLoading, handleReset, register } = useResetPassword(
    Array.isArray(guid) ? guid[0] : guid
  );

  return (
    <>
      <div className="bg-background w-full h-screen">
        <div className=" bg flex flex-col items-center justify-center h-full">
          <Form.Container className="relative grid gap-6 min-w-[380px] bg-background shadow-2xl p-12 rounded-lg">
            <Form.Item>
              <div className="grid after:content-[' '] max-w-[400px] after:absolute after:top-0 after:h-[8px] after:w-[70%] after:left-[50%] after:bg-primary after:transform after:translate-x-[-50%] after:rounded">
                <div className="flex items-center gap-3 mb-4 flex-col">
                  <h2 className="text-3xl font-bold text-primary">
                    Nova Senha
                  </h2>
                  <h3 className="text-base font-medium text-foreground text-center">
                    Faça uma nova senha para o seu login e continue fazendo suas
                    compras
                  </h3>
                </div>
                <form onSubmit={handleReset()} className="grid gap-3">
                  <div className="grid gap-1">
                    <PasswordInput
                      autoFocus
                      id="newPassword"
                      placeholder="Digite uma nova senha"
                      autoCapitalize="none"
                      autoCorrect="off"
                      {...register("newPassword")}
                    />
                  </div>

                  <div className="grid gap-1">
                    <PasswordInput
                      autoFocus
                      id="confirmNewPassword"
                      placeholder="Digite novamente"
                      autoCapitalize="none"
                      autoCorrect="off"
                      {...register("confirmNewPassword")}
                    />
                  </div>

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
        </div>
      </div>
    </>
  );
}

{
  /* <Form.Item>
<div className="grid">
  <h2 className="grid text-lg mb-4">Reset password</h2>
  <form onSubmit={handleReset()} className="grid gap-3">
    <div className="grid gap-1">
      <Input
        autoFocus
        id="newPassword"
        placeholder="New password"
        type="password"
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect="off"
        {...register("newPassword")}
      />
    </div>
    <div className="grid gap-1">
      <Input
        autoFocus
        id="repeatNewPassword"
        placeholder="Repeat new password"
        type="password"
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect="off"
        
      />
    </div>
    <Button disabled={isLoading} type="submit">
      {isLoading && (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      )}
      Register
    </Button>
  </form>
</div>
</Form.Item> */
}
