import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/painel/",
    },
    sitemap: "https://www.caacaustore.com/sitemap.xml",
  };
}
