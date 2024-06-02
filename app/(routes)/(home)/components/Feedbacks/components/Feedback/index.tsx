"use client";

import env from "@/app/env";
import { Feedback as IFeedback } from "@/app/models/feedback";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface FeedbackProps {
  feedback: Pick<IFeedback, "uuid" | "url">;
}

export const Feedback: React.FC<FeedbackProps> = ({ feedback }) => {
  return (
    <div
      className={cn(
        "h-[400px] w-[400px] my-auto max-[500px]:w-full max-[500px]:h-auto"
      )}
    >
      <Image
        className="w-full h-auto bg-red-400"
        src={`${env.CDN_URL}/${feedback.url}`}
        alt="feedback"
        width={400}
        height={400}
      />
    </div>
  );
};
