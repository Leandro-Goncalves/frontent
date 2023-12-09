import type { NextApiRequest, NextApiResponse } from "next";
import products from "./products.json";
import { QuickScore } from "quick-score";

const productsArray = Object.values(products);
const qs = new QuickScore(productsArray, ["name", "categoryName"]);

const Query = (q: string | string[] | undefined) =>
  Array.isArray(q) ? q[0] : q === "undefined" ? "" : q ?? "";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | Error>
) {
  const { q, c } = req.query;
  const query = Query(q);
  const categoryQuery = Query(c);

  const searchArray = qs.search(categoryQuery || query);

  res.status(200).json(searchArray.map((i) => i.item));
}
