import cn from "@/utils/cn";

export default function PageHeader({
  title,
  description,
  actions,
  children,
  className,
}) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
    >
      <div className="space-y-2">
        {title ? (
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            {title}
          </h2>
        ) : null}

        {description ? (
          <p className="max-w-2xl text-sm text-gray-500 dark:text-gray-400 sm:text-base">
            {description}
          </p>
        ) : null}

        {children ? <div className="pt-1">{children}</div> : null}
      </div>

      {actions ? (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}
