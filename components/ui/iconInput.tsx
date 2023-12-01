import { cn } from "@/lib/utils";
import React from "react";

export type IconInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ReactNode;
};

const IconInput = React.forwardRef<HTMLInputElement, IconInputProps>(
  ({ className, id, icon, ...props }, ref) => {
    const internalId = id ?? Math.random().toString(36).slice(2);

    return (
      <div
        className={cn(
          "flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2",
          className
        )}
      >
        <label htmlFor={internalId}>{icon}</label>
        <input
          id={internalId}
          {...props}
          type="search"
          ref={ref}
          className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 bg-transparent"
        />
      </div>
    );
  }
);

IconInput.displayName = "IconInput";

export { IconInput };
