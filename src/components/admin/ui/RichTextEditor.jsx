export default function RichTextEditor({
  label,
  placeholder = "Start writing...",
  error,
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-heading dark:text-heading-dark">
          {label}
        </label>
      )}

      <div className="rounded-2xl border border-border bg-card p-4">
        <textarea
          placeholder={placeholder}
          className="h-87 w-full resize-none bg-transparent text-sm outline-none text-heading placeholder:text-text-muted dark:text-heading-dark dark:placeholder:text-text-muted-dark"
          {...props}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
