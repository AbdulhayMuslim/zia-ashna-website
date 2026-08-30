"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Award,
  BriefcaseBusiness,
  GraduationCap,
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
import { toast } from "@/components/admin/ui/Toast";

const INITIAL_VALUE = {
  sectionTitle: "About Me",
  role: "",
  heading: "",
  description: "",
  experiences: [],
  jobExperiences: [],
  education: [],
  certificates: [],
};

function CollectionHeader({ icon: Icon, title, description, actionLabel, onAdd }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-heading text-lg font-semibold text-heading dark:text-heading-dark">{title}</h2>
          <p className="mt-1 text-sm text-text dark:text-text-dark">{description}</p>
        </div>
      </div>
      <Button type="button" variant="secondary" size="sm" leftIcon={Plus} onClick={onAdd}>
        {actionLabel}
      </Button>
    </div>
  );
}

function EmptyCollection({ icon: Icon, title, description, actionLabel, onAdd }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-10 text-center transition-colors hover:border-brand-primary">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-semibold text-heading dark:text-heading-dark">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-text dark:text-text-dark">{description}</p>
      <Button type="button" className="mt-5" variant="secondary" size="sm" leftIcon={Plus} onClick={onAdd}>
        {actionLabel}
      </Button>
    </div>
  );
}

function ItemHeading({ title, meta, onRemove, removeLabel }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3 border-b border-border pb-4">
      <div className="min-w-0">
        <p className="truncate font-medium text-heading dark:text-heading-dark">{title}</p>
        <p className="mt-1 text-xs text-text-muted dark:text-text-muted-dark">{meta}</p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        aria-label={removeLabel}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-red-500 transition hover:bg-red-500/10"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function AboutEditor() {
  const [form, setForm] = useState(INITIAL_VALUE);
  const [saved, setSaved] = useState(INITIAL_VALUE);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/admin/cms/about")
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Unable to load about content.");
        return result.data;
      })
      .then((data) => {
        if (!active || !data) return;
        const next = {
          ...INITIAL_VALUE,
          ...data,
          experiences: data.experiences ?? [],
          jobExperiences: data.jobExperiences ?? [],
          education: data.education ?? [],
          certificates: data.certificates ?? [],
        };
        setForm(next);
        setSaved(next);
      })
      .catch((error) => toast.error(error.message))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  const dirty = useMemo(() => JSON.stringify(form) !== JSON.stringify(saved), [form, saved]);
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const addItem = (key, value) => setForm((current) => ({ ...current, [key]: [...current[key], value] }));
  const updateItem = (key, index, field, value) => setForm((current) => ({
    ...current,
    [key]: current[key].map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item),
  }));
  const removeItem = (key, index) => setForm((current) => ({
    ...current,
    [key]: current[key].filter((_, itemIndex) => itemIndex !== index),
  }));

  async function save() {
    setSubmitting(true);
    try {
      const response = await fetch("/api/admin/cms/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, expectedUpdatedAt: saved.updatedAt }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to save about content.");
      const next = {
        ...INITIAL_VALUE,
        ...result.data,
        experiences: result.data.experiences ?? [],
        jobExperiences: result.data.jobExperiences ?? [],
        education: result.data.education ?? [],
        certificates: result.data.certificates ?? [],
      };
      setForm(next);
      setSaved(next);
      toast.success("About section saved to the database.");
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
        title="About Section"
        description="Manage your introduction, career highlights, education, and certificates."
        actions={(
          <div className="flex flex-wrap gap-2">
            <ViewSectionLink href="/#about" />
            <Button onClick={save} loading={submitting} disabled={loading || !dirty} leftIcon={Save}>Save changes</Button>
          </div>
        )}
      />

      {loading ? (
        <div className="flex min-h-80 items-center justify-center rounded-3xl border border-border bg-card dark:bg-gray-800">
          <div className="flex items-center gap-3 text-sm text-text dark:text-text-dark">
            <Loader2 className="h-5 w-5 animate-spin text-brand-primary" /> Loading about content...
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <Card title="About content" description="Write the main introduction visitors see in your about section." bodyClassName="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <InputField id="sectionTitle" label="Section Title" value={form.sectionTitle} onChange={(event) => update("sectionTitle", event.target.value)} />
              <InputField id="role" label="Role" value={form.role} onChange={(event) => update("role", event.target.value)} />
            </div>
            <InputField id="heading" label="Heading" value={form.heading} onChange={(event) => update("heading", event.target.value)} />
            <TextareaField id="description" label="Description" rows={7} value={form.description} onChange={(event) => update("description", event.target.value)} />
          </Card>

          <Card header={<CollectionHeader icon={BriefcaseBusiness} title="Experience highlights" description="Add the key numbers and labels used to summarize your experience." actionLabel="Add experience" onAdd={() => addItem("experiences", { number: "", title: "" })} />}>
            {form.experiences.length ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {form.experiences.map((item, index) => (
                  <div key={item.id ?? index} className="rounded-2xl border border-border bg-background p-5 dark:bg-gray-900">
                    <ItemHeading title={item.title || `Experience ${index + 1}`} meta={`Highlight ${index + 1} of ${form.experiences.length}`} onRemove={() => removeItem("experiences", index)} removeLabel={`Delete experience ${index + 1}`} />
                    <div className="space-y-4">
                      <InputField id={`experience-${index}-number`} label="Number" value={item.number ?? ""} onChange={(event) => updateItem("experiences", index, "number", event.target.value)} />
                      <InputField id={`experience-${index}-title`} label="Title" value={item.title ?? ""} onChange={(event) => updateItem("experiences", index, "title", event.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            ) : <EmptyCollection icon={BriefcaseBusiness} title="No experience highlights yet" description="Add your first career number or achievement." actionLabel="Add first experience" onAdd={() => addItem("experiences", { number: "", title: "" })} />}
          </Card>

          <Card header={<CollectionHeader icon={BriefcaseBusiness} title="Job Experience" description="Add the roles, institutions, and years that make up your professional history." actionLabel="Add job" onAdd={() => addItem("jobExperiences", { role: "", institution: "", year: "" })} />}>
            {form.jobExperiences.length ? (
              <div className="grid gap-4 lg:grid-cols-2">
                {form.jobExperiences.map((item, index) => (
                  <div key={item.id ?? index} className="rounded-2xl border border-border bg-background p-5 dark:bg-gray-900">
                    <ItemHeading title={item.role || `Job ${index + 1}`} meta={`Position ${index + 1} of ${form.jobExperiences.length}`} onRemove={() => removeItem("jobExperiences", index)} removeLabel={`Delete job ${index + 1}`} />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <InputField id={`job-${index}-role`} label="Role" className="sm:col-span-2" value={item.role ?? ""} onChange={(event) => updateItem("jobExperiences", index, "role", event.target.value)} />
                      <InputField id={`job-${index}-institution`} label="Institution" value={item.institution ?? ""} onChange={(event) => updateItem("jobExperiences", index, "institution", event.target.value)} />
                      <InputField id={`job-${index}-year`} label="Year" value={item.year ?? ""} onChange={(event) => updateItem("jobExperiences", index, "year", event.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            ) : <EmptyCollection icon={BriefcaseBusiness} title="No job experience yet" description="Add your first role, institution, and year." actionLabel="Add first job" onAdd={() => addItem("jobExperiences", { role: "", institution: "", year: "" })} />}
          </Card>

          <Card header={<CollectionHeader icon={GraduationCap} title="Education" description="Keep your academic background clear and easy to scan." actionLabel="Add education" onAdd={() => addItem("education", { degree: "", institution: "", year: "" })} />}>
            {form.education.length ? (
              <div className="grid gap-4 lg:grid-cols-2">
                {form.education.map((item, index) => (
                  <div key={item.id ?? index} className="rounded-2xl border border-border bg-background p-5 dark:bg-gray-900">
                    <ItemHeading title={item.degree || `Education ${index + 1}`} meta={`Entry ${index + 1} of ${form.education.length}`} onRemove={() => removeItem("education", index)} removeLabel={`Delete education ${index + 1}`} />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <InputField id={`education-${index}-degree`} label="Degree" className="sm:col-span-2" value={item.degree ?? ""} onChange={(event) => updateItem("education", index, "degree", event.target.value)} />
                      <InputField id={`education-${index}-institution`} label="Institution" value={item.institution ?? ""} onChange={(event) => updateItem("education", index, "institution", event.target.value)} />
                      <InputField id={`education-${index}-year`} label="Year" value={item.year ?? ""} onChange={(event) => updateItem("education", index, "year", event.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            ) : <EmptyCollection icon={GraduationCap} title="No education entries yet" description="Add a degree, institution, and completion year." actionLabel="Add first education" onAdd={() => addItem("education", { degree: "", institution: "", year: "" })} />}
          </Card>

          <Card header={<CollectionHeader icon={Award} title="Certificates" description="Add the names of certificates you have earned." actionLabel="Add certificate" onAdd={() => addItem("certificates", { name: "" })} />}>
            {form.certificates.length ? (
              <div className="grid gap-4 lg:grid-cols-2">
                {form.certificates.map((item, index) => (
                  <div key={item.id ?? index} className="rounded-2xl border border-border bg-background p-5 dark:bg-gray-900">
                    <ItemHeading title={item.name || `Certificate ${index + 1}`} meta={`Credential ${index + 1} of ${form.certificates.length}`} onRemove={() => removeItem("certificates", index)} removeLabel={`Delete certificate ${index + 1}`} />
                    <InputField id={`certificate-${index}-name`} label="Name" value={item.name ?? ""} onChange={(event) => updateItem("certificates", index, "name", event.target.value)} />
                  </div>
                ))}
              </div>
            ) : <EmptyCollection icon={Award} title="No certificates yet" description="Add the name of your first certificate." actionLabel="Add first certificate" onAdd={() => addItem("certificates", { name: "" })} />}
          </Card>

          <div className="sticky bottom-4 z-20 flex flex-col gap-3 rounded-2xl border border-border bg-card/95 p-4 shadow-xl backdrop-blur dark:bg-gray-800/95 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-text dark:text-text-dark">{dirty ? "You have unsaved about changes." : "All about changes are saved."}</p>
            <div className="flex gap-2">
              <Button type="button" variant="secondary" leftIcon={RotateCcw} onClick={() => setForm(saved)} disabled={!dirty || submitting}>Reset</Button>
              <Button type="button" leftIcon={Save} onClick={save} loading={submitting} disabled={!dirty}>Save changes</Button>
            </div>
          </div>
          <UnsavedChangesGuard when={dirty && !submitting} onSave={save} />
        </div>
      )}
    </PageContainer>
  );
}
