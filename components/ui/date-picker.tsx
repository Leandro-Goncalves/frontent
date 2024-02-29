"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ptBR } from "date-fns/locale";
import { DayPickerSingleProps } from "react-day-picker";

interface DatePickerProps extends Omit<DayPickerSingleProps, "mode"> {
  placeholder?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  placeholder,
  selected,
  ...rest
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full flex justify-start text-left font-normal hover:bg-transparent",
            !selected && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? (
            <span className="normal-case">{format(selected, "dd/MM/yy")}</span>
          ) : (
            <span className="normal-case">
              {placeholder || "Selecione a data"}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          initialFocus
          locale={ptBR}
          {...rest}
        />
      </PopoverContent>
    </Popover>
  );
};
