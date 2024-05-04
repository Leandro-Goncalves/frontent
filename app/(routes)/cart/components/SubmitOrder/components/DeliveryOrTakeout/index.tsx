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
          "transition-colors w-full rounded-lg h-[39px] flex items-center justify-center",
          !isDelivery ? "bg-transparent" : "bg-primary"
        )}
      >
        <p
          className={cn(
            "text-primary text-base font-bold uppercase",
            !isDelivery ? "text-primary" : "text-white"
          )}
        >
          entrega
        </p>
      </div>
      <div
        className={cn(
          "transition-colors w-full rounded-lg h-[39px] flex items-center justify-center",
          isDelivery ? "bg-transparent" : "bg-primary"
        )}
      >
        <p
          className={cn(
            "text-base font-bold uppercase",
            isDelivery ? "text-primary" : "text-white"
          )}
        >
          retirada
        </p>
      </div>
    </button>
  );
};
