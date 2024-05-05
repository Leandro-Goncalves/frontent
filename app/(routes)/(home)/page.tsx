import env from "@/app/env";
import { carouselService } from "@/app/services/carousel";
import { Carousel } from "./components/Carousel";
import { Feedbacks } from "./components/Feedbacks";
import { TabButtons } from "./components/TabButtons";

export default async function Home({ searchParams }: any) {
  const { data: carousel } = await carouselService.get(env.ESTABLISHMENT_ID);

  return (
    <main>
      <Carousel images={carousel} />
      <TabButtons defaultTab={searchParams.link} />
      <Feedbacks />
    </main>
  );
}
