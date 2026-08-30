"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Link2,
  Loader2,
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
import ImageUploadField from "@/components/admin/ui/ImageUploadField";
import { toast } from "@/components/admin/ui/Toast";

const INITIAL_VALUE = {
  sectionTitle: "Entrepreneur | Founder",
  name: "Sayed Zia Ashna",
  description: "",
  buttonLabel: "Get In Touch",
  buttonUrl: "#contact",
  heroImageUrl: "",
  logos: [],
};

export default function HeroEditor() {
  const [form, setForm] = useState(INITIAL_VALUE);
  const [saved, setSaved] = useState(INITIAL_VALUE);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/admin/cms/hero")
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Unable to load hero content.");
        return result.data;
      })
      .then((data) => {
        if (!active || !data) return;
        const next = { ...INITIAL_VALUE, ...data, logos: data.logos ?? [] };
        setForm(next);
        setSaved(next);
      })
      .catch((error) => toast.error(error.message))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  const dirty = useMemo(() => JSON.stringify(form) !== JSON.stringify(saved), [form, saved]);
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const updateLogo = (index, key, value) => setForm((current) => ({
    ...current,
    logos: current.logos.map((logo, logoIndex) => logoIndex === index ? { ...logo, [key]: value } : logo),
  }));
  const addLogo = () => setForm((current) => ({ ...current, logos: [...current.logos, { name: "", imageUrl: "", linkUrl: "" }] }));
  const removeLogo = (index) => setForm((current) => ({ ...current, logos: current.logos.filter((_, logoIndex) => logoIndex !== index) }));

  async function uploadImage(file) {
    const body = new FormData();
    body.append("file", file);
    const response = await fetch("/api/admin/uploads", { method: "POST", body });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Unable to upload image.");
    return result.data.url;
  }

  async function selectHeroImage(value) {
    if (value?.url) return update("heroImageUrl", value.url);
    if (!value?.file) return update("heroImageUrl", "");
    setUploading(true);
    try {
      update("heroImageUrl", await uploadImage(value.file));
      toast.success("Hero image uploaded.");
    } catch (error) { toast.error(error.message); }
    finally { setUploading(false); }
  }

  async function selectLogoImage(index, value) {
    if (value?.url) return updateLogo(index, "imageUrl", value.url);
    if (!value?.file) return updateLogo(index, "imageUrl", "");
    setUploading(true);
    try {
      updateLogo(index, "imageUrl", await uploadImage(value.file));
      toast.success("Brand logo uploaded.");
    } catch (error) { toast.error(error.message); }
    finally { setUploading(false); }
  }

  async function save() {
    setSubmitting(true);
    try {
      const response = await fetch("/api/admin/cms/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, expectedUpdatedAt: saved.updatedAt }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to save hero content.");
      const next = { ...INITIAL_VALUE, ...result.data, logos: result.data.logos ?? [] };
      setForm(next);
      setSaved(next);
      toast.success("Hero section saved to the database.");
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
        title="Hero Section"
        description="Shape the first impression visitors see on your homepage."
        actions={(
          <div className="flex flex-wrap gap-2">
            <ViewSectionLink href="/" />
            <Button onClick={save} loading={submitting} disabled={loading || uploading || !dirty} leftIcon={Save}>Save changes</Button>
          </div>
        )}
      />

      {loading ? (
        <div className="flex min-h-80 items-center justify-center rounded-3xl border border-border bg-card dark:bg-gray-800">
          <div className="flex items-center gap-3 text-sm text-text dark:text-text-dark"><Loader2 className="h-5 w-5 animate-spin text-brand-primary" /> Loading hero content...</div>
        </div>
      ) : (
        <>
          <section className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-2">
              <Card
                title="Hero content"
                description="Edit the headline and supporting copy shown above the fold."
                bodyClassName="space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <InputField id="sectionTitle" label="Section Title" value={form.sectionTitle} onChange={(event) => update("sectionTitle", event.target.value)} />
                  <InputField id="name" label="Name" value={form.name} onChange={(event) => update("name", event.target.value)} />
                </div>
                <TextareaField id="description" label="Description" rows={6} value={form.description} onChange={(event) => update("description", event.target.value)} />
              </Card>

              <div className="space-y-6">
                <Card title="Call to action" description="Control the primary action displayed in the hero.">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InputField id="buttonLabel" label="Button Label" value={form.buttonLabel} onChange={(event) => update("buttonLabel", event.target.value)} />
                    <InputField id="buttonUrl" label="Button URL" value={form.buttonUrl} onChange={(event) => update("buttonUrl", event.target.value)} />
                  </div>
                </Card>

                <Card title="Hero image" description="Choose the main portrait or artwork from your computer.">
                  <ImageUploadField id="heroImage" label="Hero Image" description="Max size: 2MB · JPG, PNG, WEBP" value={form.heroImageUrl} onChange={selectHeroImage} disabled={uploading} />
                </Card>
              </div>
            </div>
          </section>

          <Card
            title="Brand logos"
            description="Manage the partner and company logos displayed beneath the hero."
            header={(
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div><h2 className="font-heading text-lg font-semibold text-heading dark:text-heading-dark">Brand logos</h2><p className="mt-1 text-sm text-text dark:text-text-dark">Manage the partner and company logos displayed beneath the hero.</p></div>
                <Button type="button" variant="secondary" size="sm" leftIcon={Plus} onClick={addLogo}>Add logo</Button>
              </div>
            )}
          >
            {form.logos.length ? (
              <div className="space-y-4">
                {form.logos.map((logo, index) => (
                  <div key={logo.id ?? index} className="rounded-2xl border border-border bg-background p-4 dark:bg-gray-900 sm:p-5">
                    <div className="mb-5 flex items-center justify-between gap-3 border-b border-border pb-4">
                      <div><p className="font-medium text-heading dark:text-heading-dark">{logo.name || `Brand logo ${index + 1}`}</p><p className="mt-1 text-xs text-text-muted dark:text-text-muted-dark">Logo {index + 1} of {form.logos.length}</p></div>
                      <button type="button" onClick={() => removeLogo(index)} aria-label={`Delete logo ${index + 1}`} className="flex h-9 w-9 items-center justify-center rounded-xl text-red-500 transition hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
                    </div>
                    <div className="grid items-start gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
                      <ImageUploadField id={`logo-${index}-image`} label="Logo Image" value={logo.imageUrl} onChange={(value) => selectLogoImage(index, value)} disabled={uploading} compact />
                      <div className="grid gap-5">
                        <InputField id={`logo-${index}-name`} label="Name" value={logo.name ?? ""} onChange={(event) => updateLogo(index, "name", event.target.value)} />
                        <InputField id={`logo-${index}-link`} label="Website URL" value={logo.linkUrl ?? ""} onChange={(event) => updateLogo(index, "linkUrl", event.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-12 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary"><Link2 className="h-5 w-5" /></span>
                <h3 className="mt-4 font-semibold text-heading dark:text-heading-dark">No brand logos yet</h3>
                <p className="mt-1 max-w-sm text-sm text-text dark:text-text-dark">Add a logo to display a partner or company link beneath the hero.</p>
                <Button type="button" className="mt-5" variant="secondary" size="sm" leftIcon={Plus} onClick={addLogo}>Add first logo</Button>
              </div>
            )}
          </Card>

          <div className="sticky bottom-4 z-20 flex flex-col gap-3 rounded-2xl border border-border bg-card/95 p-4 shadow-xl backdrop-blur dark:bg-gray-800/95 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-text dark:text-text-dark">{dirty ? "You have unsaved hero changes." : "All hero changes are saved."}</p>
            <div className="flex gap-2">
              <Button type="button" variant="secondary" leftIcon={RotateCcw} onClick={() => setForm(saved)} disabled={!dirty || submitting}>Reset</Button>
              <Button type="button" leftIcon={Save} onClick={save} loading={submitting} disabled={!dirty || uploading}>Save changes</Button>
            </div>
          </div>
          <UnsavedChangesGuard when={dirty && !submitting} onSave={save} />
        </>
      )}
    </PageContainer>
  );
}
