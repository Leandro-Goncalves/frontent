import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface TakeoutItemProps {}

export const TakeoutItem: React.FC<TakeoutItemProps> = () => {
  return (
    <div
      className={cn(
        "border w-full flex transition-all border-primary",
        "mt-[-1px] rounded-lg overflow-hidden"
      )}
    >
      <div className="w-full flex">
        <div className="w-12 bg-primary shrink-0 flex items-center justify-center transition-opacity rounded-lg">
          <CheckCircle2 className="w-4 h-4 text-white" />
        </div>
        <div className="flex justify-between items-center p-4 w-full ">
          <div>
            <p className="text-base font-normal text-start">Retirar na rua</p>
            <p className="text-sm font-bold text-start">
              José Alves N210 - COHAB 2
            </p>
          </div>
          <p className="text-base font-bold text-[#2c9e4e] italic">gratuíto</p>
        </div>
      </div>
    </div>
  );
};
