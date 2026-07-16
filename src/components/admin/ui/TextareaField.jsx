export default function TextareaField({
  label,
  placeholder,
  rows = 5,
  value,
  onChange,
}) {
  return (
    <div>
      {label && (
        <label
          className="
            mb-2
            block
            text-sm
            font-medium
            text-heading
            dark:text-heading-dark
          "
        >
          {label}
        </label>
      )}

      <textarea
        rows={rows}
        {...(value !== undefined
          ? {
              value,
              onChange,
            }
          : {
              defaultValue: "",
            })}
        placeholder={placeholder}
        className="
    w-full
    rounded-2xl
    border
    border-border
    bg-background
    px-4
    py-3
    outline-none
    transition
    focus:border-brand-primary
  "
      />
    </div>
  );
}
