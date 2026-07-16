import { ChevronDown } from "lucide-react";

export default function SelectField({ label, value, onChange, options = [] }) {
  return (
    <div className="space-y-2">
      {label && (
        <label
          className="
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

      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="
            w-full
            appearance-none
            rounded-2xl
            border
            border-border
            bg-card
            px-4
            py-3
            pr-12
            text-sm
            text-heading
            shadow-sm
            transition-all
            duration-200
            outline-none

            hover:border-brand-primary/40

            focus:border-brand-primary
            focus:ring-2
            focus:ring-brand-primary/20

            dark:text-heading-dark
          "
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          className="
            pointer-events-none
            absolute
            right-4
            top-1/2
            h-4
            w-4
            -translate-y-1/2
            text-brand-primary
          "
        />
      </div>
    </div>
  );
}
