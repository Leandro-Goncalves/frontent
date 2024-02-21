import { cn } from "@/lib/utils";

interface DeliveryOrTakeoutProps {
  isDelivery: boolean;
  setIsDelivery: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeliveryOrTakeout: React.FC<DeliveryOrTakeoutProps> = ({
  isDelivery,
  setIsDelivery,
}) => {
  return (
    <button
      className="flex border-2 rounded-lg w-full"
      onClick={() => setIsDelivery(!isDelivery)}
    >
      <div
        className={cn(
          "transition-colors w-full px-[55px] py-[11px] rounded-lg h-[39px] flex items-center justify-center",
          !isDelivery ? "bg-transparent" : "bg-[#FFAEC5]"
        )}
      >
        <p className="text-primary text-base font-bold uppercase">entrega</p>
      </div>
      <div
        className={cn(
          "transition-colors w-full px-[55px] py-[11px] rounded-lg h-[39px] flex items-center justify-center",
          isDelivery ? "bg-transparent" : "bg-[#FFAEC5]"
        )}
      >
        <p className="text-primary text-base font-bold uppercase">retirada</p>
      </div>
    </button>
  );
};
