import { storeCarouselService } from "@/app/services/storeCarousel";
import { StoreCarouselContent } from "./components/StoreCarouselContent";

const Page = async () => {
  const storeCarousel = await storeCarouselService
    .getAll()
    .catch(() => ({ data: [] }));

  return (
    <div className="w-full">
      <StoreCarouselContent data={storeCarousel.data} />
    </div>
  );
};

export default Page;
