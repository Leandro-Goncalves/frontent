"use client";
import { Form } from "@/app/components/Form";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { useResetPassword } from "./useResetPassword";

export default function Register() {
  const params = useParams();
  const { guid } = params as any;
  const { isLoading, handleReset, register } = useResetPassword(
    Array.isArray(guid) ? guid[0] : guid
  );

  return (
    <>
      <div className="bg-slate-800 w-full h-screen">
        <div className=" bg flex flex-col items-center justify-center h-full">
          <Form.Container className="grid gap-6 min-w-[380px] bg-white p-12 rounded-lg">
            <Form.Item>
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
                      {...register("confirmNewPassword")}
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
            </Form.Item>
          </Form.Container>
        </div>
      </div>
    </>
  );
}
