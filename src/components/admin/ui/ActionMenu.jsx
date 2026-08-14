"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

export default function ActionMenu({ children, onEdit, onDelete }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card transition-colors hover:bg-muted dark:border-border-dark dark:bg-card-dark dark:hover:bg-muted-dark"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={6}
          className="min-w-44 rounded-xl border border-border bg-card p-1 shadow-lg dark:border-border-dark dark:bg-card-dark"
        >
          {onEdit && (
            <DropdownMenu.Item onSelect={onEdit} className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm outline-none hover:bg-muted">
              <Pencil className="h-4 w-4" /> Edit
            </DropdownMenu.Item>
          )}
          {onDelete && (
            <DropdownMenu.Item onSelect={onDelete} className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 outline-none hover:bg-red-50">
              <Trash2 className="h-4 w-4" /> Delete
            </DropdownMenu.Item>
          )}
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
