import { Feedback } from "./components/Feedback";
import { feedbackData } from "./feedbackData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface FeedbacksProps {}

export const Feedbacks: React.FC<FeedbacksProps> = () => {
  return (
    <div className="p-[76px] px-[47px] bg-primary/40 max-[1000px]:p-4">
      <div className="overflow-hidden">
        <p className="text-[84px] leading-[69px] font-bold max-w-[823px] text-white max-[1000px]:text-3xl">
          Feedback das nossas Cacauzetes
        </p>
        <p className="text-2xl font-bold text-white mb-8 mt-2 max-[1000px]:text-xl max-[1000px]:mb-2">
          Veja oque os nossos clientes estão falando!
        </p>

        <div className="relative mt-20 max-[500px]:mt-8">
          <Carousel
            opts={{
              loop: true,
            }}
          >
            <div className="absolute -top-[28px] right-[48px] max-[500px]:hidden">
              <CarouselPrevious className="w-10 h-10 bg-primary text-white hover:bg-primary hover:text-white" />
              <CarouselNext className="w-10 h-10 bg-primary text-white hover:bg-primary hover:text-white" />
            </div>
            <CarouselContent>
              {feedbackData.map((data, index) => (
                <CarouselItem
                  key={index}
                  className="basis-[425px] max-[500px]:basis-[80%]"
                >
                  <div>
                    <Feedback feedback={data} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};
