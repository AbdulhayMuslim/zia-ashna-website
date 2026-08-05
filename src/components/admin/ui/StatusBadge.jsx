"use client";

const variants = {
  published:
    "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  draft:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",
  archived: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  default: "bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-300",
};

export default function StatusBadge({ status = "" }) {
  const key = status.toLowerCase();
  const classes = variants[key] || variants.default;

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize ${classes}`}
    >
      {status}
    </span>
  );
}
