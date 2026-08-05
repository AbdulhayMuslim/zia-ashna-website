import cn from "@/utils/cn";

export default function FormField({
  id,
  label,
  required = false,
  error,
  helperText,
  className,
  children,
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-heading dark:text-heading-dark"
        >
          {label}

          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      {children}

      {error ? (
        <p id={`${id}-error`} className="text-sm text-red-500">
          {error}
        </p>
      ) : (
        helperText && (
          <p
            id={`${id}-helper`}
            className="text-sm text-text dark:text-text-dark"
          >
            {helperText}
          </p>
        )
      )}
    </div>
  );
}
