export default function RepeaterActions() {
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        className="
          text-sm
          font-medium
          text-gray-500
        "
      >
        ↑
      </button>

      <button
        type="button"
        className="
          text-sm
          font-medium
          text-gray-500
        "
      >
        ↓
      </button>

      <button
        type="button"
        className="
          text-sm
          font-medium
          text-red-500
        "
      >
        Delete
      </button>
    </div>
  );
}
