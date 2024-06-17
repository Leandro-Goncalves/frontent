import { Products, ProductsSize, Variant } from "@/app/models/products";
import { useCart } from "@/app/states/cart.state";
import { sendGAEvent } from "@/app/utils/GAEvents";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AddToCartProps {
  text?: string;
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
  text = "Adicionar ao carrinho",
}) => {
  const addProduct = useCart((state) => state.addProduct);

  const handleCartProduct = () => {
    sendGAEvent("cart", "addProduct", {
      name: product.name,
      price: variant.promotionalPrice || variant.price,
      variant: variant.name,
      quantity: quantity,
      size: selectedSize?.name,
    });
    addProduct({
      product: product as any,
      quantity,
      size: selectedSize,
      variant: variant,
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
              {text}
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
      {text}
    </Button>
  );
};
