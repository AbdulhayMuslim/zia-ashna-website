"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function ActionMenuSeparator() {
  return (
    <DropdownMenu.Separator className="my-1 h-px bg-border dark:bg-border-dark" />
  );
}
