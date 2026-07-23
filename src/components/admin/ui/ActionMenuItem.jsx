"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function ActionMenuItem({
  icon: Icon,
  children,
  destructive = false,
  onSelect,
}) {
  return (
    <DropdownMenu.Item
      onSelect={onSelect}
      className={`flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm outline-none transition-colors
        ${
          destructive
            ? "text-red-600 hover:bg-red-50 focus:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10"
            : "hover:bg-muted focus:bg-muted dark:hover:bg-muted-dark dark:focus:bg-muted-dark"
        }`}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </DropdownMenu.Item>
  );
}
