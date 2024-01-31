import env from "@/app/env";
import { categoryService } from "@/app/services/category";
import { Category } from "./components/Category";
import { establishmentService } from "@/app/services/establishment";
import { CategoryFilter } from "./components/CategoryFilter";

export const Catalog: React.FC = async () => {
  const { data: categories } = await categoryService.gelAll(
    env.ESTABLISHMENT_ID
  );

  const { data: establishment } = await establishmentService.get(
    env.ESTABLISHMENT_ID
  );

  const removeEmptyCategories = categories.filter(
    (category) => category.Products.length > 0
  );

  return (
    <div>
      <CategoryFilter categories={removeEmptyCategories} />
      {removeEmptyCategories.map((category) => (
        <Category
          key={category.uuid}
          category={category}
          installments={establishment.installments}
        />
      ))}
    </div>
  );
};
