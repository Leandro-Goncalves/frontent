import { Title } from "@/app/components/Title";
import { Models } from "./components/Models";
import Image from "next/image";
import { Doubts } from "./components/Doubts";
import { BackToHomeButton } from "@/app/components/BackToHomeButton";
import { Suspense } from "react";
import { ModelsLoading } from "./components/Models/loading";

interface InformationsProps {}

export const Informations: React.FC<InformationsProps> = () => {
  return (
    <div>
      <Title>Nossos modelos</Title>
      <Suspense fallback={<ModelsLoading />}>
        <Models />
      </Suspense>

      {/* <Title className="mt-[70px]">Nossos tamanhos</Title>
      <Image
        className="mt-10 w-full"
        src={"/images/banner1.png"}
        alt="levando conforto e estilo a todas as mulheres (do p ao plus)"
        width={1139}
        height={472}
      />

      <Title className="mt-[70px]">Nosso tecido</Title>
      <Models /> */}

      <h3
        className="text-2xl font-bold mt-[70px] mb-3 scroll-mt-[200px]"
        id="doubts"
      >
        DÚVIDAS FREQUENTES
      </h3>
      <Doubts />
    </div>
  );
};
