import cn from "@/utils/cn";

export default function EmptyState({
  title,
  description,
  action,
  icon: Icon,
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center dark:border-gray-700 dark:bg-gray-900/40",
        className,
      )}
    >
      {Icon ? <Icon className="mb-4 h-10 w-10 text-gray-400" /> : null}

      {title ? (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
      ) : null}

      {description ? (
        <p className="mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      ) : null}

      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
