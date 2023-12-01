"use client";
import { cn } from "@/lib/utils";
import { Tag } from "./components/Tag";
import Image from "next/image";

interface FeedbackProps {}

export const Feedback: React.FC<FeedbackProps> = () => {
  return (
    <div
      className={cn(
        "transition-opacity flex flex-shrink-0 w-full justify-between px-8 py-14 bg-[#FBDCDC] rounded-3xl text-[#545454]",
        "max-[1000px]:flex-col-reverse max-[1000px]:items-center"
      )}
    >
      <div className="max-w-[300px] mr-16 flex-shrink-0 max-[1000px]:mr-0 max-[1000px]:max-w-[500px] max-[1000px]:mt-4">
        <h2 className="text-2xl font-bold mb-2">Muito top</h2>
        <p className="text-xs font-bold mb-8">
          ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam eaque ipsa, quae aut
          perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo
          inventore veritatis et quasi architecto beatae vitaeb illo inventore
          veritatis eoloremque laudantium, totam rem aperiam eaque ipsa, quae ab
          illo inventore veritatis et quasi architecto beatae vitaeb illo
          inventore veritatis et quasi art quasi architecto beatae vitae
        </p>

        <div>
          <p className="text-xs font-bold leading-3">nauas burguer</p>
          <p className="text-[#959595] text-[10px] font-bold  leading-3">
            @nauasburguer
          </p>
        </div>

        <div className="flex flex-row gap-2 mt-8">
          <Tag>Confortavel</Tag>
          <Tag>Confortavel</Tag>
          <Tag>Confortavel</Tag>
        </div>
      </div>

      <div
        className={cn(
          "h-[296px] w-[353px] my-auto",
          "max-[1000px]:w-full max-[1000px]:max-w-[380px] max-[1000px]:h-auto"
        )}
      >
        <Image
          className="w-full h-auto rounded-3xl bg-red-400"
          src="/removeImages/1.png"
          alt="ToDo"
          width={353}
          height={296}
        />
      </div>
    </div>
  );
};
