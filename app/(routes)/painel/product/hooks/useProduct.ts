import env from "@/app/env";
import { productService } from "@/app/services/products";
import { useQuery } from "@tanstack/react-query";

export const useProduct = () => {
  const { data } = useQuery({
    queryKey: ["productsData"],
    queryFn: () => productService.gelAll(env.ESTABLISHMENT_ID),
  });

  const handleRemove = () => {};

  return {
    products: data?.data ?? [],
    onRemove: handleRemove,
  };
};
