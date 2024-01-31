"use client";
import { Feedback } from "./components/Feedback";
import { feedbackData } from "./feedbackData";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useMediaQuery } from "react-responsive";

interface FeedbacksProps {}

export const Feedbacks: React.FC<FeedbacksProps> = () => {
  const section = useRef<HTMLDivElement>(null);
  const percent = 0.5;
  const [padding, setPadding] = useState(0);

  const carouselRef = useRef<AliceCarousel>(null);

  const isMobile = useMediaQuery({ query: "(max-width: 1000px)" });

  const syncState = () => {
    const { current } = section;
    if (current) {
      setPadding(current.offsetWidth * percent);
    }
  };
  const items = useMemo(
    () =>
      feedbackData.map((feedback, i) => (
        <div className="pl-4 pr-4 h-[450px]" key={i}>
          <Feedback feedback={feedback} />
        </div>
      )),
    []
  );

  const handlePrevious = () => {
    carouselRef?.current?.slidePrev();
  };

  const handleNext = () => {
    carouselRef?.current?.slideNext();
  };

  useEffect(syncState, []);

  return (
    <div className="p-[76px] bg-[#1B123D] max-[1000px]:p-4">
      <div className="overflow-hidden">
        <p className="text-[84px] leading-[69px] font-bold max-w-[823px] text-[#F2F2F2] max-[1000px]:text-3xl">
          Feedback das nossas Cacauzetes
        </p>
        <p className="text-2xl font-bold text-[#FBDCDC] mb-8 mt-2 max-[1000px]:text-xl max-[1000px]:mb-2">
          Veja oque os nossos clientes estão falando!
        </p>
        <div className="w-full flex justify-end mb-2 gap-4">
          <Button
            className="rounded-full"
            onClick={handlePrevious}
            size={"icon"}
          >
            <ArrowLeft />
          </Button>
          <Button className="rounded-full" onClick={handleNext} size={"icon"}>
            <ArrowRight />
          </Button>
        </div>

        <div ref={section}>
          <AliceCarousel
            ref={carouselRef}
            infinite
            disableButtonsControls
            disableDotsControls
            mouseTracking
            touchTracking
            items={items}
            paddingRight={isMobile ? 0 : padding}
            onResized={syncState}
          />
        </div>
      </div>
    </div>
  );
};
