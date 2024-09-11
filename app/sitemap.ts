import { MetadataRoute } from "next";
import { categoryService } from "./services/category";
import { Languages } from "next/dist/lib/metadata/types/alternative-urls-types";
import env from "./env";

type SitemapFile = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
  alternates?: {
    languages?: Languages<string>;
  };
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: categories } = await categoryService.gelAll(
    env.ESTABLISHMENT_ID
  );

  const categoriesUrls = categories.reduce((acc, category) => {
    category.Products.forEach((product) => {
      product.variants.forEach((variant) => {
        acc.push(
          `https://www.caacaustore.com/itemDetails/${product.uuid}/?v=${variant.guid}`
        );
      });
    });

    return acc;
  }, [] as string[]);

  return [
    {
      url: "https://www.caacaustore.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...categoriesUrls.map<SitemapFile>((url) => ({
      url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    })),
  ];
}
