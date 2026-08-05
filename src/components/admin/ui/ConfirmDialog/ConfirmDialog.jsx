"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { TriangleAlert, X } from "lucide-react";

import Button from "@/components/admin/ui/Button";

export default function ConfirmDialog({
  children,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "danger",
  onConfirm,
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in-0" />

        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-background p-6 shadow-2xl dark:border-border-dark dark:bg-background-dark">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                <TriangleAlert size={22} />
              </div>

              <div>
                <Dialog.Title className="text-lg font-semibold text-heading dark:text-heading-dark">
                  {title}
                </Dialog.Title>

                <Dialog.Description className="mt-1 text-sm text-text dark:text-text-dark">
                  {description}
                </Dialog.Description>
              </div>
            </div>

            <Dialog.Close asChild>
              <button className="rounded-lg p-2 transition hover:bg-muted dark:hover:bg-muted-dark">
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <Dialog.Close asChild>
              <Button variant="secondary">{cancelText}</Button>
            </Dialog.Close>

            <Dialog.Close asChild>
              <Button variant={confirmVariant} onClick={onConfirm}>
                {confirmText}
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
