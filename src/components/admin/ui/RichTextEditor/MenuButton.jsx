"use client";

export default function MenuButton({
  icon: Icon,
  label,
  active = false,
  disabled = false,
  onClick,
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex h-9 w-9 items-center justify-center rounded-lg
        border transition-colors
        ${
          active
            ? "border-brand-primary bg-brand-primary text-white"
            : "border-border bg-card text-heading hover:bg-muted dark:border-border-dark dark:bg-card-dark dark:text-heading-dark dark:hover:bg-muted-dark"
        }
        disabled:cursor-not-allowed disabled:opacity-50
      `}
    >
      {Icon && <Icon className="h-4 w-4" />}
    </button>
  );
}
