import { toCurrencyValue } from "@/app/utils/misc/toCurrencyValue";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface CepItemProps {
  freight: any;
  isSelected: boolean;
  onClick: (freight: any) => void;
}

export const CepItem: React.FC<CepItemProps> = ({
  freight,
  isSelected,
  onClick,
}) => {
  return (
    <button
      onClick={() => onClick(freight)}
      className={cn(
        "border w-full flex transition-all",
        isSelected ? "border-primary" : "border-[rgba(0,0,0,0.1)]",
        "mt-[-1px] first-of-type:rounded-t-lg last-of-type:rounded-b-lg overflow-hidden"
      )}
    >
      <div className=" w-full flex">
        <div
          className={cn(
            "w-12 bg-primary shrink-0 flex items-center justify-center transition-opacity",
            !isSelected && "opacity-0"
          )}
        >
          <CheckCircle2 className="w-4 h-4 text-white" />
        </div>
        <div className="flex justify-between items-center p-4 w-full ">
          <div>
            <p className="text-base font-bold text-start">
              {freight.company.name} - {freight.name}
            </p>
            <p className="text-sm font-normal text-start">
              {freight.range.formatted}
            </p>
          </div>
          <p className="text-base font-bold">
            {toCurrencyValue(Number(freight.price))}
          </p>
        </div>
      </div>
    </button>
  );
};
