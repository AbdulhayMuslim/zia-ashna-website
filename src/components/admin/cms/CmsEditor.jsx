"use client";

import { useEffect, useMemo, useState } from "react";
import { Save } from "lucide-react";
import PageContainer from "@/components/admin/layout/PageContainer";
import PageActions from "@/components/admin/layout/PageActions";
import PageHeader from "@/components/admin/ui/PageHeader";
import ViewSectionLink from "@/components/admin/ui/ViewSectionLink";
import UnsavedChangesGuard from "@/components/admin/ui/UnsavedChangesGuard";
import FormSection from "@/components/admin/ui/FormSection";
import RepeaterItem from "@/components/admin/ui/RepeaterItem";
import InputField from "@/components/admin/ui/InputField";
import TextareaField from "@/components/admin/ui/TextareaField";
import IconField from "@/components/admin/ui/IconField";
import ImageUploadField from "@/components/admin/ui/ImageUploadField";
import SwitchField from "@/components/admin/ui/SwitchField";
import Button from "@/components/admin/ui/Button";
import { toast } from "@/components/admin/ui/Toast";

function Field({ field, value, onChange, id, disabled = false }) {
  if (field.type === "textarea") return <TextareaField id={id} label={field.label} rows={field.rows ?? 5} value={value ?? ""} onChange={(event) => onChange(event.target.value)} />;
  if (field.type === "icon") return <IconField id={id} label={field.label} value={value ?? ""} onChange={(event) => onChange(event?.target?.value ?? event)} />;
  if (field.type === "image") return <ImageUploadField id={id} label={field.label} description={disabled ? "Uploading image..." : field.description} value={value ?? ""} onChange={onChange} disabled={disabled} />;
  if (field.type === "switch") return <SwitchField id={id} label={field.label} checked={Boolean(value)} onChange={onChange} />;
  return <InputField id={id} label={field.label} type={field.type === "email" ? "email" : "text"} value={value ?? ""} placeholder={field.placeholder} onChange={(event) => onChange(event.target.value)} />;
}

export default function CmsEditor({
  section,
  title,
  description,
  viewHref,
  contentTitle = "Content Settings",
  contentDescription = "This content is stored in PostgreSQL.",
  initialValue,
  fields,
  groups = [],
  children,
}) {
  const [form, setForm] = useState(initialValue);
  const [saved, setSaved] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(`/api/admin/cms/${section}`)
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        return result.data;
      })
      .then((data) => {
        if (!active || !data) return;
        const next = { ...initialValue, ...data };
        setForm(next);
        setSaved(next);
      })
      .catch((error) => toast.error(error.message || "Unable to load content."))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [section, initialValue]);

  const dirty = useMemo(() => JSON.stringify(form) !== JSON.stringify(saved), [form, saved]);
  const setField = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const setFieldValue = async (field, value) => {
    if (field.type !== "image") return setField(field.key, value);
    if (value?.url) return setField(field.key, value.url);
    if (!value?.file) return setField(field.key, "");

    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", value.file);
      const response = await fetch("/api/admin/uploads", { method: "POST", body });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to upload image.");
      setField(field.key, result.data.url);
      toast.success("Profile image uploaded.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };
  const setItem = (groupKey, index, key, value) => setForm((current) => ({
    ...current,
    [groupKey]: current[groupKey].map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item),
  }));
  const addItem = (group) => setForm((current) => ({ ...current, [group.key]: [...current[group.key], { ...group.empty }] }));
  const removeItem = (groupKey, index) => setForm((current) => ({ ...current, [groupKey]: current[groupKey].filter((_, itemIndex) => itemIndex !== index) }));

  const save = async () => {
    setSubmitting(true);
    try {
      const response = await fetch(`/api/admin/cms/${section}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to save content.");
      const next = { ...initialValue, ...result.data };
      setForm(next);
      setSaved(next);
      if (section === "profile") {
        window.dispatchEvent(new CustomEvent("admin-profile-updated", { detail: next }));
        if (typeof BroadcastChannel !== "undefined") {
          const channel = new BroadcastChannel("admin-profile");
          channel.postMessage({ updatedAt: next.updatedAt });
          channel.close();
        }
      }
      toast.success("Changes saved to the database.");
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <PageHeader title={title} description={description} actions={viewHref ? <div className="flex flex-wrap gap-2"><ViewSectionLink href={viewHref} /><Button type="button" leftIcon={Save} onClick={save} disabled={loading || !dirty || submitting || uploading}>{submitting ? "Saving..." : "Save changes"}</Button></div> : undefined} />
      <FormSection title={contentTitle} description={contentDescription}>
        <div className="grid gap-6">
          {fields.map((field) => <Field key={field.type === "image" ? `${field.key}-${form[field.key]}` : field.key} field={field} id={`${section}-${field.key}`} value={form[field.key]} onChange={(value) => setFieldValue(field, value)} disabled={field.type === "image" && uploading} />)}
        </div>
      </FormSection>
      {groups.map((group) => (
        <FormSection key={group.key} title={group.title} description={group.description}>
          <div className="space-y-6">
            {form[group.key].map((item, index) => (
              <RepeaterItem key={item.id ?? `${group.key}-${index}`} title={`${group.itemTitle} ${index + 1}`} onDelete={() => removeItem(group.key, index)}>
                <div className="grid gap-6 md:grid-cols-2">
                  {group.fields.map((field) => <Field key={field.key} field={field} id={`${group.key}-${index}-${field.key}`} value={item[field.key]} onChange={(value) => setItem(group.key, index, field.key, value)} />)}
                </div>
              </RepeaterItem>
            ))}
            <Button type="button" variant="secondary" onClick={() => addItem(group)}>Add {group.itemTitle}</Button>
          </div>
        </FormSection>
      ))}
      {children}
      <PageActions>
        <Button type="button" variant="secondary" onClick={() => setForm(saved)} disabled={!dirty || submitting || uploading}>Reset</Button>
        <Button type="button" onClick={save} disabled={loading || !dirty || submitting || uploading}>{submitting ? "Saving..." : "Save Changes"}</Button>
      </PageActions>
      <UnsavedChangesGuard when={dirty && !submitting} onSave={save} />
    </PageContainer>
  );
}
