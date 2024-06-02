import { randomUUID } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { id } = req.query;
  console.log("id", id);
  const image = await fetch(`https://cacau.b-cdn.net/${id}`);
  console.log("image", image);

  const blob = await image.blob();
  console.log("blob", blob);

  const buffer = await blob.arrayBuffer();
  console.log("buffer", buffer);

  const ID = Array.isArray(id) ? id[0] ?? "" : id ?? "";

  const IDType = ID.split(".").at(-1);

  res.setHeader("Content-Type", blob.type);
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${randomUUID()}.${IDType}`
  );
  res.send(Buffer.from(buffer) as any);
}
