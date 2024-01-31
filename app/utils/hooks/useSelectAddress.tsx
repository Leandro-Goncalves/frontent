import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useDialogController } from "./useDialogController";
import { SelectAddressForm } from "@/app/components/SelectAddressForm";
import { Address } from "@/app/services/checkount";

type Takeout = {
  type: "takeout";
};

type Delivery = {
  type: "delivery";
  cep: string;
};

type Data = Takeout | Delivery;

export const useSelectAddress = () => {
  const { bind, handleOpen, handleSuccess, data } = useDialogController<
    Address,
    Data
  >();

  const SelectAddressDialog = (
    <Dialog {...bind()}>
      <DialogContent className="p-0 border-0">
        {data && (
          <SelectAddressForm
            cep={data.type === "delivery" ? data.cep : ""}
            type={data.type}
            onSelectAddress={handleSuccess}
          />
        )}
      </DialogContent>
    </Dialog>
  );
  return {
    SelectAddressDialog,
    handleSelectAddress: handleOpen,
  };
};
