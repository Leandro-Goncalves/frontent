import { ProductsImage, ProductsSize } from "@/app/models/products";
import { useCart } from "@/app/states/cart.state";
import { Button } from "@/components/ui/button";

interface AddToCartProps {
  product: Omit<ProductsImage, "description">;
  quantity: number;
  selectedSize?: ProductsSize;
  onAddToCart?: () => void;
}

export const AddToCart: React.FC<AddToCartProps> = ({
  product,
  quantity,
  selectedSize,
  onAddToCart,
}) => {
  const addProduct = useCart((state) => state.addProduct);

  const handleCartProduct = () => {
    addProduct({
      product: product as any,
      quantity,
      size: selectedSize,
    });
    onAddToCart?.();
  };

  return (
    <Button
      variant={"outline"}
      className="border-black hover:bg-[#0000000c] rounded-full font-bold text-xs w-full relative overflow-hidden"
      onClick={handleCartProduct}
    >
      Adicionar ao carrinho
    </Button>
  );
};
