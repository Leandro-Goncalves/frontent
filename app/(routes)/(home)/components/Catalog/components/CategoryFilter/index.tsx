"use client";
import { Category } from "@/app/models/category";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface CategoryFilterProps {
  categories: Category[];
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
}) => {
  const router = useRouter();
  const handleGoToCategory = (categoryName: string) => {
    router.push(`/results?c=${categoryName}`);
  };

  return (
    <div>
      <p className="text-lg font-bold">Categorias</p>
      <div className="flex gap-2">
        {categories.map((category) => (
          <Button
            onClick={() => handleGoToCategory(category.name)}
            className="my-3"
            size="sm"
            key={category.uuid}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
