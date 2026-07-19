import { Loader2 } from "lucide-react";
import cn from "@/utils/cn";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  loading = false,
  disabled = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className,
  ...props
}) {
  const variants = {
    primary:
      "bg-brand-primary text-white hover:opacity-90 disabled:hover:opacity-100",

    secondary:
      "border border-border bg-background text-foreground hover:bg-muted",

    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-all",
        "focus:outline-none focus:ring-2 focus:ring-brand-primary/30",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        LeftIcon && <LeftIcon className="h-4 w-4" />
      )}

      <span>{children}</span>

      {!loading && RightIcon && <RightIcon className="h-4 w-4" />}
    </button>
  );
}
