import { UserAuthForm } from "@/app/(routes)/login/components/UserAuthForm";
import { UserEditForm } from "@/app/components/UserEditForm";
import { User } from "@/app/models/user";
import { useUser } from "@/app/states/useUser.state";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

interface EditButtonProps {}

export const EditButton: React.FC<EditButtonProps> = () => {
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="w-full">Editar usuario</Button>
      </DialogTrigger>
      <DialogContent className="p-0 border-0">
        <UserEditForm
          className="p-12 rounded-lg pb-4"
          backToLogin={handleCloseDialog}
          user={user as User}
        />
      </DialogContent>
    </Dialog>
  );
};
