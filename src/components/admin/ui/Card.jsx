export default function Card({ title, description, children }) {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-border
        bg-card
        shadow-sm
      "
    >
      {(title || description) && (
        <div className="border-b border-border p-6">
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
        </div>
      )}

      <div className="p-6">{children}</div>
    </div>
  );
}
