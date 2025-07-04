"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  formatter?: (value: string) => string;
  error?: string;
};

const TextPasswordField: React.FC<InputProps> = ({
  label,
  name,
  formatter,
  error: customError,
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <Label htmlFor={name}>{label}</Label>}
      <div className="relative">
        <Input
          id={name}
          type={showPassword ? "text" : "password"}
          className={cn(
            "pr-10",
            error &&
              "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
            className
          )}
          {...register(name)}
          {...props}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:text-foreground"
          tabIndex={-1}
          aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
};

export { TextPasswordField };
