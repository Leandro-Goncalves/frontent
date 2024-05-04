"use client";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Image from "next/image";
import env from "@/app/env";
import { Carousel as ICarousel } from "@/app/models/carousel";

interface CarouselProps {
  images: ICarousel[];
}

export const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [width, setWidth] = useState(0);
  const carousel = useRef<AliceCarousel>(null);

  const handleDragStart = (e: any) => e.preventDefault();

  const items = useMemo(
    () =>
      images.map(({ uuid, url, link }, index) => (
        <Image
          onClick={() => {
            if (link) {
              window.open(link, "_blank");
            }
          }}
          key={uuid}
          priority
          width={1324}
          height={534}
          data-value={index}
          src={`${env.CDN_URL}/${url}`}
          onDragStart={handleDragStart}
          alt="carrousel com imagens de produtos"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            cursor: "pointer",
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
          "w-2 h-2 rounded-full border-2 border-secondary mx-1 box-content",
          isActive && "bg-primary w-8 border-primary"
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
    </div>
  );
};
