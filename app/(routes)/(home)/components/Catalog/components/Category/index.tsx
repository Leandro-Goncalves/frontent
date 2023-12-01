"use client";
import { Category as ICategory } from "@/app/models/category";
import { Product } from "../Product";
import { Button } from "@/components/ui/button";
import { Title } from "@/app/components/Title";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface CategoryProps {
  category: ICategory;
  installments: number;
}

export const Category: React.FC<CategoryProps> = ({
  category,
  installments,
}) => {
  const router = useRouter();

  return (
    <div className="mb-16 last:mb-0">
      <Title>{category.name}</Title>
      <div
        className={cn(
          "my-7 gap-y-4 grid justify-items-center",
          "grid-cols-5 max-[1650px]:grid-cols-4 max-[1400px]:grid-cols-3 max-[1080px]:grid-cols-2 max-[705px]:grid-cols-1"
        )}
      >
        {category.Products.map((product) => (
          <Product
            key={product.uuid}
            product={product}
            installments={installments}
          />
        ))}
      </div>
      <div className="w-full flex align-center">
        <Button
          className="w-full rounded-full bg-[#DC024F] max-w-[800px] mx-auto text-sm font-bold hover:bg-[#b60241]"
          onClick={() => {
            router.push(`/results?c=${category.name}`);
          }}
        >
          Confira mais produtos
        </Button>
      </div>
    </div>
  );
};
