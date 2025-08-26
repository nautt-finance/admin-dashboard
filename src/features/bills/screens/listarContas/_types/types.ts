export interface BillStatus {
  value: "pending" | "paid" | "overdue" | "cancelled";
  label: string;
  variant: "default" | "secondary" | "destructive" | "outline";
}

export interface BancoNautt {
  id: number;
  nome: string;
  created_at: string;
  updated_at: string;
}

export interface Moeda {
  id: number;
  nome: string;
  sigla: string;
  pais: string;
  country_code: string;
  created_at: string;
  updated_at: string;
}

export interface Bill {
  id: number;
  descricao: string;
  destinatario: string;
  documento_destinatario: string;
  valor: string;
  valor_usd: string;
  data_pagamento: string;
  departamento: string;
  observacao: string;
  tipo: "direta" | "indireta";
  banco_id: number;
  moeda_id: number;
  banco_nautt: BancoNautt;
  moeda: Moeda;
  created_at: string;
  updated_at: string;
}

export interface BillsTableProps {
  bills: Bill[];
  isLoading?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  from?: number;
  to?: number;
  total?: number;
  onView?: (bill: Bill) => void;
  onEdit?: (bill: Bill) => void;
  onDelete?: (billId: number) => void;
}

export interface Coin {
  id: number;
  bank_code: string;
  nome: string;
  country: string;
  created_at: string | null;
  updated_at: string | null;
}
