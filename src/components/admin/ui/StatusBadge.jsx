export default function StatusBadge({ status }) {
  const isPublished = status === "published";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
        isPublished
          ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
      }`}
    >
      {isPublished ? "Published" : "Draft"}
    </span>
  );
}
