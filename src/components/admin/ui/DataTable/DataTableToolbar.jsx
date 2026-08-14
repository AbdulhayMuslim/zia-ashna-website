"use client";

import InputField from "@/components/admin/ui/InputField";

export default function DataTableToolbar({
  search = "",
  onSearchChange,
  searchPlaceholder = "Search...",
  children,
}) {
  return (
    <div className="mb-6 flex min-w-0 flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:justify-between">
      <div className="w-full md:max-w-sm">
        <InputField
          id="datatable-search"
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>

      {children && <div className="flex min-w-0 flex-wrap items-center gap-2 md:justify-end">{children}</div>}
    </div>
  );
}
