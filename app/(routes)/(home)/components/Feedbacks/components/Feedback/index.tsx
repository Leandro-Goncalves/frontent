"use client";
import { cn } from "@/lib/utils";
import { Tag } from "./components/Tag";
import Image from "next/image";

interface FeedbackProps {
  feedback: {
    name: string;
    feedbackTitle: string;
    feedback: string;
  };
}

export const Feedback: React.FC<FeedbackProps> = ({ feedback }) => {
  return (
    <div
      className={cn(
        "transition-opacity flex flex-shrink-0 w-full justify-between px-8 py-14 bg-[#FBDCDC] rounded-3xl text-[#545454] h-full",
        "max-[1500px]:items-center"
      )}
    >
      <div className="max-w-[300px] mr-16 flex-shrink-0 max-[1500px]:mr-0  max-[1500px]:mt-4">
        <h2 className="text-2xl font-bold mb-2">{feedback.feedbackTitle}</h2>
        <p className="text-xs font-bold mb-8">{feedback.feedback}</p>

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

      <div className={cn("h-[296px] w-[353px] my-auto", "max-[1500px]:hidden")}>
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
