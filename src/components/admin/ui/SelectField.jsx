import { ChevronDown } from "lucide-react";
import cn from "@/utils/cn";
import FormField from "./FormField";

export default function SelectField({
  id,
  name,
  label,
  value,
  onChange,
  options = [],
  placeholder,
  required = false,
  disabled = false,
  error,
  helperText,
  className,
  defaultValue,
  ...props
}) {
  const controlled = value !== undefined;

  return (
    <FormField
      id={id}
      label={label}
      required={required}
      error={error}
      helperText={helperText}
    >
      <div className="relative">
        <select
          id={id}
          name={name}
          {...(controlled
            ? {
                value: value ?? "",
                onChange,
              }
            : {
                defaultValue,
              })}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
          className={cn(
            "w-full appearance-none rounded-2xl border border-border bg-card px-4 py-3 pr-12 text-heading outline-none transition-all dark:text-heading-dark",
            "focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20",
            "disabled:cursor-not-allowed disabled:opacity-60",
            error &&
              "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-primary" />
      </div>
    </FormField>
  );
}
