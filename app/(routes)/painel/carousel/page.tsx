import env from "@/app/env";
import { carouselService } from "@/app/services/carousel";
import { CarouselContent } from "./components/CarouselContent";

const Page = async () => {
  const carousel = await carouselService
    .getAll(env.ESTABLISHMENT_ID)
    .catch(() => ({ data: [] }));

  return (
    <div className="w-full h-[100vh] overflow-auto">
      <CarouselContent data={carousel.data} />
    </div>
  );
};

export default Page;
