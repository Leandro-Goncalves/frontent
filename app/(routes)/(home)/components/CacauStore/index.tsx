import { Title } from "@/app/components/Title";
import Image from "next/image";
import { OurStory } from "./components/OurStory";

interface CacauStoreProps {}

export const CacauStore: React.FC<CacauStoreProps> = () => {
  return (
    <div>
      <Title>Nossa história</Title>
      <OurStory />

      <Title className="mt-[70px] mb-4 scroll-mt-[200px]" id="ourStore">
        Nossa loja
      </Title>
      <Image
        alt="cacau store"
        src={"/images/banner2.png"}
        width={1174}
        height={650}
      />
    </div>
  );
};
