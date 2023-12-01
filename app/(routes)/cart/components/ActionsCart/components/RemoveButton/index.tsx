"use client";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface RemoveButtonProps {
  handleRemove: () => void;
}

export const RemoveButton: React.FC<RemoveButtonProps> = ({ handleRemove }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-6 h-6" variant="outline" size="icon">
          <Trash size={14} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Remover produto</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação é permatente e não podera ser desfeita
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-[#DC024F] text-white hover:bg-[#B40000] hover:text-white">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleRemove}
            className="bg-white text-black border-black border-[1px] hover:bg-slate-100 hover:text-black"
          >
            Remover
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
