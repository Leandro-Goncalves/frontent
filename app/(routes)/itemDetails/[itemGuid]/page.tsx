import Breadcrumb from "@/app/components/Breadcrumb";
import { ProductInfo } from "../components/ProductInfo";
import { productService } from "@/app/services/products";
import env from "@/app/env";
import { establishmentService } from "@/app/services/establishment";
import { Metadata } from "next";
import { CollapsibleInfos } from "../components/CollapsibleInfos";
import { BackToHomeButton } from "@/app/components/BackToHomeButton";
import { useFavorites } from "@/app/states/favorites.state";
import { useCart } from "@/app/states/cart.state";
import { RemoveProductAndFavorite } from "../components/RemoveProductAndFavorite";
interface ItemGuidProps {
  params: { itemGuid: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  params,
}: ItemGuidProps): Promise<Metadata> {
  const product = await productService
    .getOne(env.ESTABLISHMENT_ID, params.itemGuid)
    .catch(() => ({
      data: {
        name: "Produto não encontrado",
      },
    }));

  return {
    title: product.data.name,
  };
}

export default async function ItemGuid({ params }: ItemGuidProps) {
  const product = await productService
    .getOne(env.ESTABLISHMENT_ID, params.itemGuid)
    .catch(() => ({ data: undefined }));

  const establishment = await establishmentService.get(env.ESTABLISHMENT_ID);

  if (!product.data) {
    return (
      <>
        <RemoveProductAndFavorite guid={params.itemGuid} />

        <main className="py-20 px-16">
          <h2 className="text-lg font-bold">
            Esse produto nao existe ou nao esta mais disponivel :(
          </h2>
          <BackToHomeButton className="mt-8" />
        </main>
      </>
    );
  }

  return (
    <main className="py-20 px-16 max-[1000px]:p-4 overflow-hidden">
      <Breadcrumb>
        <Breadcrumb.Item path="/">home</Breadcrumb.Item>
        <Breadcrumb.Item path="/itemDetails" disable>
          detalhes do produto
        </Breadcrumb.Item>
      </Breadcrumb>
      {product.data && (
        <ProductInfo
          product={product.data}
          installments={establishment.data.installments}
        />
      )}
      <CollapsibleInfos productDescription={product.data.description} />
    </main>
  );
}
