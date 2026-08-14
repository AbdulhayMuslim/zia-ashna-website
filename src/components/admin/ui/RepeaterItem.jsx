export default function RepeaterItem({ title, children, onDelete }) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-border
        bg-background
        p-6
      "
    >
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold text-heading dark:text-heading-dark">
          {title}
        </h3>

        <button
          type="button"
          onClick={onDelete}
          className="
            text-sm
            font-medium
            text-red-500
            transition
            hover:opacity-80
          "
          disabled={!onDelete}
        >
          Delete
        </button>
      </div>

      {children}
    </div>
  );
}
