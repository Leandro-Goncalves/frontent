import { Category } from "@/app/models/category";
import { VisibilitySwitch } from "./components/VisibilitySwitch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit, GripVertical, MoreVertical, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RemoveButton } from "@/app/(routes)/cart/components/ActionsCart/components/RemoveButton";
import { categoryService } from "@/app/services/category";
import { queryClient } from "@/app/components/QueryProvider";
import { AddCategory } from "../AddCategory";
import { ProductDialog } from "./components/ProductDialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Products } from "@/app/models/products";
import { toCurrencyValue } from "@/app/utils/misc/toCurrencyValue";
import { productService } from "@/app/services/products";

interface CategoryItemProps {
  category: Category;
  dragProps: any;
}

const calculatePrice = (products: Products) => {
  return products.variants[0].promotionalPrice ?? products.variants[0].price;
};

export const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  dragProps,
}) => {
  const handleRemove = async () => {
    await categoryService.remove(category.uuid);

    queryClient.invalidateQueries(["categories"]);
  };

  const handleRemoveProduct = async (productGuid: string) => {
    await productService.remove(productGuid);

    queryClient.invalidateQueries(["categories"]);
  };

  return (
    <div className="border-2 rounded-lg bg-background">
      <div className="flex p-7 items-center justify-between">
        <div className="flex items-center gap-2">
          <div {...dragProps}>
            <GripVertical />
          </div>
          <h2 className="font-medium text-2xl">{category.name}</h2>
        </div>
        <div className="flex gap-4">
          <ProductDialog categoryId={category.uuid} />
          <Popover>
            <PopoverTrigger>
              <MoreVertical />
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col gap-2">
                <AddCategory categoryToEdit={category} />
                <RemoveButton
                  title="Remover categoria"
                  handleRemove={handleRemove}
                  removeButton={
                    <Button>
                      <Trash size={14} className="mr-2" />
                      Remover
                    </Button>
                  }
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {category.Products.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {category.Products.map((product) => (
              <TableRow key={product.uuid}>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  {toCurrencyValue(calculatePrice(product))}
                </TableCell>
                <TableCell align="right">
                  <div className="flex gap-4 justify-end items-center">
                    <VisibilitySwitch
                      isVisible={!!product.isActive}
                      onVisibilityChange={async () => {
                        await productService.changeIsActive(
                          product.uuid,
                          !product.isActive
                        );

                        queryClient.invalidateQueries(["categories"]);
                      }}
                    />
                    <RemoveButton
                      title="Remover Produto"
                      handleRemove={() => handleRemoveProduct(product.uuid)}
                    />
                    <ProductDialog
                      categoryId={category.uuid}
                      productToEdit={product}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
