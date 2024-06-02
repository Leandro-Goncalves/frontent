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

  res.setHeader("Content-Type", blob.type);
  res.setHeader("Content-Disposition", `attachment; filename=${id}`);
  res.send(Buffer.from(buffer) as any);
}
