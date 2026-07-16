export default function EmptyState({ title, description }) {
  return (
    <div
      className="
        rounded-3xl
        border-2
        border-dashed
        border-border
        p-10
        text-center
      "
    >
      <h3 className="font-heading text-lg font-semibold">{title}</h3>

      {description && (
        <p className="mt-2 text-sm text-text dark:text-text-dark">
          {description}
        </p>
      )}
    </div>
  );
}
