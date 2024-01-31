"use client";

import { Establishment } from "@/app/models/establishment";
import { Category } from "../Category";
import { CategoryFilter } from "../CategoryFilter";
import { Category as ICategory } from "@/app/models/category";
import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/app/services/category";

interface CatalogContentProps {
  categoriesInitialData: ICategory[];
  establishment: Establishment;
}

export const CatalogContent: React.FC<CatalogContentProps> = ({
  categoriesInitialData,
  establishment,
}) => {
  const { data: categories } = useQuery(
    ["categoriesFilter"],
    () => categoryService.gelAll(establishment.uuid).then((res) => res.data),
    {
      initialData: categoriesInitialData,
    }
  );

  return (
    <div>
      <CategoryFilter categories={categories} />
      {categories.map((category) => (
        <Category
          key={category.uuid}
          category={category}
          installments={establishment.installments}
        />
      ))}
    </div>
  );
};
