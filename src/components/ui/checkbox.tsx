"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "./utils";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, checked, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onCheckedChange) {
        onCheckedChange(e.target.checked);
      }
      props.onChange?.(e);
    };

    return (
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          className="sr-only peer"
          onChange={handleChange}
          {...props}
        />
        <div
          className={cn(
            "peer h-4 w-4 shrink-0 rounded-[4px] border border-primary shadow transition-all",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "peer-checked:bg-primary peer-checked:text-primary-foreground",
            "flex items-center justify-center",
            className
          )}
        >
          {checked && <Check className="h-3.5 w-3.5 text-current" />}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
