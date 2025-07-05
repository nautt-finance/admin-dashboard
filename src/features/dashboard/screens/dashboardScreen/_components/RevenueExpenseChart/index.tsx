"use client";

import { Card } from "@/components/ui/card";
import { LineChart, AreaChart, PieChart } from "@/components/charts";
import { ChartConfig } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface RevenueExpenseChartProps {
  className?: string;
}

type ChartType = "line" | "area" | "pie";

const RevenueExpenseChart = ({ className }: RevenueExpenseChartProps) => {
  const [chartType, setChartType] = useState<ChartType>("line");

  // Dados mock para o gráfico
  const timeSeriesData = [
    { month: "Jan", revenue: 120000, expenses: 80000 },
    { month: "Fev", revenue: 135000, expenses: 85000 },
    { month: "Mar", revenue: 142000, expenses: 88000 },
    { month: "Abr", revenue: 155000, expenses: 92000 },
    { month: "Mai", revenue: 148000, expenses: 90000 },
    { month: "Jun", revenue: 162000, expenses: 95000 },
    { month: "Jul", revenue: 175000, expenses: 100000 },
    { month: "Ago", revenue: 168000, expenses: 98000 },
    { month: "Set", revenue: 182000, expenses: 105000 },
    { month: "Out", revenue: 195000, expenses: 110000 },
    { month: "Nov", revenue: 188000, expenses: 108000 },
    { month: "Dez", revenue: 205000, expenses: 115000 },
  ];

  const pieData = [
    {
      name: "Receitas",
      value: timeSeriesData.reduce((sum, item) => sum + item.revenue, 0),
    },
    {
      name: "Despesas",
      value: timeSeriesData.reduce((sum, item) => sum + item.expenses, 0),
    },
  ];

  const chartConfig: ChartConfig = {
    revenue: {
      label: "Receitas",
      color: "#10b981",
    },
    expenses: {
      label: "Despesas",
      color: "#ef4444",
    },
  };

  const pieChartConfig: ChartConfig = {
    Receitas: {
      label: "Receitas",
      color: "#10b981",
    },
    Despesas: {
      label: "Despesas",
      color: "#ef4444",
    },
  };

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return (
          <LineChart
            data={timeSeriesData}
            config={chartConfig}
            xAxisKey="month"
            yAxisKeys={["revenue", "expenses"]}
            className="h-80"
          />
        );
      case "area":
        return (
          <AreaChart
            data={timeSeriesData}
            config={chartConfig}
            xAxisKey="month"
            yAxisKeys={["revenue", "expenses"]}
            className="h-80"
          />
        );
      case "pie":
        return (
          <PieChart
            data={pieData}
            config={pieChartConfig}
            dataKey="value"
            nameKey="name"
            className="h-80"
            showLabels={true}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Receitas vs Despesas</h3>
        <div className="flex gap-2">
          <Button
            variant={chartType === "line" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType("line")}
          >
            Linha
          </Button>
          <Button
            variant={chartType === "area" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType("area")}
          >
            Área
          </Button>
          <Button
            variant={chartType === "pie" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType("pie")}
          >
            Pizza
          </Button>
        </div>
      </div>

      {renderChart()}

      {/* Resumo estatístico */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Total de Receitas</p>
          <p className="text-2xl font-bold text-green-600">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(
              timeSeriesData.reduce((sum, item) => sum + item.revenue, 0)
            )}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Total de Despesas</p>
          <p className="text-2xl font-bold text-red-600">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(
              timeSeriesData.reduce((sum, item) => sum + item.expenses, 0)
            )}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Lucro Líquido</p>
          <p className="text-2xl font-bold text-blue-600">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(
              timeSeriesData.reduce((sum, item) => sum + item.revenue, 0) -
                timeSeriesData.reduce((sum, item) => sum + item.expenses, 0)
            )}
          </p>
        </div>
      </div>
    </Card>
  );
};

export { RevenueExpenseChart };
