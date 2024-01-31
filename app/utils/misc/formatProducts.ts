import { Products, Variant } from "@/app/models/products";

function shuffleArray<T>(array: T[]) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}

interface ProductWithSelectedVariant extends Products {
  selectedVariant: Variant;
}

const value = (p: ProductWithSelectedVariant) =>
  p.selectedVariant.promotionalPrice ?? p.variants[0].price;

export const filterProducts = (
  products: ProductWithSelectedVariant[],
  min: number,
  max: number,
  sizes: string[]
) => {
  return products
    .filter((p) => value(p) >= min && value(p) <= max)
    .filter((p) => {
      if (sizes.length === 0) {
        return true;
      }
      return sizes.some((s) => {
        return p.selectedVariant.size.map((s: any) => s.sizeUuid).includes(s);
      });
    });
};

export const formatProducts = (products: Products[]) => {
  const productsToReturn = products.flatMap((product) =>
    product.variants.map((variant) => {
      return {
        ...product,
        selectedVariant: variant,
      };
    })
  );

  const newArray = [
    ...productsToReturn.filter((v: any) => v.selectedVariant.isFavorite),
    ...productsToReturn.filter((v: any) => !v.selectedVariant.isFavorite),
  ];

  return newArray;
};
