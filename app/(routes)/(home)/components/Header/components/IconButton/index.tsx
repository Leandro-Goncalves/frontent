import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IconButtonProps {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
  badge?: number;
  limitMaxText?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, title, onClick, badge, limitMaxText }, ref) => {
    return (
      <Button
        ref={ref}
        variant="link"
        onClick={onClick}
        className="flex-col h-auto p-2 text-foreground relative"
      >
        {icon}
        <p
          className={cn(
            limitMaxText ? "max-w-[70px]" : "",
            "text-xs font-bold overflow-hidden whitespace-nowrap text-ellipsis",
            "max-[410px]:hidden"
          )}
        >
          {title}
        </p>
        {badge ? (
          <div className="absolute top-0 right-2 min-w-[20px] min-h-[20px] p-[2px]  rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
            {badge > 9 ? "9+" : badge}
          </div>
        ) : (
          <></>
        )}
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";
