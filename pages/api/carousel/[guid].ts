import type { NextApiRequest, NextApiResponse } from "next";
import { carouselImages } from "../_utils/carrousel";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  res.status(200).json(carouselImages.map((i) => i.guid));
}
