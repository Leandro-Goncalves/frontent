"use client";
import { UserAuthForm } from "./components/UserAuthForm";

export default function Home() {
  return (
    <>
      <div className="bg-slate-800 w-full h-screen">
        <div className=" bg flex flex-col items-center justify-center h-full">
          <UserAuthForm
            className="bg-white p-12 rounded-lg"
            onSuccess={() => {}}
          />
        </div>
      </div>
    </>
  );
}
