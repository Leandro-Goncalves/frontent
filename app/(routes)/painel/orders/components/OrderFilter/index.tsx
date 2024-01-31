"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OrderFilterProps {
  takeout: number;
  delivery: number;
  canceled: number;
  completed: number;
  selectedFilter: "delivery" | "takeout" | "canceled" | "completed";
  onChangeFilter: (
    filter: "delivery" | "takeout" | "canceled" | "completed"
  ) => void;
}

export const OrderFilter: React.FC<OrderFilterProps> = ({
  takeout,
  delivery,
  canceled,
  completed,
  selectedFilter,
  onChangeFilter,
}) => {
  return (
    <div className="flex gap-4">
      <Button
        className={cn(
          "rounded-full transition-opacity",
          selectedFilter !== "takeout" && "opacity-50"
        )}
        onClick={() => onChangeFilter("takeout")}
      >
        ESPERANDO RETIRADA{" "}
        {takeout > 0 && <p className="ml-4 text-lg font-bold">{takeout}</p>}
      </Button>
      <Button
        className={cn(
          "rounded-full transition-opacity",
          selectedFilter !== "delivery" && "opacity-50"
        )}
        onClick={() => onChangeFilter("delivery")}
      >
        ESPERANDO ENTREGA{" "}
        {delivery > 0 && <p className="ml-4 text-lg font-bold">{delivery}</p>}
      </Button>
      <Button
        className={cn(
          "rounded-full transition-opacity",
          selectedFilter !== "canceled" && "opacity-50"
        )}
        onClick={() => onChangeFilter("canceled")}
      >
        PEDIDOS CANCELADOS{" "}
        {canceled > 0 && <p className="ml-4 text-lg font-bold">{canceled}</p>}
      </Button>
      <Button
        className={cn(
          "rounded-full transition-opacity",
          selectedFilter !== "completed" && "opacity-50"
        )}
        onClick={() => onChangeFilter("completed")}
      >
        PEDIDOS CONCLUÍDOS{" "}
        {completed > 0 && <p className="ml-4 text-lg font-bold">{completed}</p>}
      </Button>
    </div>
  );
};
