"use client";

import { Cupom as CupomType } from "@/app/models/cupom";
import { Cupom } from "../Cupom";
import { CupomDialog } from "../CupomDialog";
import { useQuery } from "@tanstack/react-query";
import { couponService } from "@/app/services/cupom";

interface PageContentProps {
  cupons: CupomType[];
}

export const PageContent: React.FC<PageContentProps> = ({ cupons }) => {
  const coupons = useQuery({
    initialData: cupons,

    queryKey: ["cupons"],
    queryFn: () => couponService.listAll().then((r) => r.data),
  });

  return (
    <div className="py-24 px-8">
      <h1 className="font-bold text-2xl uppercase">Cupons de desconto</h1>
      <h3 className="font-medium text-sm">
        Crie cupons personalizados e potencialize as vendas.
      </h3>

      <div className="mt-8">
        <CupomDialog />
      </div>

      <div className="mt-8 gap-3 grid grid-cols-3 max-[1600px]:grid-cols-2 max-[1200px]:grid-cols-1">
        {coupons.data.map((cupom) => (
          <Cupom cupom={cupom} key={cupom.guid} />
        ))}
      </div>
    </div>
  );
};
