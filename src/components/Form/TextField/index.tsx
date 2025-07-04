"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  formatter?: (value: string) => string;
  error?: string;
};

const TextField: React.FC<InputProps> = ({
  label,
  name,
  formatter,
  error: customError,
  className,
  ...props
}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const error = customError ?? (errors[name]?.message as string | undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (formatter) {
      value = formatter(value);
    }
    setValue(name, value, { shouldValidate: true });
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        className={cn(
          error &&
            "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
          className
        )}
        {...register(name)}
        {...props}
        onChange={handleChange}
      />
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
};

export { TextField };
