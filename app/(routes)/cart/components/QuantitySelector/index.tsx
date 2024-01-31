import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  maxQuantity: number;
  quantity: number;
  updateQuantity: (quantity: number) => void;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  maxQuantity,
  quantity,
  updateQuantity,
}) => {
  return (
    <div className="flex flex-col items-start">
      <p className="mb-2 text-sm font-extrabold">Quantidade:</p>
      <div className="flex gap-7">
        <Button
          disabled={quantity === 1}
          className="w-5 h-5 p-0 bg-white color-black text-black hover:bg-slate-100"
          onClick={() => updateQuantity(quantity - 1)}
        >
          <Minus size={14} />
        </Button>
        <span className="text-xs font-bold">{quantity}</span>
        <Button
          disabled={quantity === maxQuantity}
          className="w-5 h-5 p-0 bg-white text-black hover:bg-slate-100"
          onClick={() => updateQuantity(quantity + 1)}
        >
          <Plus size={14} />
        </Button>
      </div>
    </div>
  );
};
