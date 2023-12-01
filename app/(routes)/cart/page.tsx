import { Metadata } from "next";
import { ProductsList } from "./components/ProductsList";
import { SubmitOrder } from "./components/SubmitOrder";
import { ShoppingCart } from "lucide-react";
import { BackToHomeButton } from "@/app/components/BackToHomeButton";
import { establishmentService } from "@/app/services/establishment";
import env from "@/app/env";

export const metadata: Metadata = {
  title: "Carrinho",
};

export default async function Cart() {
  const { data: establishment } = await establishmentService.get(
    env.ESTABLISHMENT_ID
  );

  return (
    <main className="py-20 px-16 max-[1000px]:p-4">
      <h1 className="text-base font-bold flex gap-2 mb-5 items-start">
        <ShoppingCart size={20} />
        Carrinho de Compras
      </h1>

      <div className="flex justify-center gap-4 max-xl:flex-col">
        <ProductsList />
        <SubmitOrder phone={establishment.phone} />
      </div>
      <BackToHomeButton className="mt-16" />
    </main>
  );
}
