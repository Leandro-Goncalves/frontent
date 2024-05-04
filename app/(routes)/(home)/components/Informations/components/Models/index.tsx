import Image from "next/image";
import { cn } from "@/lib/utils";
import { fabricsService } from "@/app/services/fabrics";
import env from "@/app/env";

interface ModelsProps {}

const data = [
  {
    src: "/images/store.png",
    title: "Americano",
    text: "As versões são uma tendência entre as nossas Cacauzetes, pode ser composto por short ou calça, camisa longa ou curta. É um estilo próprio, transmite muita sofisticação e personalidade. Pode ser usados em qualquer ocasião ou em momentos bem específicos como na amamentação.",
  },
  {
    src: "/images/store.png",
    title: "Maridão",
    text: "O Modelo desenhado especialmente para as Cacauzetes que amam o conforto das camisas do marido, mas que querem manter o estilo. Um modelo casual, estiloso e versátil. Ideal para quem ama dormir confortável e relaxar no dia-a-dia.",
  },
  {
    src: "/images/store.png",
    title: "Baby alça",
    text: "Liberdade deveria ser o nome desse modelo. Além de ser ideal para o verão, deixando pernas e braços livres, é um modelo que transmite leveza e aconchego. Por aqui, um dos modelos mais amados por nossas Cacauzetes.",
  },
  {
    src: "/images/store.png",
    title: "Baby Manguinha",
    text: "O verdadeiro da cama para as ruas, o queridinho para quem ama uma moda versátil, facilmente pode ser usado e adaptado para montar lookinhos.",
  },
];

export const Models: React.FC<ModelsProps> = async () => {
  const fabrics = await fabricsService.get();
  return (
    <div className="mt-10 flex gap-6 max-[1250px]:flex-col flex-col">
      {fabrics.data.map(({ guid, url, description, name }, i) => {
        const isOdd = i % 2 === 0;

        return (
          <div
            key={guid}
            className={cn(
              "rounded-3xl overflow-hidden flex items-center",
              isOdd ? "flex-row border-2" : "flex-row-reverse",
              "max-[1250px]:flex-col max-[1250px]:border-2"
            )}
          >
            <Image
              alt={name}
              src={`${env.CDN_URL}/${url}`}
              width={457}
              height={577}
              className="rounded-3xl max-[1250px]:w-full shrink-0 h-auto w-[640px]"
            />
            <div className="w-full flex items-center flex-col p-8 text-center">
              <h2 className="text-2xl font-bold mb-8 max-w-sm">{name}</h2>
              <h3 className="max-w-xl text-xl">{description}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};
