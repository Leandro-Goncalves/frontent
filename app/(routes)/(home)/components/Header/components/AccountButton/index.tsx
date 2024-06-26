"use client";
import { UserCircle } from "lucide-react";
import { IconButton } from "../IconButton";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { UserAuthForm } from "@/app/(routes)/login/components/UserAuthForm";
import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ExitButton } from "./components/ExitButton";
import { useUser } from "@/app/states/useUser.state";
import { EditButton } from "./components/EditButton";
import { useRouter } from "next/navigation";
import { isSsr } from "@/app/utils/misc/isSsr";

const getUserSSR = () => {
  const { cookies } = require("next/headers") as typeof import("next/headers");
  const stateValue = cookies().get("user")?.value;
  const stateValueParse = JSON.parse(stateValue || "{}");
  return stateValueParse?.state?.user;
};

interface AccountButtonProps {}

export const AccountButton: React.FC<AccountButtonProps> = () => {
  const [open, setOpen] = useState(false);
  const { user: u } = useUser();
  const user = isSsr() ? getUserSSR() : u;
  const route = useRouter();

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleGoToOrders = () => {
    route.push("/orders");
  };

  if (user) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <IconButton
            icon={<UserCircle className="w-6 h-6 text-foreground" />}
            title={user.name}
          />
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Button onClick={handleGoToOrders}>Meus Pedidos</Button>
            <EditButton />
            <ExitButton />
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <IconButton
          limitMaxText
          icon={<UserCircle className="w-6 h-6 text-foreground" />}
          title="Login"
        />
      </DialogTrigger>
      <DialogContent className="p-0 border-0">
        <UserAuthForm
          className="p-12 rounded-lg pb-4"
          onSuccess={handleCloseDialog}
        />
      </DialogContent>
    </Dialog>
  );
};
