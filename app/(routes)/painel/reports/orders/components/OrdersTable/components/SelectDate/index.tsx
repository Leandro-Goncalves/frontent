"use client";

import React, { useCallback, useState } from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import { IncludeToday } from "../IncludeToday";
import { PreDefinitions } from "../PreDefinitions";

interface SelectDateProps {
  onSetDate(date: DateRange): void;
  data: {
    from: Date | null;
    to: Date | null;
  };
}
export interface DateItem extends DateRange {
  label: string;
  alowToday?: boolean;
}

export interface DateItemState extends Omit<DateItem, "label" | "from"> {
  type: "custom" | "predefined";
  from?: Date;
}

export const SelectDate: React.FC<SelectDateProps> = ({ onSetDate, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [includeToday, setIncludeToday] = useState(false);
  const [date, setDate] = useState<DateItemState | undefined>({
    type: "custom",
    from: data.from || new Date(),
    to: data.to || new Date(),
  });

  const generateDate = useCallback(
    (date?: DateItemState) => {
      const { from, to, alowToday, type } = date ?? {};
      if (alowToday && includeToday) {
        return { from, to };
      }

      if (type === "custom") {
        return { from, to };
      }
      return { from: from && addDays(from, -1), to: to && addDays(to, -1) };
    },
    [includeToday]
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from && date?.to ? (
            `${format(date.from, "dd/MM/yy", { locale: ptBR })} - ${format(
              date.to,
              "dd/MM/yy",
              { locale: ptBR }
            )}`
          ) : (
            <span>Selecione uma data</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <PreDefinitions
          date={date}
          setDate={(date) => setDate({ ...date, type: "predefined" })}
        />
        {date?.alowToday && (
          <IncludeToday
            isChecked={includeToday}
            onChange={setIncludeToday}
            className="py-2"
          />
        )}
        <div className="rounded-md border">
          <Calendar
            mode="range"
            selected={generateDate(date)}
            onSelect={(range) => {
              setDate({ ...range, type: "custom" });
            }}
            initialFocus
            locale={ptBR}
            disabled={{
              after: new Date(),
            }}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant={"outline"} onClick={() => setIsOpen(false)}>
            cancelar
          </Button>
          <Button
            disabled={date?.from === undefined || date?.to === undefined}
            onClick={() => {
              setIsOpen(false);
              onSetDate(generateDate(date));
            }}
          >
            aplicar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
