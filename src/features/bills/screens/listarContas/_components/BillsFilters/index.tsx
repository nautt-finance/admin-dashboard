"use client";

import { Form } from "@/components/Form";
import { FiltersFormData } from "../../_schema/filters.schema";

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
        <Form.TextField
          name="termo"
          label="Pesquisar"
          placeholder="Pesquisar"
        />
      </div>
    </Form.FilterWrapper>
  );
};

export { BillsFilters };
