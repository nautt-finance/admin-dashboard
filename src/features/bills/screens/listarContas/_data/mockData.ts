import { Bill } from "@/features/bills/types";

export const mockBills: Bill[] = [
  {
    id: "1",
    description: "Aluguel do escritório",
    supplier: "Imobiliária Santos Ltda",
    amount: 2500.0,
    dueDate: "2024-12-15",
    status: "pending",
    category: "Aluguel",
    createdAt: "2024-11-01",
  },
  {
    id: "2",
    description: "Fornecimento de energia elétrica",
    supplier: "CEMIG",
    amount: 450.75,
    dueDate: "2024-12-10",
    status: "paid",
    category: "Utilities",
    createdAt: "2024-11-05",
  },
  {
    id: "3",
    description: "Licença de software",
    supplier: "Adobe Inc.",
    amount: 89.99,
    dueDate: "2024-12-08",
    status: "overdue",
    category: "Software",
    createdAt: "2024-10-15",
  },
  {
    id: "4",
    description: "Serviços de contabilidade",
    supplier: "Contabilidade Eficiente",
    amount: 800.0,
    dueDate: "2024-12-20",
    status: "pending",
    category: "Serviços",
    createdAt: "2024-11-10",
  },
  {
    id: "5",
    description: "Material de escritório",
    supplier: "Papelaria Central",
    amount: 125.3,
    dueDate: "2024-12-05",
    status: "paid",
    category: "Material",
    createdAt: "2024-11-08",
  },
  {
    id: "6",
    description: "Internet e telefonia",
    supplier: "Vivo Empresas",
    amount: 299.9,
    dueDate: "2024-12-12",
    status: "pending",
    category: "Telecomunicações",
    createdAt: "2024-11-12",
  },
  {
    id: "7",
    description: "Seguro empresarial",
    supplier: "Seguradora Brasil",
    amount: 1200.0,
    dueDate: "2024-11-30",
    status: "overdue",
    category: "Seguros",
    createdAt: "2024-10-30",
  },
  {
    id: "8",
    description: "Manutenção equipamentos",
    supplier: "TechService Ltda",
    amount: 350.0,
    dueDate: "2024-12-25",
    status: "cancelled",
    category: "Manutenção",
    createdAt: "2024-11-15",
  },
];

export const billStatusConfig = {
  pending: { label: "Pendente", variant: "default" as const },
  paid: { label: "Pago", variant: "secondary" as const },
  overdue: { label: "Vencido", variant: "destructive" as const },
  cancelled: { label: "Cancelado", variant: "outline" as const },
};

// Função para obter categorias únicas
export const getUniqueCategories = () => {
  const categories = mockBills.map((bill) => bill.category);
  const uniqueCategories = [...new Set(categories)];
  return uniqueCategories.map((category) => ({
    value: category,
    label: category,
  }));
};
