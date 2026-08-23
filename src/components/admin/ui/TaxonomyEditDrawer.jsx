"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Save, X } from "lucide-react";

import Button from "@/components/admin/ui/Button";
import InputField from "@/components/admin/ui/InputField";
import SelectField from "@/components/admin/ui/SelectField";
import { toast } from "@/components/admin/ui/Toast";
import { UnsavedChangesPrompt } from "@/components/admin/ui/UnsavedChangesGuard";

function generateSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function TaxonomyEditDrawer({ item, type, onClose, onSaved }) {
  const initialForm = {
    name: item.name ?? "",
    slug: item.slug ?? "",
    description: item.description ?? "",
    status: item.status ?? "published",
  };
  const [form, setForm] = useState(initialForm);
  const [open, setOpen] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);
  const dirty = JSON.stringify(form) !== JSON.stringify(initialForm);
  const singular = type === "categories" ? "Category" : "Tag";
  const requestClose = () => dirty ? setConfirmClose(true) : setOpen(false);

  useEffect(() => {
    if (open) return undefined;
    const closeTimer = window.setTimeout(onClose, 300);
    return () => window.clearTimeout(closeTimer);
  }, [open, onClose]);

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const save = async () => {
    if (!dirty) return true;
    setSubmitting(true);

    try {
      const response = await fetch(`/api/admin/${type}/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || `Unable to update ${singular.toLowerCase()}.`);
      }

      onSaved(result.data);
      toast.success(`${singular} updated successfully.`);
      setOpen(false);
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={(nextOpen) => { if (!nextOpen) requestClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm duration-300 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-2xl flex-col border-l border-border bg-background shadow-2xl outline-none duration-300 data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right dark:bg-gray-900">
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border bg-card px-5 py-4 dark:bg-gray-800 sm:px-6">
            <div className="min-w-0">
              <Dialog.Title className="font-heading text-xl font-semibold text-heading dark:text-heading-dark">
                Edit {singular.toLowerCase()}
              </Dialog.Title>
              <Dialog.Description className="mt-1 truncate text-sm text-text dark:text-text-dark">
                {item.name}
              </Dialog.Description>
            </div>
            <button type="button" onClick={requestClose} aria-label="Close editor" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-text transition hover:bg-brand-primary/10 hover:text-brand-primary dark:text-text-dark"><X className="h-5 w-5" /></button>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-6">
            <section className="space-y-5 rounded-3xl border border-border bg-card p-5 dark:bg-gray-800">
              <div>
                <h3 className="font-semibold text-heading dark:text-heading-dark">{singular} details</h3>
                <p className="mt-1 text-sm text-text dark:text-text-dark">Update the name and URL slug.</p>
              </div>

              <InputField
                id={`drawer-${type}-name`}
                label={`${singular} Name`}
                value={form.name}
                onChange={(event) => update("name", event.target.value)}
              />

              <div className="flex items-end gap-3">
                <div className="min-w-0 flex-1">
                  <InputField
                    id={`drawer-${type}-slug`}
                    label="Slug"
                    value={form.slug}
                    onChange={(event) => update("slug", event.target.value)}
                  />
                </div>
                <Button type="button" variant="secondary" onClick={() => update("slug", generateSlug(form.name))}>
                  Generate
                </Button>
              </div>

            </section>

            <section className="rounded-3xl border border-border bg-card p-5 dark:bg-gray-800">
              <SelectField
                id={`drawer-${type}-status`}
                label="Status"
                value={form.status}
                onChange={(event) => update("status", event.target.value)}
                options={[
                  { label: "Published", value: "published" },
                  { label: "Draft", value: "draft" },
                ]}
              />
            </section>
          </div>

          <div className="flex shrink-0 justify-end gap-2 border-t border-border bg-card p-4 dark:bg-gray-800 sm:px-6">
            <Button type="button" variant="secondary" onClick={requestClose}>Cancel</Button>
            <Button type="button" leftIcon={Save} onClick={save} loading={submitting} disabled={!dirty}>
              Save Changes
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
      <UnsavedChangesPrompt open={confirmClose} onStay={() => setConfirmClose(false)} onDiscard={() => { setConfirmClose(false); setOpen(false); }} onSave={save} saving={submitting} />
    </Dialog.Root>
  );
}
