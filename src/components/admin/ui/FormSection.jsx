import cn from "@/utils/cn";

export default function FormSection({
  title,
  description,
  children,
  className,
}) {
  return (
    <section className={cn("space-y-4", className)}>
      {(title || description) && (
        <div className="space-y-1">
          {title ? (
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
              {title}
            </h4>
          ) : null}

          {description ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          ) : null}
        </div>
      )}

      <div className="space-y-4">{children}</div>
    </section>
  );
}
