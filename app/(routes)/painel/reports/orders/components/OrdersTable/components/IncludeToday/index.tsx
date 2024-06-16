"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface IncludeTodayProps {
  isChecked: boolean;
  onChange(checked: boolean): void;
  className?: string;
}

export const IncludeToday: React.FC<IncludeTodayProps> = ({
  isChecked,
  onChange,
  className,
}) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Checkbox
        id="include-today"
        checked={isChecked}
        onCheckedChange={onChange}
      />
      <label
        htmlFor="include-today"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Incluir hoje
      </label>
    </div>
  );
};
