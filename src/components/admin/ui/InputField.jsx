import cn from "@/utils/cn";
import FormField from "./FormField";

export default function InputField({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  helperText,
  className,
  defaultValue,
  registration,
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
      <input
        id={id}
        name={name}
        type={type}
        {...(controlled
          ? {
              value: value ?? "",
              onChange,
            }
          : {
              defaultValue,
            })}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${id}-error` : helperText ? `${id}-helper` : undefined
        }
        className={cn(
          "w-full rounded-2xl border border-border bg-card px-4 py-3 text-heading outline-none transition-all dark:text-heading-dark",
          "focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20",
          "disabled:cursor-not-allowed disabled:opacity-60",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          className,
        )}
        {...registration}
        {...props}
      />
    </FormField>
  );
}
