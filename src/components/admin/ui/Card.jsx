import cn from "@/utils/cn";

export default function Card({
  title,
  description,
  header,
  footer,
  children,
  className,
  headerClassName,
  bodyClassName,
  footerClassName,
  padded = true,
}) {
  return (
    <div
      className={cn(
        "overflow-visible rounded-3xl border border-border bg-card shadow-sm dark:bg-gray-800",
        className,
      )}
    >
      {(header || title || description) && (
        <div className={cn("border-b border-border p-6", headerClassName)}>
          {header ? (
            header
          ) : (
            <>
              {title && (
                <h2 className="font-heading text-lg font-semibold text-heading dark:text-heading-dark">
                  {title}
                </h2>
              )}

              {description && (
                <p className="mt-1 text-sm text-text dark:text-text-dark">
                  {description}
                </p>
              )}
            </>
          )}
        </div>
      )}

      <div className={cn(padded && "p-6", bodyClassName)}>{children}</div>

      {footer && (
        <div className={cn("border-t border-border p-6", footerClassName)}>
          {footer}
        </div>
      )}
    </div>
  );
}
