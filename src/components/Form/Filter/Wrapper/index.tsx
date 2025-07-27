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
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {children}

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Aplicar Filtros
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClear}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Limpar
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export { FilterWrapper };
