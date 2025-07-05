"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  type ChartConfig,
} from "@/components/ui/chart";

interface BarChartProps {
  data: any[];
  config: ChartConfig;
  className?: string;
  xAxisKey?: string;
  yAxisKeys?: string[];
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
}

const BarChart = ({
  data,
  config,
  className,
  xAxisKey = "month",
  yAxisKeys = ["value"],
  showGrid = true,
  showLegend = true,
  showTooltip = true,
}: BarChartProps) => {
  return (
    <ChartContainer config={config} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis dataKey={xAxisKey} tick={{ fontSize: 12 }} tickLine={false} />
          <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          {showTooltip && (
            <Tooltip
              content={({ active, payload, label }) => (
                <ChartTooltip
                  active={active}
                  payload={payload}
                  label={label}
                  config={config}
                />
              )}
            />
          )}
          {showLegend && (
            <Legend
              content={({ payload }) => (
                <ChartLegend payload={payload} config={config} />
              )}
            />
          )}
          {yAxisKeys.map((key) => (
            <Bar
              key={key}
              dataKey={key}
              fill={config[key]?.color || "#3b82f6"}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export { BarChart };
