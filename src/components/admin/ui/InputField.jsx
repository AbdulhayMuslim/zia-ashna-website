"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import cn from "@/utils/cn";
import FormField from "./FormField";

export default function InputField({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  helperText,
  className,
  defaultValue,
  registration,
  ...props
}) {
  const controlled = value !== undefined;
  const passwordField = type === "password";
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <FormField
      id={id}
      label={label}
      required={required}
      error={error}
      helperText={helperText}
    >
      <div className="relative">
        <input
          id={id}
          name={name}
          type={passwordField && passwordVisible ? "text" : type}
          {...(controlled
            ? {
                value: value ?? "",
                onChange,
              }
            : {
                defaultValue,
                onChange,
              })}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
          className={cn(
            "w-full rounded-2xl border border-border bg-card px-4 py-3 text-heading outline-none transition-all dark:text-heading-dark",
            "focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20",
            "disabled:cursor-not-allowed disabled:opacity-60",
            passwordField && "pr-12",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className,
          )}
          {...registration}
          {...props}
        />
        {passwordField && (
          <button
            type="button"
            onClick={() => setPasswordVisible((visible) => !visible)}
            disabled={disabled}
            aria-label={passwordVisible ? "Hide password" : "Show password"}
            aria-pressed={passwordVisible}
            title={passwordVisible ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-text-muted transition hover:bg-brand-primary/10 hover:text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 disabled:cursor-not-allowed disabled:opacity-50 dark:text-text-muted-dark"
          >
            {passwordVisible ? <EyeOff className="h-5 w-5 shrink-0" /> : <Eye className="h-5 w-5 shrink-0" />}
          </button>
        )}
      </div>
    </FormField>
  );
}
