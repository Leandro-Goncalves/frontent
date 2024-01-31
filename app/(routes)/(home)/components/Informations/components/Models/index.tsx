"use client";

import Image from "next/image";
import { useState } from "react";
import { Tag } from "../../../Feedbacks/components/Feedback/components/Tag";
import { cn } from "@/lib/utils";

interface ModelsProps {}

const data = [
  {
    src: "/images/store.png",
    title: "Modelo americano",
    text: "O tecido Suede promete alta durabilidade e resistência.Nossos pijamas americanos vem com a proposta de proporcionar aconchego em seu sono ou no dia-a-dia. Além de lindos e estilosos, o tecido é macio, leve e de textura agradável, proporcionando muito conforto. 🥰✨ <br/><br/>Quem não ama ficar confortável?",
  },
  {
    src: "/images/store.png",
    title: "Modelo americano",
    text: "O tecido Suede promete alta durabilidade e resistência.Nossos pijamas americanos vem com a proposta de proporcionar aconchego em seu sono ou no dia-a-dia. Além de lindos e estilosos, o tecido é macio, leve e de textura agradável, proporcionando muito conforto. 🥰✨ <br/><br/>Quem não ama ficar confortável?",
  },
  {
    src: "/images/store.png",
    title: "Modelo americano",
    text: "O tecido Suede promete alta durabilidade e resistência.Nossos pijamas americanos vem com a proposta de proporcionar aconchego em seu sono ou no dia-a-dia. Além de lindos e estilosos, o tecido é macio, leve e de textura agradável, proporcionando muito conforto. 🥰✨ <br/><br/>Quem não ama ficar confortável?",
  },
];

export const Models: React.FC<ModelsProps> = () => {
  const [selectedInfoItemIndex, setSelectedInfoItemIndex] = useState(0);
  const selectedInfoItem = data[selectedInfoItemIndex];

  return (
    <div className="mt-10 flex gap-6 max-[1000px]:flex-col flex-col">
      {data.map((infoItem, index) => {
        const isOdd = index % 2 === 0;

        return (
          <div
            key={index}
            className={cn(
              "rounded-3xl overflow-hidden flex items-center",
              isOdd ? "flex-row border-2" : "flex-row-reverse",
              "max-[1050px]:flex-col max-[1050px]:border-2"
            )}
          >
            <Image
              alt="imagem da loja"
              src={infoItem.src}
              width={457}
              height={577}
              className="rounded-3xl max-[1050px]:w-full"
            />
            <div className="w-full flex items-center justify-center flex-col p-8 text-center">
              <h2 className="text-2xl font-bold mb-8 max-w-sm">
                {infoItem.title}
              </h2>
              <h3
                className="max-w-lg"
                dangerouslySetInnerHTML={{ __html: infoItem.text }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
