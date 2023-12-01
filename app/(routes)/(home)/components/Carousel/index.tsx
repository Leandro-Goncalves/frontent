"use client";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { CarouselButton } from "./components/CarouselButton";
import Image from "next/image";
import env from "@/app/env";

interface CarouselProps {
  images: string[];
}

export const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [width, setWidth] = useState(0);
  const carousel = useRef<AliceCarousel>(null);

  const handleDragStart = (e: any) => e.preventDefault();

  const items = useMemo(
    () =>
      images.map((src, index) => (
        <Image
          key={src}
          priority
          width={1324}
          height={534}
          data-value={index}
          src={`${env.CDN_URL}/${src}`}
          onDragStart={handleDragStart}
          alt="carrousel com imagens de produtos"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      )),
    [images]
  );

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderDotsItem = ({ isActive }: any) => {
    return (
      <button
        className={cn(
          "transition-all max-[1000px]:hidden",
          "w-2 h-2 rounded-full border-2 border-[#F38BB0] mx-1 box-content",
          isActive && "bg-[#D72967] w-8 border-[#D72967]"
        )}
      />
    );
  };

  return (
    <div className="relative">
      <AliceCarousel
        autoPlay
        autoPlayInterval={3000}
        infinite
        disableButtonsControls
        mouseTracking
        touchTracking
        items={items}
        autoWidth={width === 0}
        innerWidth={width}
        renderDotsItem={renderDotsItem}
        ref={carousel}
      />

      <CarouselButton
        className="absolute left-6 bottom-[50%] translate-y-[50%]"
        onClick={(e) => carousel?.current?.slidePrev(e)}
      />
      <CarouselButton
        className="absolute right-6 bottom-[50%] translate-y-[50%]"
        onClick={(e) => carousel?.current?.slideNext(e)}
      />
    </div>
  );
};
