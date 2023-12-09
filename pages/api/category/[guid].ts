import { Category } from "@/app/models/category";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any[]>
) {
  res.status(200).json([
    {
      uuid: "ce23354b-7024-47f2-b5cf-40730d798d8e",
      name: "Pijamas carol",
      Products: [
        {
          uuid: "030fc4ea-0aa9-4fe0-8eb0-8c7f45f1f976",
          name: "Shortdoll rosa",
          description: "descrição",
          price: 119.9,
          quantity: 3,
          isActive: true,
          categoryUuid: "ce23354b-7024-47f2-b5cf-40730d798d8e",
          establishmentUuid: "6a2e075b-8ddf-4165-970a-273d952c0b96",
          createdAt: "2023-11-30T21:37:15.210Z",
          updatedAt: "2023-11-30T21:39:49.118Z",
          Image: [
            {
              imageId: "93aaf982-ed84-48f7-a794-db6d84d3e3c6.webp",
            },
            {
              imageId: "653d0fa0-f2c4-4cae-9596-f8981b1a092c.webp",
            },
          ],
          sizes: [
            {
              uuid: "da51d22c-70df-422c-a214-31d8a88568d9",
              name: "p",
            },
            {
              uuid: "de4e5b60-00bd-4fe4-ae33-7667e7191c7f",
              name: "m",
            },
            {
              uuid: "91e835a0-97fb-4ee4-913a-e72d6acef25a",
              name: "g",
            },
          ],
        },
        {
          uuid: "805759a2-5854-4d9e-b731-ab8ea3e7bf1b",
          name: "Baby alça Adventure Time",
          description: "descrição",
          price: 84.9,
          quantity: 3,
          isActive: true,
          categoryUuid: "ce23354b-7024-47f2-b5cf-40730d798d8e",
          establishmentUuid: "6a2e075b-8ddf-4165-970a-273d952c0b96",
          createdAt: "2023-11-30T21:38:31.593Z",
          updatedAt: "2023-11-30T21:39:49.118Z",
          Image: [
            {
              imageId: "eff4f5fb-8e62-41ee-9cb9-e6563de32ff9.webp",
            },
            {
              imageId: "99284cbd-348c-4cf0-92b6-cf8fca6d8ece.webp",
            },
          ],
          sizes: [
            {
              uuid: "de4e5b60-00bd-4fe4-ae33-7667e7191c7f",
              name: "m",
            },
            {
              uuid: "91e835a0-97fb-4ee4-913a-e72d6acef25a",
              name: "g",
            },
            {
              uuid: "db4dd17c-fe56-4f78-9649-553d830feedd",
              name: "plus",
            },
          ],
        },
        {
          uuid: "cf32c78c-8852-494d-b0c8-217636974ef1",
          name: "Americano liso preto",
          description: "descrição",
          price: 119.9,
          quantity: 3,
          isActive: true,
          categoryUuid: "ce23354b-7024-47f2-b5cf-40730d798d8e",
          establishmentUuid: "6a2e075b-8ddf-4165-970a-273d952c0b96",
          createdAt: "2023-11-30T21:36:25.825Z",
          updatedAt: "2023-11-30T21:39:49.118Z",
          Image: [
            {
              imageId: "92e08ac1-c269-48cc-8055-e00986b203fb.webp",
            },
            {
              imageId: "ef6958af-f612-4178-8613-f83e2fe430c5.webp",
            },
          ],
          sizes: [
            {
              uuid: "da51d22c-70df-422c-a214-31d8a88568d9",
              name: "p",
            },
            {
              uuid: "91e835a0-97fb-4ee4-913a-e72d6acef25a",
              name: "g",
            },
          ],
        },
      ],
    },
    {
      uuid: "2483eb05-c767-469c-a6d4-c121fb50fa7d",
      name: "Outra categoria",
      Products: [
        {
          uuid: "76f6c792-59a0-4d3a-a9f5-08267f10ae6e",
          name: "Produto de teste",
          description: "descrição",
          price: 100,
          quantity: 3,
          isActive: true,
          categoryUuid: "2483eb05-c767-469c-a6d4-c121fb50fa7d",
          establishmentUuid: "6a2e075b-8ddf-4165-970a-273d952c0b96",
          createdAt: "2023-11-30T22:30:54.968Z",
          updatedAt: "2023-11-30T22:31:24.755Z",
          Image: [
            {
              imageId: "abd82a32-746a-49ab-8bd6-08183cf5fcfb.png",
            },
          ],
          sizes: [
            {
              uuid: "de4e5b60-00bd-4fe4-ae33-7667e7191c7f",
              name: "m",
            },
            {
              uuid: "91e835a0-97fb-4ee4-913a-e72d6acef25a",
              name: "g",
            },
            {
              uuid: "db4dd17c-fe56-4f78-9649-553d830feedd",
              name: "plus",
            },
          ],
        },
      ],
    },
  ]);
}
