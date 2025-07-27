"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type DateFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  error?: string;
};

const DateField: React.FC<DateFieldProps> = ({
  label,
  name,
  error: customError,
  className,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = customError ?? (errors[name]?.message as string | undefined);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type="date"
        className={cn(
          error &&
            "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
          className
        )}
        {...register(name)}
        {...props}
      />
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
};

export { DateField };
