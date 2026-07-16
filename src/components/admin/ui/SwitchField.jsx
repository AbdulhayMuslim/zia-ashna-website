export default function SwitchField({ label, checked, onChange, description }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <label className="font-medium text-heading dark:text-heading-dark">
          {label}
        </label>

        {description && (
          <p className="mt-1 text-sm text-text dark:text-text-dark">
            {description}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`
          relative
          h-6
          w-11
          rounded-full
          transition
          ${checked ? "bg-brand-primary" : "bg-gray-300 dark:bg-gray-700"}
        `}
      >
        <span
          className={`
            absolute
            top-0.5
            left-0.5
            h-5
            w-5
            rounded-full
            bg-white
            transition
            ${checked ? "translate-x-5" : "translate-x-0"}
          `}
        />
      </button>
    </div>
  );
}
