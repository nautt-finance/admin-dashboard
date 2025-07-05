"use client";

import { Card } from "@/components/ui/card";
import { KpiCard } from "@/components/ui/kpi-card";
import { Progress } from "@/components/ui/progress";
import {
  DropletIcon,
  TrendingUpIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LiquidityIndicatorsProps {
  className?: string;
}

const LiquidityIndicators = ({ className }: LiquidityIndicatorsProps) => {
  // Dados mock - em produção viriam de uma API
  const financialData = {
    currentAssets: 500000, // Ativos circulantes
    currentLiabilities: 300000, // Passivos circulantes
    cash: 150000, // Caixa e equivalentes
    inventory: 100000, // Estoque
    totalAssets: 1200000, // Total de ativos
    totalLiabilities: 600000, // Total de passivos
    shortTermDebt: 200000, // Dívida de curto prazo
    longTermDebt: 400000, // Dívida de longo prazo
    workingCapital: 200000, // Capital de giro
  };

  // Cálculos dos indicadores
  const currentRatio =
    financialData.currentAssets / financialData.currentLiabilities;
  const quickRatio =
    (financialData.currentAssets - financialData.inventory) /
    financialData.currentLiabilities;
  const cashRatio = financialData.cash / financialData.currentLiabilities;
  const debtToEquityRatio =
    financialData.totalLiabilities /
    (financialData.totalAssets - financialData.totalLiabilities);
  const debtToAssetRatio =
    financialData.totalLiabilities / financialData.totalAssets;

  const indicators = [
    {
      name: "Liquidez Corrente",
      value: currentRatio,
      description: "Ativos circulantes / Passivos circulantes",
      status:
        currentRatio >= 1.5
          ? "good"
          : currentRatio >= 1.0
            ? "warning"
            : "danger",
      benchmark: "≥ 1.5",
      format: "ratio",
    },
    {
      name: "Liquidez Seca",
      value: quickRatio,
      description: "(Ativos circulantes - Estoque) / Passivos circulantes",
      status:
        quickRatio >= 1.0 ? "good" : quickRatio >= 0.8 ? "warning" : "danger",
      benchmark: "≥ 1.0",
      format: "ratio",
    },
    {
      name: "Liquidez Imediata",
      value: cashRatio,
      description: "Caixa e equivalentes / Passivos circulantes",
      status:
        cashRatio >= 0.3 ? "good" : cashRatio >= 0.1 ? "warning" : "danger",
      benchmark: "≥ 0.3",
      format: "ratio",
    },
    {
      name: "Endividamento sobre Patrimônio",
      value: debtToEquityRatio,
      description: "Total de dívidas / Patrimônio líquido",
      status:
        debtToEquityRatio <= 0.5
          ? "good"
          : debtToEquityRatio <= 1.0
            ? "warning"
            : "danger",
      benchmark: "≤ 0.5",
      format: "ratio",
    },
    {
      name: "Endividamento sobre Ativos",
      value: debtToAssetRatio,
      description: "Total de dívidas / Total de ativos",
      status:
        debtToAssetRatio <= 0.4
          ? "good"
          : debtToAssetRatio <= 0.6
            ? "warning"
            : "danger",
      benchmark: "≤ 0.4",
      format: "percentage",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-600 bg-green-100";
      case "warning":
        return "text-yellow-600 bg-yellow-100";
      case "danger":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircleIcon className="h-4 w-4" />;
      case "warning":
        return <AlertTriangleIcon className="h-4 w-4" />;
      case "danger":
        return <AlertTriangleIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const formatValue = (value: number, format: string) => {
    if (format === "ratio") {
      return value.toFixed(2);
    }
    if (format === "percentage") {
      return `${(value * 100).toFixed(1)}%`;
    }
    return value.toFixed(2);
  };

  return (
    <div className={className}>
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold">
          Indicadores de Liquidez e Solvência
        </h2>

        {/* KPIs principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Capital de Giro"
            value={financialData.workingCapital}
            format="currency"
            icon={DropletIcon}
            change={15.2}
            changeType="increase"
          />
          <KpiCard
            title="Caixa e Equivalentes"
            value={financialData.cash}
            format="currency"
            icon={TrendingUpIcon}
            change={8.5}
            changeType="increase"
          />
          <KpiCard
            title="Liquidez Corrente"
            value={formatValue(currentRatio, "ratio")}
            icon={CheckCircleIcon}
            change={5.1}
            changeType="increase"
          />
          <KpiCard
            title="Endividamento"
            value={formatValue(debtToAssetRatio, "percentage")}
            icon={AlertTriangleIcon}
            change={-2.3}
            changeType="decrease"
          />
        </div>

        {/* Indicadores detalhados */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Análise Detalhada</h3>
          <div className="space-y-6">
            {indicators.map((indicator, index) => (
              <div
                key={index}
                className="border-b pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{indicator.name}</h4>
                    <div
                      className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-full text-xs",
                        getStatusColor(indicator.status)
                      )}
                    >
                      {getStatusIcon(indicator.status)}
                      <span>
                        {indicator.status === "good"
                          ? "Bom"
                          : indicator.status === "warning"
                            ? "Atenção"
                            : "Crítico"}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">
                      {formatValue(indicator.value, indicator.format)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Meta: {indicator.benchmark}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {indicator.description}
                </p>
                <Progress
                  value={
                    indicator.format === "percentage"
                      ? indicator.value * 100
                      : (indicator.value / 2) * 100
                  }
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Resumo da situação financeira */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Resumo da Situação Financeira
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Pontos Fortes</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Liquidez corrente acima da média do setor</li>
                <li>• Boa reserva de caixa para emergências</li>
                <li>• Capital de giro positivo</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Pontos de Atenção</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Monitorar o nível de endividamento</li>
                <li>• Otimizar gestão de estoque</li>
                <li>• Avaliar necessidade de financiamento</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export { LiquidityIndicators };
