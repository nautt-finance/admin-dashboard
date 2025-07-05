import { Card } from "./card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
  icon?: LucideIcon;
  className?: string;
  format?: "currency" | "percentage" | "number";
}

const KpiCard = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  className,
  format = "number",
}: KpiCardProps) => {
  const formatValue = (val: string | number) => {
    if (format === "currency") {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(val));
    }
    if (format === "percentage") {
      return `${val}%`;
    }
    return val;
  };

  const getChangeColor = () => {
    switch (changeType) {
      case "increase":
        return "text-green-600";
      case "decrease":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case "increase":
        return "↗";
      case "decrease":
        return "↘";
      default:
        return "→";
    }
  };

  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">
            {formatValue(value)}
          </p>
          {change !== undefined && (
            <div
              className={cn(
                "flex items-center gap-1 text-sm",
                getChangeColor()
              )}
            >
              <span>{getChangeIcon()}</span>
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="p-2 rounded-full bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        )}
      </div>
    </Card>
  );
};

export { KpiCard };
