"use client";

import env from "@/app/env";
import { blockService } from "@/app/services/block";
import { establishmentService } from "@/app/services/establishment";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

interface BlockAlertProps {}

export const BlockAlert: React.FC<BlockAlertProps> = () => {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["blockAlert"],
    queryFn: () => blockService.getActive().then((r) => r.data),
  });

  const handleClick = () => {
    router.push("/painel/block");
  };

  if (data === undefined || Object.keys(data).length === 0) {
    return <></>;
  }

  return (
    <button
      className="h-[44px] w-full bg-[#FFCC6D] text-black flex justify-center items-center"
      onClick={handleClick}
    >
      <AlertTriangle className="mr-2 w-8 h-8" />
      <p className="font-normal text-base">
        <b>ATENÇÃO:</b> Seu site está bloqueado
      </p>
    </button>
  );
};
