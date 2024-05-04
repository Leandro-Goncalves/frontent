import { queryClient } from "@/app/components/QueryProvider";
import { checkoutService } from "@/app/services/checkount";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FinishedOrderButtonProps {
  orderId: string;
}

export const FinishedOrderButton: React.FC<FinishedOrderButtonProps> = ({
  orderId,
}) => {
  const handleFinished = async () => {
    await checkoutService.finishedOrder(orderId);
    queryClient.invalidateQueries(["allOrders"]);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-green-600 hover:bg-green-800">
          Concluir pedido
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-card">
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
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleFinished} className="w-full h-12">
            Concluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
