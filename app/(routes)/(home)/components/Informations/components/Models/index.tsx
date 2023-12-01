"use client";

import Image from "next/image";
import { useState } from "react";
import { Tag } from "../../../Feedbacks/components/Feedback/components/Tag";

interface ModelsProps {}

const data = [
  {
    src: "/images/store.png",
    title: "Modelo americano",
    text: `Eu me chamo Carolina, tenho 26 anos, sou casada com o melhor amigo e sócio que eu poderia ter, sou cristã e empreendedora.<br/><br/>A CACAU STORE nasceu em um dos momentos mais difíceis das nossas vidas. Após eu ser diagnosticada com síndrome de burnout e início de uma depressão, fui afastada do CLT para iniciar o tratamento de cura.Ainda em tratamento, decidida que eu não voltaria a ultrapassar meus limites, Deus floresceu a vontade de empreender dentro de mim. Abri mão das minhas certezas para viver algo novo, onde coloquei os pés e Deus tem colocado o chão. Através de uma realidade ruim, Deus me permitiu voltar a sonhar, e as oportunidades foram surgindo. 💖`,
    tags: ["Confortavel", "Confortavel2", "Confortavel3"],
  },
  {
    src: "/images/store.png",
    title: "Modelo americano",
    text: "asd",
    tags: ["Confortavel1", "Confortavel2", "Confortavel3"],
  },
];

export const Models: React.FC<ModelsProps> = () => {
  const [selectedInfoItemIndex, setSelectedInfoItemIndex] = useState(0);
  const selectedInfoItem = data[selectedInfoItemIndex];

  return (
    <div className="mt-10 flex gap-6 max-[1000px]:flex-col">
      <div className="flex-shrink-0">
        <Image
          alt="imagem da loja"
          src="/images/store.png"
          width={457}
          height={577}
        />
        <div className="flex gap-3 mt-6">
          {data.map((infoItem, index) => (
            <button
              key={infoItem.src}
              disabled={index === selectedInfoItemIndex}
              onClick={() => setSelectedInfoItemIndex(index)}
            >
              <Image
                alt="imagem da loja"
                src={infoItem.src}
                width={93}
                height={92}
              />
            </button>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold">{selectedInfoItem.title}</h2>
        <p
          className="text-lg font-normal mt-9"
          dangerouslySetInnerHTML={{ __html: selectedInfoItem.text }}
        />
        <div className="flex gap-3 mt-8">
          {selectedInfoItem.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
};
