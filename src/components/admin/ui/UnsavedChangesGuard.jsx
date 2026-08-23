"use client";

import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AlertTriangle, Save, Trash2, X } from "lucide-react";

import Button from "@/components/admin/ui/Button";

export default function UnsavedChangesGuard({ when, onSave }) {
  const [destination, setDestination] = useState(null);
  const [saving, setSaving] = useState(false);
  const leaving = useRef(false);

  useEffect(() => {
    if (!when) return undefined;
    function warnBeforeUnload(event) {
      if (leaving.current) return;
      event.preventDefault();
      event.returnValue = "";
    }
    function interceptLink(event) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest("a[href]");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (url.href === window.location.href) return;
      event.preventDefault();
      event.stopPropagation();
      setDestination(url.href);
    }
    window.addEventListener("beforeunload", warnBeforeUnload);
    document.addEventListener("click", interceptLink, true);
    return () => {
      window.removeEventListener("beforeunload", warnBeforeUnload);
      document.removeEventListener("click", interceptLink, true);
    };
  }, [when]);

  function leave() {
    if (destination) {
      leaving.current = true;
      window.location.assign(destination);
    }
  }

  async function saveAndLeave() {
    setSaving(true);
    try {
      const saved = await onSave?.();
      if (saved !== false) leave();
    } finally {
      setSaving(false);
    }
  }

  return <UnsavedChangesPrompt open={Boolean(destination)} onStay={() => setDestination(null)} onDiscard={leave} onSave={saveAndLeave} saving={saving} />;
}

export function UnsavedChangesPrompt({ open, onStay, onDiscard, onSave, saving = false }) {
  return (
    <Dialog.Root open={open} onOpenChange={(nextOpen) => !nextOpen && onStay()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-70 bg-black/60 backdrop-blur-sm animate-in fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-70 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-border bg-background shadow-2xl outline-none animate-in fade-in-0 zoom-in-95 dark:bg-gray-900">
          <div className="flex items-start gap-4 p-5 sm:p-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400"><AlertTriangle className="h-6 w-6" /></span>
            <div className="min-w-0 flex-1">
              <Dialog.Title className="font-heading text-xl font-semibold text-heading dark:text-heading-dark">Unsaved changes</Dialog.Title>
              <Dialog.Description className="mt-2 text-sm leading-6 text-text dark:text-text-dark">Unsaved changes will be lost. Save before leaving if you want to keep them.</Dialog.Description>
            </div>
            <Dialog.Close asChild><button type="button" aria-label="Stay on this page" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-text transition hover:bg-muted dark:text-text-dark"><X className="h-5 w-5" /></button></Dialog.Close>
          </div>
          <div className="flex items-center justify-end gap-2 border-t border-border bg-card p-4 dark:bg-gray-800 sm:px-6">
            <Button type="button" size="sm" variant="secondary" onClick={onStay} className="min-w-0 flex-1 whitespace-nowrap px-2 sm:flex-none sm:px-4">Stay</Button>
            <Button type="button" size="sm" variant="danger" leftIcon={Trash2} onClick={onDiscard} className="min-w-0 flex-1 whitespace-nowrap px-2 sm:flex-none sm:px-4">Discard</Button>
            <Button type="button" size="sm" leftIcon={Save} loading={saving} onClick={onSave} className="min-w-0 flex-1 whitespace-nowrap px-2 sm:flex-none sm:px-4">Save</Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
