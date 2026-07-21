"use client";

import InputField from "@/components/admin/ui/InputField";

export default function DataTableToolbar({
  search = "",
  onSearchChange,
  searchPlaceholder = "Search...",
  children,
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="w-full md:max-w-sm">
        <InputField
          id="datatable-search"
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>

      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
