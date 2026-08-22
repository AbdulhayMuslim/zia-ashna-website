"use client";

import { useState } from "react";

import { toast } from "@/components/admin/ui/Toast";

import PageContainer from "@/components/admin/layout/PageContainer";
import PageActions from "@/components/admin/layout/PageActions";

import PageHeader from "@/components/admin/ui/PageHeader";
import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import InputField from "@/components/admin/ui/InputField";
import SelectField from "@/components/admin/ui/SelectField";

const INITIAL_FORM = {
  name: "",
  slug: "",
  status: "published",
};

function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function CreateTagPage() {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const dirty = JSON.stringify(form) !== JSON.stringify(INITIAL_FORM);

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/admin/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok)
        throw new Error(result.message || "Unable to create tag.");

      toast.success("Tag created successfully.");
      setForm(INITIAL_FORM);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <PageHeader title="Create Tag" description="Create a new blog tag." />

      <form onSubmit={handleSubmit}>
        <Card title="Tag Details">
          <div className="space-y-5">
            <InputField
              id="name"
              label="Tag Name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Enter tag name"
            />

            <div className="flex items-end gap-3">
              <div className="flex-1">
                <InputField
                  id="slug"
                  label="Slug"
                  value={form.slug}
                  onChange={(e) => updateField("slug", e.target.value)}
                  placeholder="tag-slug"
                />
              </div>

              <Button
                type="button"
                variant="secondary"
                onClick={() => updateField("slug", generateSlug(form.name))}
              >
                Generate
              </Button>
            </div>

            <SelectField
              id="status"
              label="Status"
              value={form.status}
              onChange={(e) => updateField("status", e.target.value)}
              options={[
                {
                  label: "Published",
                  value: "published",
                },
                {
                  label: "Draft",
                  value: "draft",
                },
              ]}
            />
          </div>
        </Card>

        <PageActions>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setForm(INITIAL_FORM)}
            disabled={!dirty || submitting}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={!dirty || submitting}>
            {submitting ? "Saving..." : "Create Tag"}
          </Button>
        </PageActions>
      </form>
    </PageContainer>
  );
}
