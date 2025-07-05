"use client";

import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
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

interface PieChartProps {
  data: any[];
  config: ChartConfig;
  className?: string;
  dataKey?: string;
  nameKey?: string;
  showLegend?: boolean;
  showTooltip?: boolean;
  showLabels?: boolean;
}

const PieChart = ({
  data,
  config,
  className,
  dataKey = "value",
  nameKey = "name",
  showLegend = true,
  showTooltip = true,
  showLabels = false,
}: PieChartProps) => {
  const COLORS = Object.values(config).map((item) => item.color);

  return (
    <ChartContainer config={config} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={
              showLabels
                ? ({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                : false
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey={dataKey}
            nameKey={nameKey}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
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
        </RechartsPieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export { PieChart };
