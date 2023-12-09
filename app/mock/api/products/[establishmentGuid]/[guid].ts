import products from "../products.json";

export default function productHandler(queryString: { guid: string }) {
  const { guid } = queryString;

  const guidString = Array.isArray(guid) ? guid[0] : guid;

  const product = products[guidString as keyof typeof products];

  if (!product) {
    return [
      401,
      {
        message: "Product not found",
        error: "Unauthorized",
        statusCode: 401,
      },
    ] as const;
  }

  return [200, product] as const;
}
