"use client";

import { Form } from "@/components/Form";
import { FiltersFormData } from "../../_schema/filters.schema";
import { getUniqueCategories } from "../../_data/mockData";

interface BillsFiltersProps {
  form: any;
  onApplyFilters: (data: FiltersFormData) => void;
  onClearFilters: () => void;
}

const BillsFilters: React.FC<BillsFiltersProps> = ({
  form,
  onApplyFilters,
  onClearFilters,
}) => {
  const categories = getUniqueCategories();

  const handleSubmit = (data: FiltersFormData) => {
    onApplyFilters(data);
  };

  return (
    <Form.FilterWrapper
      form={form}
      onSubmit={handleSubmit}
      onClear={onClearFilters}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Form.DateField
          name="startDate"
          label="Data Inicial"
          placeholder="Selecione a data inicial"
        />
        <Form.DateField
          name="endDate"
          label="Data Final"
          placeholder="Selecione a data final"
        />
        <Form.SelectField
          name="category"
          label="Categoria"
          options={categories}
          placeholder="Todas as categorias"
        />
      </div>
    </Form.FilterWrapper>
  );
};

export { BillsFilters };
