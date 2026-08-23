"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, FileText, FolderOpen } from "lucide-react";

import cn from "@/utils/cn";
import FormField from "./FormField";

export default function SelectField({
  id,
  name,
  label,
  value,
  onChange,
  options = [],
  placeholder,
  required = false,
  disabled = false,
  error,
  helperText,
  className,
  defaultValue = "",
}) {
  const controlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const currentValue = controlled ? (value ?? "") : internalValue;
  const selected = options.find((option) => String(option.value) === String(currentValue));
  const Icon = id?.toLowerCase().includes("category") ? FolderOpen : FileText;

  useEffect(() => {
    function closeOnOutsideClick(event) {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    }
    function closeOnEscape(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  function choose(nextValue) {
    if (!controlled) setInternalValue(nextValue);
    onChange?.({ target: { name, value: nextValue }, type: "change" });
    setOpen(false);
  }

  return (
    <FormField id={id} label={label} required={required} error={error} helperText={helperText}>
      <div ref={containerRef} className="relative">
        <input type="hidden" name={name} value={currentValue} readOnly />
        <button
          id={id}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          disabled={disabled}
          onClick={() => setOpen((current) => !current)}
          className={cn(
            "flex w-full items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-left text-heading outline-none transition-all hover:border-brand-primary/50 dark:bg-gray-900 dark:text-heading-dark",
            "focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20",
            "disabled:cursor-not-allowed disabled:opacity-60",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className,
          )}
        >
          <Icon className="h-4 w-4 shrink-0 text-brand-primary" />
          <span className={cn("min-w-0 flex-1 truncate", !selected && "text-text-muted dark:text-text-muted-dark")}>{selected?.label ?? placeholder ?? "Select an option"}</span>
          <ChevronDown className={cn("h-4 w-4 shrink-0 text-text-muted transition-transform", open && "rotate-180")} />
        </button>

        {open && !disabled && (
          <div className="absolute inset-x-0 top-full z-40 mt-2 overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-2xl dark:bg-gray-800">
            <div role="listbox" aria-label={label || "Select an option"} className="max-h-72 space-y-1 overflow-y-auto">
              {options.map((option) => {
                const active = String(option.value) === String(currentValue);
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => choose(option.value)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition",
                      active ? "bg-brand-primary/10 text-brand-primary" : "text-heading hover:bg-brand-primary/10 dark:text-heading-dark",
                    )}
                  >
                    <span className="min-w-0 flex-1 truncate">{option.label}</span>
                    <Check className={cn("h-4 w-4", active ? "opacity-100" : "opacity-0")} />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </FormField>
  );
}
