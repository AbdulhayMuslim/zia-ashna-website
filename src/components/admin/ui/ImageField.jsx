import { useId } from "react";

import cn from "@/utils/cn";

export default function ImageField({
  id,
  label,
  description,
  error,
  required,
  className,
  inputClassName,
  preview,
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

      <div className="flex flex-col gap-3 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/40 sm:flex-row sm:items-center">
        <input
          id={inputId}
          type="file"
          accept="image/*"
          className={cn(
            "block w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-brand-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-brand-primary/90 dark:text-gray-300",
            error && "text-red-600",
            inputClassName,
          )}
          {...props}
        />

        {preview ? (
          <div className="h-20 w-20 overflow-hidden rounded-md border border-gray-200 bg-white dark:border-gray-700">
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}
      </div>

      {description ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      ) : null}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
