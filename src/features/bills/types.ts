export interface BillStatus {
  value: "pending" | "paid" | "overdue" | "cancelled";
  label: string;
  variant: "default" | "secondary" | "destructive" | "outline";
}

export interface Bill {
  id: string;
  description: string;
  supplier: string;
  amount: number;
  dueDate: string;
  status: BillStatus["value"];
  category: string;
  createdAt: string;
}

export interface BillsTableProps {
  bills: Bill[];
  isLoading?: boolean;
}
