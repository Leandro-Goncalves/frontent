'use client'

import { UserRegisterForm } from "./components/UserRegisterForm";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

export default function Register() {
  return (
    <>
      <div className="bg-slate-800 w-full h-screen">
        <div className=" bg flex flex-col items-center justify-center h-full">
          <UserRegisterForm
            className="bg-white p-12 rounded-lg"
            backToLogin={() => {}}
          />
        </div>
      </div>
    </>
  );
}
