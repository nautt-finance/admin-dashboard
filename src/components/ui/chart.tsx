"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

interface ChartContainerProps extends React.ComponentProps<"div"> {
  config: ChartConfig;
  children: React.ReactNode;
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ config, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/25 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <div className="w-full h-full">{children}</div>
      </div>
    );
  }
);
ChartContainer.displayName = "ChartContainer";

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  config: ChartConfig;
}

const ChartTooltip = ({
  active,
  payload,
  label,
  config,
}: ChartTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-md">
        <div className="grid gap-2">
          {label && <div className="font-medium text-foreground">{label}</div>}
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-muted-foreground">
                {config[entry.dataKey]?.label || entry.dataKey}:
              </span>
              <span className="text-sm font-medium text-foreground">
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

interface ChartLegendProps {
  payload?: any[];
  config: ChartConfig;
}

const ChartLegend = ({ payload, config }: ChartLegendProps) => {
  if (!payload?.length) return null;

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-muted-foreground">
            {config[entry.dataKey]?.label || entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export { ChartContainer, ChartTooltip, ChartLegend, type ChartConfig };
