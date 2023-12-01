import { productService } from "@/app/services/products";
import { Product } from "../(home)/components/Catalog/components/Product";
import { establishmentService } from "@/app/services/establishment";
import env from "@/app/env";
import { BackToHomeButton } from "@/app/components/BackToHomeButton";
import { Metadata } from "next";

interface Results {
  searchParams: {
    q: string;
    c: string;
  };
}

export const metadata: Metadata = {
  title: {
    absolute: "Produtos",
  },
};

export default async function Results({ searchParams }: Results) {
  const { data: Products } = await productService.search(
    searchParams.q,
    searchParams.c
  );
  const { data: establishmentData } = await establishmentService.get(
    env.ESTABLISHMENT_ID
  );

  return (
    <main>
      {Products.length > 0 && (
        <div className="my-7 grid grid-cols-5 justify-items-center max-2xl:grid-cols-4 max-[1150px]:grid-cols-3 max-[880px]:grid-cols-2 max-[850px]:grid-cols-1 overflow-hidden">
          {Products.map((product) => (
            <Product
              key={product.uuid}
              product={product}
              installments={establishmentData.installments}
            />
          ))}
        </div>
      )}

      {Products.length === 0 && (
        <div className="flex flex-col items-center w-full">
          <h3 className="text-2xl font-bold my-4">
            Nenhum resultado encontrado
          </h3>
          <BackToHomeButton />
        </div>
      )}
    </main>
  );
}
