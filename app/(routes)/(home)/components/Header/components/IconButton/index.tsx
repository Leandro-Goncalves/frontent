import React from "react";
import { Button } from "@/components/ui/button";

interface IconButtonProps {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
  badge?: number;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, title, onClick, badge }, ref) => {
    return (
      <Button
        ref={ref}
        variant="link"
        onClick={onClick}
        className="flex-col h-auto p-2 text-[#1B123D] relative"
      >
        {icon}
        <p className="text-xs font-bold max-w-[70px] overflow-hidden whitespace-nowrap text-ellipsis">
          {title}
        </p>
        {badge ? (
          <div className="absolute top-0 right-2 min-w-[20px] min-h-[20px] p-[2px]  rounded-full bg-[#DC024F] flex items-center justify-center text-white text-xs font-bold">
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
