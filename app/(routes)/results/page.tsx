import { productService } from "@/app/services/products";
import { establishmentService } from "@/app/services/establishment";
import env from "@/app/env";
import { BackToHomeButton } from "@/app/components/BackToHomeButton";
import { Metadata } from "next";
import { Filters } from "./components/Filters";

export interface Results {
  searchParams: {
    q: string;
    c: string;
    min: string;
    max: string;
    sizes: string[];
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
        <div className="my-7">
          <Filters
            installments={establishmentData.installments}
            searchParams={searchParams}
            Products={Products}
          />
        </div>
      )}
      <div>
        {Products.length === 0 && (
          <div className="flex flex-col items-center w-full">
            <h3 className="text-2xl font-bold my-4">
              Nenhum resultado encontrado
            </h3>
            <BackToHomeButton />
          </div>
        )}
      </div>
    </main>
  );
}
