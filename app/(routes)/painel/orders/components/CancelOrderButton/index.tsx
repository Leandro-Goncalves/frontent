import { queryClient } from "@/app/components/QueryProvider";
import { checkoutService } from "@/app/services/checkount";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";

interface CancelOrderButtonProps {
  orderId: string;
}

export const CancelOrderButton: React.FC<CancelOrderButtonProps> = ({
  orderId,
}) => {
  const [code, setCode] = useState("");
  const [open, setOpen] = useState(false);

  const handleCancel = async () => {
    await checkoutService.cancelOrder(orderId);
    queryClient.invalidateQueries(["allOrders"]);
  };

  const handleOpenChange = (value: boolean) => {
    setOpen(value);

    if (value === false) {
      setCode("");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger>
        <Button className="bg-red-600 hover:bg-red-800">Cancelar pedido</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogCancel asChild className="absolute right-6">
            <Button
              size={"icon"}
              className="p-0 bg-primary hover:bg-primary hover:text-white"
            >
              <X />
            </Button>
          </AlertDialogCancel>
          <AlertDialogTitle>Voce tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação é <b>permanente</b> e nao poderá ser desfeita. <br />
            <br />
            para confirmar digite <b>&quot;cancelar&quot;</b>
            <Input
              className="mt-4"
              autoFocus
              placeholder="cancelar"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handleCancel}
            disabled={code !== "cancelar"}
            className="w-full h-12"
          >
            Cancelar pedido
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
