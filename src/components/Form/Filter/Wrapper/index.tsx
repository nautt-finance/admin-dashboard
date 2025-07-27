"use client";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, RotateCcw } from "lucide-react";

interface FilterWrapperProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onClear: () => void;
  title?: string;
  children: React.ReactNode;
}

const FilterWrapper: React.FC<FilterWrapperProps> = ({
  form,
  onSubmit,
  onClear,
  title = "Filtros",
  children,
}) => {
  const handleSubmit = (data: any) => {
    console.log("Dados do formulário:", data);
    onSubmit(data);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          {title}
        </CardTitle>
        <Button
          type="button"
          variant="outline"
          onClick={onClear}
          className="flex items-center gap-2 ml-auto"
        >
          <RotateCcw className="h-4 w-4" />
          Limpar
        </Button>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {children}
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export { FilterWrapper };
