"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

import cn from "@/utils/cn";
import FormField from "./FormField";
import { ICON_LIST, ICONS } from "@/lib/icons";

export default function IconField({
  id,
  label,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  helperText,
  className,
}) {
  const wrapperRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredIcons = useMemo(() => {
    return ICON_LIST.filter(({ name }) =>
      name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const selectedIcon = value || "";

  const SelectedIcon =
    selectedIcon && ICONS[selectedIcon] ? ICONS[selectedIcon] : null;

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <FormField
      id={id}
      label={label}
      required={required}
      error={error}
      helperText={helperText}
    >
      <div ref={wrapperRef} className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((prev) => !prev)}
          className={cn(
            "flex w-full items-center justify-between rounded-2xl border border-border bg-card px-4 py-3 transition",
            "hover:border-brand-primary",
            "focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20",
            "disabled:cursor-not-allowed disabled:opacity-60",
            className,
          )}
        >
          <div className="flex items-center gap-3">
            {SelectedIcon ? (
              <>
                <SelectedIcon className="h-5 w-5 text-brand-primary" />

                <span>{selectedIcon}</span>
              </>
            ) : (
              <span className="text-text-muted dark:text-text-muted-dark">
                Select an icon
              </span>
            )}
          </div>

          <ChevronDown className="h-4 w-4" />
        </button>

        {open && (
          <div className="absolute z-50 mt-2 w-full rounded-2xl border border-border bg-card p-3 shadow-xl">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search icon..."
                className="w-full rounded-xl border border-border bg-background py-2 pl-10 pr-3 text-sm outline-none transition focus:border-brand-primary"
              />
            </div>

            <div className="grid max-h-72 grid-cols-3 gap-2 overflow-y-auto sm:grid-cols-4">
              {filteredIcons.map(({ name, Icon }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    onChange?.({
                      target: {
                        value: name,
                      },
                    });

                    setOpen(false);
                    setSearch("");
                  }}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl border border-transparent p-3 transition",
                    "hover:border-brand-primary hover:bg-background",
                    selectedIcon === name &&
                      "border-brand-primary bg-background",
                  )}
                >
                  <Icon className="h-6 w-6 text-brand-primary" />

                  <span className="line-clamp-2 text-center text-xs">
                    {name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </FormField>
  );
}
