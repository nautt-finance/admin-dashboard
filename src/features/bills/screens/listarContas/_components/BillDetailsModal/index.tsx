"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { Bill } from "../../_types/types";
import { formatCurrency, formatDate } from "@/lib/formatters/dateFormatter";

interface BillDetailsModalProps {
  open: boolean;
  bill?: Bill;
  onOpenChange: (open: boolean) => void;
}

const BillDetailsModal = ({
  open,
  bill,
  onOpenChange,
}: BillDetailsModalProps) => {
  if (!bill) return null;

  const getTipoBadge = (tipo: string) => {
    const tipoMap = {
      direta: { label: "Direta", variant: "default" as const },
      indireta: { label: "Indireta", variant: "secondary" as const },
    };

    const tipoInfo = tipoMap[tipo as keyof typeof tipoMap] || {
      label: tipo,
      variant: "outline" as const,
    };

    return <Badge variant={tipoInfo.variant}>{tipoInfo.label}</Badge>;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes da Despesa</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Descrição
              </label>
              <p className="text-sm font-medium">{bill.descricao}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Destinatário
              </label>
              <p className="text-sm">{bill.destinatario}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Documento
              </label>
              <p className="text-sm">{bill.documento_destinatario}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Data de Pagamento
              </label>
              <p className="text-sm">{formatDate(bill.data_pagamento)}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Valor
              </label>
              <p className="text-lg font-semibold">
                {formatCurrency(bill.valor)}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Valor USD
              </label>
              <p className="text-sm font-semibold text-muted-foreground">
                {formatCurrency(bill.valor_usd, "USD")}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Banco
              </label>
              <p className="text-sm">{bill.banco_nautt.nome}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Moeda
              </label>
              <p className="text-sm">
                {bill.moeda.sigla} - {bill.moeda.nome}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Tipo
              </label>
              <div>{getTipoBadge(bill.tipo)}</div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Departamento
              </label>
              <p className="text-sm">{bill.departamento}</p>
            </div>
          </div>

          {bill.observacao && (
            <>
              <Separator />
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Observação
                </label>
                <p className="text-sm">{bill.observacao}</p>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { BillDetailsModal };
