"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  addDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";
import { DateItem, DateItemState } from "../SelectDate";
import { useEffect, useState } from "react";

interface PreDefinitionsProps {
  date?: DateItemState;
  setDate(date: DateItem): void;
}

const currentDate = new Date();
const lastWeekDate = subWeeks(currentDate, 1);
const lastMonth = subMonths(currentDate, 1);
const lastQuarterDate = subMonths(currentDate, 3);
const lastYear = subYears(currentDate, 1);

const selectDate: DateItem[] = [
  {
    label: "Últimos 7 dias",
    from: addDays(new Date(), -6),
    to: new Date(),
    alowToday: true,
  },
  {
    label: "Últimos 14 dias",
    from: addDays(new Date(), -13),
    to: new Date(),
    alowToday: true,
  },
  {
    label: "Últimos 28 dias",
    from: addDays(new Date(), -27),
    to: new Date(),
    alowToday: true,
  },
  {
    label: "Últimos 30 dias",
    from: addDays(new Date(), -29),
    to: new Date(),
    alowToday: true,
  },
  {
    label: "Hoje",
    from: new Date(),
    to: new Date(),
  },
  {
    label: "Semana passada",
    from: startOfWeek(lastWeekDate),
    to: endOfWeek(lastWeekDate),
  },
  {
    label: "Esse mês",
    from: startOfMonth(currentDate),
    to: new Date(),
    alowToday: true,
  },
  {
    label: "Mês passado",
    from: startOfMonth(lastMonth),
    to: endOfMonth(lastMonth),
  },
  {
    label: "Esse trimestre",
    from: startOfQuarter(currentDate),
    to: new Date(),
    alowToday: true,
  },
  {
    label: "Trimestre passado",
    from: startOfQuarter(lastQuarterDate),
    to: endOfQuarter(lastQuarterDate),
  },
  {
    label: "Esse ano",
    from: startOfYear(currentDate),
    to: new Date(),
    alowToday: true,
  },
  {
    label: "Ano passado",
    from: startOfYear(lastYear),
    to: endOfYear(lastYear),
  },
];

export const PreDefinitions: React.FC<PreDefinitionsProps> = ({
  date,
  setDate,
}) => {
  const [index, setIndex] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (date?.type === "custom") {
      setIndex(undefined);
    }
  }, [date, setIndex]);

  return (
    <Select
      value={String(index)}
      onValueChange={(value) => {
        const index = parseInt(value);
        setIndex(index);
        setDate(selectDate[index]);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder={"Selecionar período"} aria-label="Select">
          {date?.type === "custom"
            ? "Customizado"
            : selectDate[index || 0].label}
        </SelectValue>
      </SelectTrigger>
      <SelectContent position="popper">
        {selectDate.map((item, index) => (
          <SelectItem key={item.label} value={String(index)}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
