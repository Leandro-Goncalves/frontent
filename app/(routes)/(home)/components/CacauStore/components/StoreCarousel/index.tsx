"use client";
import { Title } from "@/app/components/Title";
import { StoreCarousel as IStoreCarousel } from "@/app/models/storeCarousel";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import env from "@/app/env";
import { useEffect, useState } from "react";

interface StoreCarouselProps {
  storeCarousel: IStoreCarousel[];
}

export const StoreCarousel: React.FC<StoreCarouselProps> = ({
  storeCarousel,
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (api) {
      api.on("select", () => {
        setIndex(api.internalEngine().index.get());
      });
    }
  }, [api]);

  if (!storeCarousel || storeCarousel.length === 0) {
    return null;
  }

  return (
    <>
      <Title className="mt-[70px] mb-4 scroll-mt-[200px]" id="ourStore">
        {storeCarousel[index].title}
      </Title>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {storeCarousel.map((item) => (
            <CarouselItem key={item.uuid}>
              <Image
                alt={item.title}
                src={`${env.CDN_URL}/${item.url}`}
                width={1174}
                height={650}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </>
  );
};
