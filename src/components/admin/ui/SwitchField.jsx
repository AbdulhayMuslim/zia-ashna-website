import cn from "@/utils/cn";

export default function SwitchField({
  id,
  name,
  label,
  checked = false,
  onChange,
  description,
  disabled = false,
  className,
  ...props
}) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-heading dark:text-heading-dark"
          >
            {label}
          </label>
        )}

        {description && (
          <p className="mt-1 text-sm text-text dark:text-text-dark">
            {description}
          </p>
        )}
      </div>

      <label className="relative inline-flex cursor-pointer items-center">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />

        <div
          className={cn(
            "h-6 w-11 rounded-full transition-all",
            "peer-focus:ring-2 peer-focus:ring-brand-primary/20",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-60",
            "after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-transform",
            "peer-checked:bg-brand-primary peer-checked:after:translate-x-5",
            "bg-gray-300 dark:bg-gray-700",
          )}
        />
      </label>
    </div>
  );
}
