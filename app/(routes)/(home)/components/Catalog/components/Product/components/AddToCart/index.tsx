import { ProductsImage } from "@/app/models/products";
import { useCart } from "@/app/states/cart.state";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
interface AddToCartProps {
  product: Omit<ProductsImage, "description">;
}

export const AddToCart: React.FC<AddToCartProps> = ({ product }) => {
  const { addProduct, cart, removeProduct } = useCart();

  const isProductInCart = cart.some(
    (cartProduct) => cartProduct.product.uuid === product.uuid
  );

  const handleCartProduct = () => {
    if (isProductInCart) {
      removeProduct(product.uuid);
      return;
    }

    addProduct({
      product: product as any,
      quantity: 1,
    });
  };

  return (
    <Button
      variant={"outline"}
      className="border-black hover:bg-[#0000000c] rounded-full font-bold text-xs w-full relative overflow-hidden"
      onClick={handleCartProduct}
    >
      Adicionar ao carrinho
      <div
        className={cn(
          "absolute inset-0  bg-red-400 text-white justify-center flex items-center"
        )}
        style={{
          transition: "all 0.2s ease-in-out",
          transform: isProductInCart ? "translateY(0)" : "translateY(100%)",
        }}
      >
        <p>remover do carrinho</p>
      </div>
    </Button>
  );
};
