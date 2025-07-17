import { PeriodType } from "@/components/ui/period-filter";

export interface CashflowData {
  period: string;
  income: number;
  expenses: number;
  balance: number;
}

export const mockData: Record<PeriodType, CashflowData[]> = {
  daily: [
    { period: "Seg", income: 15000, expenses: 8000, balance: 7000 },
    { period: "Ter", income: 12000, expenses: 6000, balance: 6000 },
    { period: "Qua", income: 18000, expenses: 9000, balance: 9000 },
    { period: "Qui", income: 16000, expenses: 7000, balance: 9000 },
    { period: "Sex", income: 22000, expenses: 10000, balance: 12000 },
    { period: "Sáb", income: 8000, expenses: 4000, balance: 4000 },
    { period: "Dom", income: 5000, expenses: 2000, balance: 3000 },
  ],
  weekly: [
    { period: "Sem 1", income: 45000, expenses: 25000, balance: 20000 },
    { period: "Sem 2", income: 52000, expenses: 28000, balance: 24000 },
    { period: "Sem 3", income: 48000, expenses: 26000, balance: 22000 },
    { period: "Sem 4", income: 55000, expenses: 30000, balance: 25000 },
  ],
  monthly: [
    { period: "Jan", income: 120000, expenses: 80000, balance: 40000 },
    { period: "Fev", income: 135000, expenses: 85000, balance: 50000 },
    { period: "Mar", income: 142000, expenses: 88000, balance: 54000 },
    { period: "Abr", income: 155000, expenses: 92000, balance: 63000 },
    { period: "Mai", income: 148000, expenses: 90000, balance: 58000 },
    { period: "Jun", income: 162000, expenses: 95000, balance: 67000 },
  ],
  yearly: [
    { period: "2021", income: 1200000, expenses: 800000, balance: 400000 },
    { period: "2022", income: 1450000, expenses: 950000, balance: 500000 },
    { period: "2023", income: 1680000, expenses: 1100000, balance: 580000 },
    { period: "2024", income: 1850000, expenses: 1200000, balance: 650000 },
  ],
};

export const chartConfig = {
  income: {
    label: "Receitas",
    color: "#10b981",
  },
  expenses: {
    label: "Despesas",
    color: "#ef4444",
  },
  balance: {
    label: "Saldo",
    color: "#3b82f6",
  },
};
