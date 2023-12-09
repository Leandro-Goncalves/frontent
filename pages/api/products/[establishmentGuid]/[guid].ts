import type { NextApiRequest, NextApiResponse } from "next";
import { Error } from "../../_utils/error";
import products from "../products.json";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | Error>
) {
  const { guid } = req.query;

  const guidString = Array.isArray(guid) ? guid[0] : guid;

  const product = products[guidString as keyof typeof products];

  if (!product) {
    return res.status(401).json({
      message: "Product not found",
      error: "Unauthorized",
      statusCode: 401,
    });
  }

  res.status(200).json(product);
}
