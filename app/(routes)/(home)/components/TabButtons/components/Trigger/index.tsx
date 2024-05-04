"use client";

import { GAEvents, sendGAEvent } from "@/app/utils/GAEvents";
import { TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface TriggerProps {
  name: string;
  label: string;
  eventName: keyof GAEvents["tabs"];
}

export const Trigger: React.FC<TriggerProps> = ({ name, label, eventName }) => {
  return (
    <TabsTrigger
      onClick={() => {
        sendGAEvent("tabs", eventName);
      }}
      id={`tab-${name}`}
      value={name}
      className={cn(
        "py-8 px-16  text-foreground rounded-xl relative scroll-mt-[200px]",
        "data-[state=active]:!bg-primary/40",
        "after:absolute after:right-[-4px] after:top-5 max-md:after:top-2 after:bottom-5 max-md:after:bottom-2 after:w-1 max-md:after:w-0.5 after:rounded-full after:bg-border",
        "last:after:opacity-0",
        "max-md:py-4 max-md:px-4 max-md:text-xs"
      )}
    >
      {label}
    </TabsTrigger>
  );
};
