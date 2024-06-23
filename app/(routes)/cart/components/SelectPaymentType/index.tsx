import { ReceiptText } from "@/app/assets/ReceiptText";
import PixIcon from "@/app/assets/pix";
import { usePromiseDialog } from "@/app/utils/hooks/usePromiseDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { CreditCard } from "lucide-react";
import { useState } from "react";

interface SelectPaymentTypeProps {
  onClose: () => void;
  onSelect: (type: "pix" | "boleto" | "card") => void;
  open: boolean;
}

export const SelectPaymentType: React.FC<SelectPaymentTypeProps> = ({
  open,
  onClose,
  onSelect,
}) => {
  const [type, setType] = useState<"pix" | "boleto" | "card">();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle>Selecione o tipo de pagamento</DialogTitle>
      <DialogContent className="max-[400px]:h-screen">
        <p className="mb-2 text-lg font-bold">Selecione o tipo de pagamento</p>
        <div className="grid grid-cols-3 gap-4 max-[400px]:grid-cols-1 max-[400px]:gap-0">
          <Button
            onClick={() => setType("pix")}
            variant={type === "pix" ? "default" : "outline"}
            className="flex-col gap-2 mx-auto w-24 h-24 max-[400px]:w-full"
          >
            <PixIcon
              className={cn("w-8 h-8 transition-none", {
                "fill-white": type === "pix",
              })}
            />
            Pix
          </Button>
          <Button
            onClick={() => setType("boleto")}
            variant={type === "boleto" ? "default" : "outline"}
            className="flex-col gap-2 mx-auto w-24 h-24 max-[400px]:w-full"
          >
            <ReceiptText className="w-8 h-8" />
            Boleto
          </Button>
          <Button
            onClick={() => setType("card")}
            variant={type === "card" ? "default" : "outline"}
            className="flex-col gap-2 mx-auto w-24 h-24 max-[400px]:w-full"
          >
            <CreditCard className="w-8 h-8" />
            Cartão
          </Button>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={!type}
            onClick={() => onSelect(type!)}
          >
            Proximo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const useSelectPaymentType = () =>
  usePromiseDialog(SelectPaymentType, {
    onCloseKey: "onClose",
    onSuccessKey: "onSelect",
    openKey: "open",
  });
