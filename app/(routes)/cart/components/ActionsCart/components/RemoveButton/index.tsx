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
import React from "react";

interface RemoveButtonProps {
  title: string;
  handleRemove: () => void;
  removeButton?: React.ReactNode;
}

export const RemoveButton: React.FC<RemoveButtonProps> = ({
  title,
  handleRemove,
  removeButton = (
    <Button className="w-6 h-6" variant="outline" size="icon">
      <Trash size={14} />
    </Button>
  ),
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{removeButton}</AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação é permanente e não poderá ser desfeita
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
