"use client";

import { Card } from "@/components/ui/card";
import { PeriodFilter, type PeriodType } from "@/components/ui/period-filter";
import { BarChart } from "@/components/charts";
import { ChartConfig } from "@/components/ui/chart";

interface CashflowData {
  period: string;
  income: number;
  expenses: number;
  balance: number;
}

interface CashflowSummaryProps {
  className?: string;
  data: CashflowData[];
  config: ChartConfig;
  selectedPeriod: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
}

const CashflowSummary = ({
  className,
  data,
  config,
  selectedPeriod,
  onPeriodChange,
}: CashflowSummaryProps) => {
  return (
    <div className={`${className} space-y-4`}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Fluxo de Caixa</h2>
          <PeriodFilter selected={selectedPeriod} onSelect={onPeriodChange} />
        </div>
      </div>
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          Resumo do Fluxo de Caixa -{" "}
          {selectedPeriod === "daily"
            ? "Diário"
            : selectedPeriod === "weekly"
              ? "Semanal"
              : selectedPeriod === "monthly"
                ? "Mensal"
                : "Anual"}
        </h3>
        <BarChart
          data={data}
          config={config}
          xAxisKey="period"
          yAxisKeys={["income", "expenses", "balance"]}
          className="h-80"
        />
      </Card>
    </div>
  );
};

export { CashflowSummary };
