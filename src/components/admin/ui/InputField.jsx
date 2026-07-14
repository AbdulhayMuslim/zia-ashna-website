import { useId } from "react";

import cn from "@/utils/cn";

export default function InputField({
  id,
  label,
  description,
  error,
  required,
  className,
  inputClassName,
  ...props
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={cn("space-y-2", className)}>
      {label ? (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
          {required ? <span className="ml-1 text-red-500">*</span> : null}
        </label>
      ) : null}

      <input
        id={inputId}
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          inputClassName,
        )}
        {...props}
      />

      {description ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      ) : null}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
