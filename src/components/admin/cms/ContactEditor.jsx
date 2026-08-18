"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ContactRound,
  Eye,
  GripVertical,
  Loader2,
  Plus,
  RotateCcw,
  Save,
  Trash2,
} from "lucide-react";

import PageContainer from "@/components/admin/layout/PageContainer";
import PageHeader from "@/components/admin/ui/PageHeader";
import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import InputField from "@/components/admin/ui/InputField";
import TextareaField from "@/components/admin/ui/TextareaField";
import IconField from "@/components/admin/ui/IconField";
import { toast } from "@/components/admin/ui/Toast";
import { ICONS } from "@/lib/icons";

const INITIAL_VALUE = {
  sectionTitle: "Contact",
  heading: "",
  description: "",
  cards: [],
};

export default function ContactEditor() {
  const [form, setForm] = useState(INITIAL_VALUE);
  const [saved, setSaved] = useState(INITIAL_VALUE);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    fetch("/api/admin/cms/contact")
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Unable to load contact content.");
        return result.data;
      })
      .then((data) => {
        if (!active || !data) return;
        const next = { ...INITIAL_VALUE, ...data, cards: data.cards ?? [] };
        setForm(next);
        setSaved(next);
      })
      .catch((error) => toast.error(error.message))
      .finally(() => active && setLoading(false));

    return () => { active = false; };
  }, []);

  const dirty = useMemo(() => JSON.stringify(form) !== JSON.stringify(saved), [form, saved]);
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const updateCard = (index, key, value) => setForm((current) => ({
    ...current,
    cards: current.cards.map((card, cardIndex) => cardIndex === index ? { ...card, [key]: value } : card),
  }));
  const addCard = () => setForm((current) => ({
    ...current,
    cards: [...current.cards, { title: "", icon: "Mail" }],
  }));
  const removeCard = (index) => setForm((current) => ({
    ...current,
    cards: current.cards.filter((_, cardIndex) => cardIndex !== index),
  }));

  async function save() {
    setSubmitting(true);
    try {
      const response = await fetch("/api/admin/cms/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to save contact content.");
      const next = { ...INITIAL_VALUE, ...result.data, cards: result.data.cards ?? [] };
      setForm(next);
      setSaved(next);
      toast.success("Contact section saved to the database.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageContainer>
      <PageHeader
        title="Contact Section"
        description="Keep your contact message and ways to connect clear and up to date."
        actions={(
          <div className="flex flex-wrap gap-2">
            <Link href="/#contact" target="_blank" className="inline-flex h-11 items-center gap-2 rounded-2xl border border-border bg-card px-4 text-sm font-medium text-heading transition hover:border-brand-primary/40 hover:bg-brand-primary/10 dark:bg-gray-800 dark:text-heading-dark">
              <Eye className="h-4 w-4" /> View section
            </Link>
            <Button onClick={save} loading={submitting} disabled={loading || !dirty} leftIcon={Save}>Save changes</Button>
          </div>
        )}
      />

      {loading ? (
        <div className="flex min-h-80 items-center justify-center rounded-3xl border border-border bg-card dark:bg-gray-800">
          <div className="flex items-center gap-3 text-sm text-text dark:text-text-dark"><Loader2 className="h-5 w-5 animate-spin text-brand-primary" /> Loading contact content...</div>
        </div>
      ) : (
        <>
          <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <Card
              title="Section content"
              description="Edit the introduction visitors see before your contact options."
              bodyClassName="space-y-5"
              className="xl:sticky xl:top-6"
            >
              <InputField id="contact-section-title" label="Section Title" value={form.sectionTitle} onChange={(event) => update("sectionTitle", event.target.value)} />
              <InputField id="contact-heading" label="Heading" value={form.heading} onChange={(event) => update("heading", event.target.value)} />
              <TextareaField id="contact-description" label="Description" rows={7} value={form.description} onChange={(event) => update("description", event.target.value)} />
            </Card>

            <Card
              className="overflow-visible"
              header={(
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-heading text-lg font-semibold text-heading dark:text-heading-dark">Contact cards</h2>
                      <span className="rounded-full bg-brand-primary/10 px-2.5 py-1 text-xs font-semibold text-brand-primary">{form.cards.length}</span>
                    </div>
                    <p className="mt-1 text-sm text-text dark:text-text-dark">Manage the contact methods displayed on your website.</p>
                  </div>
                  <Button type="button" variant="secondary" size="sm" leftIcon={Plus} onClick={addCard}>Add card</Button>
                </div>
              )}
            >
              {form.cards.length ? (
                <div className="space-y-4">
                  {form.cards.map((card, index) => {
                    const PreviewIcon = ICONS[card.icon] || ContactRound;
                    return (
                      <div key={card.id ?? index} className="group rounded-2xl border border-border bg-background p-4 transition hover:border-brand-primary/30 dark:bg-gray-900 sm:p-5">
                        <div className="mb-5 flex items-center gap-3 border-b border-border pb-4">
                          <GripVertical className="h-5 w-5 shrink-0 text-text-muted/60" />
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                            <PreviewIcon className="h-5 w-5" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-medium text-heading dark:text-heading-dark">{card.title || `Contact card ${index + 1}`}</p>
                            <p className="mt-0.5 truncate text-xs text-text-muted dark:text-text-muted-dark">{card.icon || "No icon selected"}</p>
                          </div>
                          <button type="button" onClick={() => removeCard(index)} aria-label={`Delete contact card ${index + 1}`} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-red-500 transition hover:bg-red-500/10">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2">
                          <InputField id={`contact-card-${index}-title`} label="Title" value={card.title ?? ""} onChange={(event) => updateCard(index, "title", event.target.value)} />
                          <IconField id={`contact-card-${index}-icon`} label="Icon" value={card.icon ?? ""} onChange={(event) => updateCard(index, "icon", event?.target?.value ?? event)} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-14 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary"><ContactRound className="h-6 w-6" /></span>
                  <h3 className="mt-4 font-semibold text-heading dark:text-heading-dark">No contact cards yet</h3>
                  <p className="mt-1 max-w-sm text-sm text-text dark:text-text-dark">Add an email, phone number, social profile, or another way for visitors to reach you.</p>
                  <Button type="button" className="mt-5" variant="secondary" size="sm" leftIcon={Plus} onClick={addCard}>Add first card</Button>
                </div>
              )}
            </Card>
          </div>

          <div className="sticky bottom-4 z-20 flex flex-col gap-3 rounded-2xl border border-border bg-card/95 p-4 shadow-xl backdrop-blur dark:bg-gray-800/95 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-text dark:text-text-dark">{dirty ? "You have unsaved contact changes." : "All contact changes are saved."}</p>
            <div className="flex gap-2">
              <Button type="button" variant="secondary" leftIcon={RotateCcw} onClick={() => setForm(saved)} disabled={!dirty || submitting}>Reset</Button>
              <Button type="button" leftIcon={Save} onClick={save} loading={submitting} disabled={!dirty}>Save changes</Button>
            </div>
          </div>
        </>
      )}
    </PageContainer>
  );
}
