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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação é permanente e não poderá ser desfeita
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-primary text-white hover:bg-primary hover:text-white">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleRemove}
            className="bg-transparent text-foreground border-foreground border-[1px] hover:bg-transparent hover:text-foreground"
          >
            Remover
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
