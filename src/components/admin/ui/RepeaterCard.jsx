import cn from "@/utils/cn";

export default function RepeaterCard({
  title,
  description,
  actions,
  children,
  className,
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/50",
        className,
      )}
    >
      {(title || description || actions) && (
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {title ? (
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </h4>
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

      <div className="space-y-4">{children}</div>
    </div>
  );
}
