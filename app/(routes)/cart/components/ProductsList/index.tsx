"use client";

import { useCart } from "@/app/states/cart.state";
import Image from "next/image";
import { QuantitySelector } from "../QuantitySelector";
import { toCurrencyValue } from "@/app/utils/misc/toCurrencyValue";
import { ActionsCart } from "../ActionsCart";
import { Sizes } from "@/app/(routes)/itemDetails/components/Sizes";
import { ProductsSize } from "@/app/models/products";
import { useMediaQuery } from "react-responsive";
import env from "@/app/env";

interface ProductsListProps {}

export const ProductsList: React.FC<ProductsListProps> = () => {
  const {
    cart,
    updateQuantity,
    removeProduct,
    updateSize,
    focusSizeGuids,
    removeItemFromFocusSizeGuids,
  } = useCart();
  const isCartEmpty = cart.length === 0;
  const isMobile = useMediaQuery({
    query: "(max-width: 1000px)",
  });

  const handleUpdateQuantity = (guid: string, newQuantity: number) => {
    updateQuantity(guid, newQuantity);
  };

  const handleRemove = (guid: string) => {
    removeProduct(guid);
  };

  const handleChangeSize = (guid: string, size: ProductsSize) => {
    updateQuantity(guid, 1);
    updateSize(guid, size);
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        {cart.map((productCart) => {
          const { product, quantity, guid } = productCart;
          const image = productCart.variant?.Image;
          const sizeIsFocused = focusSizeGuids.includes(guid);

          return (
            <div
              key={product.uuid}
              className="px-10 py-6 rounded-xl bg-[#FECDDF] flex max-[1000px]:flex-col"
            >
              {!isMobile && (
                <>
                  {image && (
                    <Image
                      alt="Product"
                      src={`${env.CDN_URL}/${image[0].imageId}`}
                      width={65}
                      height={83}
                      className="rounded-sm"
                    />
                  )}

                  <div className="mx-3 w-[1px] bg-[#FFAEC5]" />
                </>
              )}

              <div className="max-[1000px]:items-center max-[1000px]:text-center max-[1000px]:flex-col max-[1000px]:flex flex flex-col">
                <h3 className="text-sm font-bold overflow-ellipsis whitespace-nowrap overflow-hidden w-[200px]">
                  {product.name}
                </h3>
                <h4
                  className="text-sm font-medium overflow-hidden w-[200px]"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  Estampa: {productCart.variant?.name}
                </h4>
                <p>
                  {toCurrencyValue(
                    productCart.variant?.promotionalPrice ??
                      productCart.variant?.price ??
                      0
                  )}
                </p>
              </div>

              <div className="flex items-center ml-auto gap-20 max-[1000px]:flex-wrap max-[1000px]:w-full max-[1000px]:justify-center max-[1000px]:mt-4 max-[1000px]:gap-y-4">
                <div className="flex items-center gap-[90px]">
                  <QuantitySelector
                    maxQuantity={productCart.size?.quantity ?? 0}
                    quantity={quantity}
                    updateQuantity={(q) => handleUpdateQuantity(guid, q)}
                  />
                </div>
                <div>
                  <Sizes
                    isFocused={sizeIsFocused}
                    sizes={productCart.variant?.size ?? []}
                    updateSize={(newSize) => {
                      removeItemFromFocusSizeGuids(guid);
                      handleChangeSize(guid, newSize);
                    }}
                    selectedSize={productCart.size}
                  />
                </div>
                <div className="flex items-center gap-[90px]">
                  <ActionsCart handleRemove={() => handleRemove(guid)} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {isCartEmpty && (
        <div className="flex flex-col items-center my-4">
          <p className="text-lg font-bold">Seu carrinho esta vazio :(</p>
        </div>
      )}
    </>
  );
};
