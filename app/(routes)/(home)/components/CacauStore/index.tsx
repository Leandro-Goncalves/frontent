import { Title } from "@/app/components/Title";
import { OurStory } from "./components/OurStory";
import { storeCarouselService } from "@/app/services/storeCarousel";
import { StoreCarousel } from "./components/StoreCarousel";
import { establishmentService } from "@/app/services/establishment";
import env from "@/app/env";

interface CacauStoreProps {}

export const CacauStore: React.FC<CacauStoreProps> = async () => {
  const { data } = await storeCarouselService.get();
  const { data: establishment } = await establishmentService.get(
    env.ESTABLISHMENT_ID
  );
  return (
    <div>
      <Title>Nossa história</Title>
      <OurStory
        image={establishment.storyImage ?? ""}
        text={establishment.storyText ?? ""}
      />

      <StoreCarousel storeCarousel={data} />
    </div>
  );
};
