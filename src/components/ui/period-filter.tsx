"use client";

import { Button } from "./button";
import { cn } from "@/lib/utils";

type PeriodType = "daily" | "weekly" | "monthly" | "yearly";

interface PeriodFilterProps {
  selected: PeriodType;
  onSelect: (period: PeriodType) => void;
  className?: string;
}

const PeriodFilter = ({ selected, onSelect, className }: PeriodFilterProps) => {
  const periods: { value: PeriodType; label: string }[] = [
    { value: "daily", label: "Diário" },
    { value: "weekly", label: "Semanal" },
    { value: "monthly", label: "Mensal" },
    { value: "yearly", label: "Anual" },
  ];

  return (
    <div className={cn("flex gap-2", className)}>
      {periods.map((period) => (
        <Button
          key={period.value}
          variant={selected === period.value ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(period.value)}
        >
          {period.label}
        </Button>
      ))}
    </div>
  );
};

export { PeriodFilter, type PeriodType };
