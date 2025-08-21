export interface Bank {
  id: string;
  nome: string;
}

export interface BankTableProps {
  banks: Bank[];
  isLoading?: boolean;
  onEdit?: (bank: Bank) => void;
  onDelete?: (id: string) => void;
}
