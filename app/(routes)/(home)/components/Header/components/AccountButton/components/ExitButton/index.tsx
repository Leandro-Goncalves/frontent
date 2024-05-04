import { useUser } from "@/app/states/useUser.state";
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
import { LogOut } from "lucide-react";

interface ExitButtonProps {}

export const ExitButton: React.FC<ExitButtonProps> = () => {
  const { logout } = useUser();

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="w-full">
          <LogOut className="mr-2" /> Sair
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Voce tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja sair da sua conta?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-primary text-white hover:bg-primary hover:text-white">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={logout}
            className="bg-transparent text-foreground border-foreground border-[1px] hover:bg-transparent hover:text-foreground"
          >
            Sair
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
