import env from "@/app/env";
import { carouselService } from "@/app/services/carousel";
import { Carousel } from "./components/Carousel";
import { Feedbacks } from "./components/Feedbacks";
import { TabButtons } from "./components/TabButtons";

export const revalidate = 3600;
export default async function Home() {
  const { data: carousel } = await carouselService.get(env.ESTABLISHMENT_ID);

  return (
    <main>
      <Carousel images={carousel} />
      <TabButtons />
      <Feedbacks />
    </main>
  );
}
