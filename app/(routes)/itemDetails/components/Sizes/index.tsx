import { ProductsSize } from "@/app/models/products";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SizesProps {
  sizes: ProductsSize[];
  selectedSize?: ProductsSize;
  updateSize: (size: ProductsSize) => void;
  isFocused?: boolean;
}

export const Sizes: React.FC<SizesProps> = ({
  sizes,
  selectedSize,
  updateSize,
  isFocused,
}) => {
  return (
    <div className="flex gap-2 relative">
      {isFocused && (
        <div className="absolute inset-[-8px] border-2 rounded-xl border-red-500 animate-smallPing" />
      )}
      {sizes.map((size) => {
        const isSelected = size.uuid === selectedSize?.uuid;

        return (
          <Button
            disabled={isSelected}
            onClick={() => updateSize(size)}
            variant={isSelected ? "default" : "outline"}
            key={size.uuid}
            className={cn(
              "rounded-full text-black border-black text-sm font-extrabold min-w-[28px] h-7 p-1 bg-transparent z-10",
              "disabled:bg-[#DC024F] disabled:opacity-100 disabled:text-white"
            )}
          >
            {size.name}
          </Button>
        );
      })}
    </div>
  );
};
