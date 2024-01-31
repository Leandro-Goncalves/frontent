import { Products, ProductsSize, Variant } from "@/app/models/products";
import { useCart } from "@/app/states/cart.state";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AddToCartProps {
  product: Products;
  quantity: number;
  variant: Variant;
  selectedSize?: ProductsSize;
  onAddToCart?: () => void;
  isDisabled?: boolean;
}

export const AddToCart: React.FC<AddToCartProps> = ({
  product,
  quantity,
  selectedSize,
  onAddToCart,
  variant,
  isDisabled,
}) => {
  const addProduct = useCart((state) => state.addProduct);

  const handleCartProduct = () => {
    addProduct({
      product: product as any,
      quantity,
      size: selectedSize,
      variant,
    });
    onAddToCart?.();
  };

  if (isDisabled) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger className="w-full">
            <Button
              disabled
              className="rounded-full font-bold text-xs w-full relative overflow-hidden"
            >
              Adicionar ao carrinho
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Selecione o tamanho</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Button
      className="rounded-full font-bold text-xs w-full relative overflow-hidden"
      onClick={handleCartProduct}
    >
      Adicionar ao carrinho
    </Button>
  );
};
