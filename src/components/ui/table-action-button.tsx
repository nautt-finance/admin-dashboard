import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TableActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  label: string;
  variant?: "default" | "destructive";
}

const TableActionButton = React.forwardRef<
  HTMLButtonElement,
  TableActionButtonProps
>(({ className, icon: Icon, label, variant = "default", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "w-full px-3 py-2 text-sm text-left hover:bg-accent hover:text-accent-foreground transition-colors flex items-center",
        variant === "destructive" && "text-destructive",
        className
      )}
      {...props}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </button>
  );
});

TableActionButton.displayName = "TableActionButton";

export { TableActionButton };
