import { Establishment } from "@/app/models/establishment";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Establishment>
) {
  res.status(200).json({
    uuid: "123123",
    alert: "stringaaaa",
    description: "string",
    phone: "19995755514",
    installments: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}
