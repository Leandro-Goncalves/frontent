import { useMemo } from "react";
import { format } from "date-fns";
import { CupomType, Cupom as ICupom, DiscountType } from "@/app/models/cupom";
import { toCurrencyValue } from "@/app/utils/misc/toCurrencyValue";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { MoreVertical, Trash } from "lucide-react";
import { CupomDialog } from "../CupomDialog";
import { couponService } from "@/app/services/cupom";
import { queryClient } from "@/app/components/QueryProvider";
import { RemoveButton } from "@/app/(routes)/cart/components/ActionsCart/components/RemoveButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const cupomTypeText: Record<CupomType, string> = {
  [CupomType.FIRST]: "Primeiro pedido",
  [CupomType.GENERAL]: "Uso geral",
  [CupomType.UNIQUE]: "Uso único",
};

interface CupomProps {
  cupom: ICupom;
}

export const Cupom: React.FC<CupomProps> = ({ cupom }) => {
  const couponIsZero = cupom.quantity === 0 && !cupom.isUnlimited;

  const discountText = useMemo(() => {
    if (cupom.discountType === DiscountType.PERCENTAGE) {
      return `${cupom.discountValue}% de desconto para ${cupomTypeText[
        cupom.cupomType
      ].toLocaleLowerCase()}`;
    }

    return `${toCurrencyValue(
      cupom.discountValue
    )} de desconto para ${cupomTypeText[cupom.cupomType].toLocaleLowerCase()}`;
  }, [cupom]);

  const validate = useMemo(() => {
    let text = "";

    if (cupom.initialDate && cupom.finalDate) {
      text = `de ${format(cupom.initialDate, "dd/MM/yyyy")} até ${format(
        cupom.finalDate,
        "dd/MM/yyyy"
      )}`;
    }

    return text;
  }, [cupom]);

  return (
    <div className="p-8 shadow-xl bg-[#FFE4E4] rounded-lg w-full">
      <div className="flex items-center">
        <p className="font-bold text-2xl mr-auto">{cupom.code}</p>

        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <Switch
                className="data-[state=unchecked]:bg-slate-500"
                checked={cupom.isActive}
                disabled={couponIsZero}
                onCheckedChange={async () => {
                  await couponService.updateActive(cupom.guid, {
                    isActive: !cupom.isActive,
                  });

                  queryClient.invalidateQueries(["cupons"]);
                }}
              />
            </TooltipTrigger>
            {couponIsZero && (
              <TooltipContent>
                <p>A quantidade deve ser maior que 0</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>

        <Popover>
          <PopoverTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full ml-2 mr-[-24px]"
            >
              <MoreVertical className="w-6 h-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-2">
              <CupomDialog cupomToEdit={cupom} />
              <RemoveButton
                title="Remover cupom"
                handleRemove={async () => {
                  await couponService.remove(cupom.guid);
                  queryClient.invalidateQueries(["cupons"]);
                }}
                removeButton={
                  <Button>
                    <Trash size={14} className="mr-2" />
                    Remover
                  </Button>
                }
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <p className="font-light text-base mb-2">{discountText}</p>
      <p>
        <b>Qualidade:</b> {cupom.isUnlimited ? "Ilimitado" : cupom.quantity}
      </p>
      <p>
        <b>Tipo:</b> {cupomTypeText[cupom.cupomType]}
      </p>
      {validate && (
        <p>
          <b>Validade:</b> {validate}
        </p>
      )}
    </div>
  );
};
