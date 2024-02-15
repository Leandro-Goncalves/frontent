import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { id } = req.query;
  const image = await fetch(`https://cacau.b-cdn.net/${id}`);

  const blob = await image.blob();
  const buffer = await blob.arrayBuffer();

  res.setHeader("Content-Type", blob.type);
  res.setHeader("Content-Disposition", `attachment; filename=${id}`);
  res.send(Buffer.from(buffer) as any);
}
