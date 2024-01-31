import { UserAuthForm } from "@/app/(routes)/login/components/UserAuthForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useDialogController } from "./useDialogController";

export const useLoginDialog = () => {
  const { bind, handleOpen, handleSuccess } = useDialogController();

  const LoginDialog = (
    <Dialog {...bind()}>
      <DialogContent className="p-0 border-0">
        <UserAuthForm
          className="p-12 rounded-lg pb-4"
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
  return {
    LoginDialog,
    handleLogin: handleOpen,
  };
};
