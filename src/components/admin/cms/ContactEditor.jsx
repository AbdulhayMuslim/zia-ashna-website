"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ContactRound,
  Globe,
  GripVertical,
  Loader2,
  MapPin,
  Plus,
  RotateCcw,
  Save,
  Trash2,
} from "lucide-react";

import PageContainer from "@/components/admin/layout/PageContainer";
import PageHeader from "@/components/admin/ui/PageHeader";
import ViewSectionLink from "@/components/admin/ui/ViewSectionLink";
import UnsavedChangesGuard from "@/components/admin/ui/UnsavedChangesGuard";
import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import InputField from "@/components/admin/ui/InputField";
import TextareaField from "@/components/admin/ui/TextareaField";
import IconField from "@/components/admin/ui/IconField";
import { toast } from "@/components/admin/ui/Toast";
import { ICONS } from "@/lib/icons";
import { SOCIAL_ICONS, SOCIAL_ICON_LIST } from "@/lib/social-icons";

const INITIAL_VALUE = {
  sectionTitle: "Contact",
  heading: "",
  description: "",
  cards: [],
  addresses: [],
  socialLinks: [],
};

function normalize(data) {
  return {
    ...INITIAL_VALUE,
    ...data,
    cards: data?.cards ?? [],
    addresses: data?.addresses ?? [],
    socialLinks: data?.socialLinks ?? [],
  };
}

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
        const next = normalize(data);
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
  const updateItem = (group, index, key, value) => setForm((current) => ({
    ...current,
    [group]: current[group].map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item),
  }));
  const addItem = (group, item) => setForm((current) => ({ ...current, [group]: [...current[group], item] }));
  const removeItem = (group, index) => setForm((current) => ({
    ...current,
    [group]: current[group].filter((_, itemIndex) => itemIndex !== index),
  }));

  async function save() {
    setSubmitting(true);
    try {
      const response = await fetch("/api/admin/cms/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, expectedUpdatedAt: saved.updatedAt }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to save contact content.");
      const next = normalize(result.data);
      setForm(next);
      setSaved(next);
      toast.success("Contact section saved to the database.");
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
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
            <ViewSectionLink href="/#contact" />
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

          <div className="grid items-start gap-6 xl:grid-cols-2">
            <Card
              className="overflow-visible"
              header={(
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-heading text-lg font-semibold text-heading dark:text-heading-dark">Contact addresses</h2>
                      <span className="rounded-full bg-brand-primary/10 px-2.5 py-1 text-xs font-semibold text-brand-primary">{form.addresses.length}</span>
                    </div>
                    <p className="mt-1 text-sm text-text dark:text-text-dark">Add phone numbers, emails, offices, or future contact points.</p>
                  </div>
                  <Button type="button" variant="secondary" leftIcon={Plus} onClick={() => addItem("addresses", { label: "", value: "", icon: "MapPin", linkUrl: "" })} className="w-full shrink-0 whitespace-nowrap border-brand-primary/20 bg-brand-primary/10 text-brand-primary shadow-sm hover:border-brand-primary/40 hover:bg-brand-primary hover:text-white sm:w-auto">Add address</Button>
                </div>
              )}
            >
              {form.addresses.length ? (
                <div className="space-y-4">
                  {form.addresses.map((address, index) => {
                    const PreviewIcon = ICONS[address.icon] || MapPin;
                    return (
                      <div key={address.id ?? index} className="rounded-2xl border border-border bg-background p-4 dark:bg-gray-900">
                        <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
                          <GripVertical className="h-5 w-5 shrink-0 text-text-muted/60" />
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary"><PreviewIcon className="h-5 w-5" /></span>
                          <div className="min-w-0 flex-1"><p className="truncate font-medium text-heading dark:text-heading-dark">{address.label || `Address ${index + 1}`}</p><p className="truncate text-xs text-text-muted dark:text-text-muted-dark">{address.value || "No value yet"}</p></div>
                          <button type="button" onClick={() => removeItem("addresses", index)} aria-label={`Delete address ${index + 1}`} className="flex h-9 w-9 items-center justify-center rounded-xl text-red-500 transition hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <InputField id={`contact-address-${index}-label`} label="Label" placeholder="Email, phone, office..." value={address.label ?? ""} onChange={(event) => updateItem("addresses", index, "label", event.target.value)} />
                          <InputField id={`contact-address-${index}-value`} label="Contact detail" value={address.value ?? ""} onChange={(event) => updateItem("addresses", index, "value", event.target.value)} />
                          <IconField id={`contact-address-${index}-icon`} label="Icon" value={address.icon ?? ""} onChange={(event) => updateItem("addresses", index, "icon", event?.target?.value ?? event)} />
                          <InputField id={`contact-address-${index}-link`} label="Clickable link (optional)" placeholder="mailto:, tel:, or https://" value={address.linkUrl ?? ""} onChange={(event) => updateItem("addresses", index, "linkUrl", event.target.value)} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-12 text-center"><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary"><MapPin className="h-6 w-6" /></span><h3 className="mt-4 font-semibold text-heading dark:text-heading-dark">No addresses yet</h3><p className="mt-1 max-w-sm text-sm text-text dark:text-text-dark">You can add phone, email, or location details whenever they become available.</p></div>
              )}
            </Card>

            <Card
              className="overflow-visible"
              header={(
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-heading text-lg font-semibold text-heading dark:text-heading-dark">Social profiles</h2>
                      <span className="rounded-full bg-brand-primary/10 px-2.5 py-1 text-xs font-semibold text-brand-primary">{form.socialLinks.length}</span>
                    </div>
                    <p className="mt-1 text-sm text-text dark:text-text-dark">These profiles appear in both the website header and footer.</p>
                  </div>
                  <Button type="button" variant="secondary" leftIcon={Plus} onClick={() => addItem("socialLinks", { label: "", icon: "Globe", url: "" })} className="w-full shrink-0 whitespace-nowrap border-brand-primary/20 bg-brand-primary/10 text-brand-primary shadow-sm hover:border-brand-primary/40 hover:bg-brand-primary hover:text-white sm:w-auto">Add social link</Button>
                </div>
              )}
            >
              {form.socialLinks.length ? (
                <div className="space-y-4">
                  {form.socialLinks.map((social, index) => {
                    const PreviewIcon = SOCIAL_ICONS[social.icon] || Globe;
                    return (
                      <div key={social.id ?? index} className="rounded-2xl border border-border bg-background p-4 dark:bg-gray-900">
                        <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
                          <GripVertical className="h-5 w-5 shrink-0 text-text-muted/60" />
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary"><PreviewIcon className="h-5 w-5" /></span>
                          <div className="min-w-0 flex-1"><p className="truncate font-medium text-heading dark:text-heading-dark">{social.label || `Social profile ${index + 1}`}</p><p className="truncate text-xs text-text-muted dark:text-text-muted-dark">{social.url || "No link yet"}</p></div>
                          <button type="button" onClick={() => removeItem("socialLinks", index)} aria-label={`Delete social profile ${index + 1}`} className="flex h-9 w-9 items-center justify-center rounded-xl text-red-500 transition hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <InputField id={`contact-social-${index}-label`} label="Profile name" placeholder="Facebook" value={social.label ?? ""} onChange={(event) => updateItem("socialLinks", index, "label", event.target.value)} />
                          <InputField id={`contact-social-${index}-url`} label="Profile link" placeholder="https://..." value={social.url ?? ""} onChange={(event) => updateItem("socialLinks", index, "url", event.target.value)} />
                          <div className="sm:col-span-2"><IconField id={`contact-social-${index}-icon`} label="Social icon" value={social.icon ?? ""} icons={SOCIAL_ICONS} iconList={SOCIAL_ICON_LIST} onChange={(event) => updateItem("socialLinks", index, "icon", event?.target?.value ?? event)} /></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-12 text-center"><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary"><Globe className="h-6 w-6" /></span><h3 className="mt-4 font-semibold text-heading dark:text-heading-dark">No social profiles yet</h3><p className="mt-1 max-w-sm text-sm text-text dark:text-text-dark">Add a profile and it will appear in the header and footer after saving.</p></div>
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
          <UnsavedChangesGuard when={dirty && !submitting} onSave={save} />
        </>
      )}
    </PageContainer>
  );
}
