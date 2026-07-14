import cn from "@/utils/cn";

export default function FormCard({
  title,
  description,
  actions,
  children,
  footer,
  className,
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950",
        className,
      )}
    >
      {(title || description || actions) && (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {title ? (
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </h3>
            ) : null}

            {description ? (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {description}
              </p>
            ) : null}
          </div>

          {actions ? (
            <div className="flex flex-wrap items-center gap-2">{actions}</div>
          ) : null}
        </div>
      )}

      <div className="space-y-5">{children}</div>

      {footer ? (
        <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-800">
          {footer}
        </div>
      ) : null}
    </div>
  );
}
