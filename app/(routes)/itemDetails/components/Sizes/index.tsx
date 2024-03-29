import { ProductsSize } from "@/app/models/products";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SizesProps {
  sizes: ProductsSize[];
  selectedSize?: ProductsSize;
  updateSize: (size: ProductsSize) => void;
  isFocused?: boolean;
}

export const allSizesArray = [
  {
    guid: "de4e5b60-00bd-4fe4-ae33-7667e7191c7f",
    name: "m",
  },
  {
    guid: "db093787-8b21-4864-a98a-db0dd817ed43",
    name: "g",
  },
  {
    guid: "91e835a0-97fb-4ee4-913a-e72d6acef25a",
    name: "gg",
  },
  {
    guid: "db4dd17c-fe56-4f78-9649-553d830feedd",
    name: "plus",
  },
];

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
      {allSizesArray.map(({ guid, name }) => {
        const size = sizes.find((size) => size.uuid === guid);
        const isSelected =
          selectedSize?.uuid !== undefined && size?.uuid === selectedSize?.uuid;

        return (
          <Button
            disabled={isSelected}
            onClick={() => {
              if (!size) return;
              updateSize(size);
            }}
            data-disabled={size === undefined}
            variant={isSelected ? "default" : "outline"}
            key={guid}
            className={cn(
              "rounded-full text-black border-black text-sm font-extrabold min-w-[28px] h-7 p-1 bg-transparent z-10",
              "disabled:bg-[#DC024F] disabled:opacity-100 disabled:text-white",
              "data-[disabled=true]:opacity-20 data-[disabled=true]:cursor-auto data-[disabled=true]:hover:bg-transparent"
            )}
          >
            {name}
          </Button>
        );
      })}
    </div>
  );
};
