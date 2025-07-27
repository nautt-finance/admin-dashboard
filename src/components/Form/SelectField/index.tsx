"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

type SelectFieldProps = {
  label: string;
  name: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
};

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  placeholder = "Selecione uma opção",
  error: customError,
  disabled = false,
  className,
}) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const value = watch(name);
  const error = customError ?? (errors[name]?.message as string | undefined);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={name}>{label}</Label>
      <Select
        value={value || ""}
        onValueChange={(selectedValue) => setValue(name, selectedValue)}
        disabled={disabled}
      >
        <SelectTrigger
          className={cn(
            error &&
              "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
};

export { SelectField, type SelectOption };
