import cn from "@/utils/cn";

const variants = {
  default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200",
  success:
    "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-300",
  warning:
    "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  danger: "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300",
  info: "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
};

export default function StatusBadge({
  children,
  variant = "default",
  className,
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        variants[variant] || variants.default,
        className,
      )}
    >
      {children}
    </span>
  );
}
