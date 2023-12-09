import products from "./products.json";
import { QuickScore } from "quick-score";

const productsArray = Object.values(products);
const qs = new QuickScore(productsArray, ["name", "categoryName"]);

const Query = (q: string | string[] | undefined) =>
  Array.isArray(q) ? q[0] : q === "undefined" ? "" : q ?? "";

export default function SearchHandler(queryString: { q?: string; c?: string }) {
  const { q, c } = queryString;
  const query = Query(q);
  const categoryQuery = Query(c);

  const searchArray = qs.search(categoryQuery || query);

  return [200, searchArray.map((i) => i.item)] as const;
}
