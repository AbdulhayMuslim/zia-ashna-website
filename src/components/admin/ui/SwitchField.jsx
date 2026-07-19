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

      <button
        id={id}
        name={name}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cn(
          "relative h-6 w-11 rounded-full transition-all",
          "focus:outline-none focus:ring-2 focus:ring-brand-primary/20",
          "disabled:cursor-not-allowed disabled:opacity-60",
          checked ? "bg-brand-primary" : "bg-gray-300 dark:bg-gray-700",
        )}
      >
        <span
          className={cn(
            "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
            checked ? "translate-x-5" : "translate-x-0",
          )}
        />
      </button>
    </div>
  );
}
