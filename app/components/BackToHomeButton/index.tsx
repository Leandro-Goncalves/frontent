"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackToHomeButtonProps {
  className?: ClassValue;
}

export const BackToHomeButton: React.FC<BackToHomeButtonProps> = ({
  className,
}) => {
  const router = useRouter();

  const goToHome = () => {
    router.push("/");
  };

  return (
    <Button
      className={cn("rounded-full text-sm font-bold", className)}
      onClick={goToHome}
    >
      <ArrowLeft className="mr-2" />
      Voltar a pagina inicial
    </Button>
  );
};
