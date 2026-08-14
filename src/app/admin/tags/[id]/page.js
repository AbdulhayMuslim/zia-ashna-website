"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { toast } from "@/components/admin/ui/Toast";

import PageContainer from "@/components/admin/layout/PageContainer";
import PageActions from "@/components/admin/layout/PageActions";

import PageHeader from "@/components/admin/ui/PageHeader";
import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import InputField from "@/components/admin/ui/InputField";
import TextareaField from "@/components/admin/ui/TextareaField";
import SelectField from "@/components/admin/ui/SelectField";

function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function EditTagPage() {
  const { id } = useParams();

  const initialForm = { name: "", slug: "", description: "", status: "published" };
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    fetch(`/api/admin/tags/${id}`).then(async (response) => {
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setForm(result.data);
    }).catch((error) => toast.error(error.message));
  }, [id]);

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/admin/tags/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const result = await response.json();
    if (!response.ok) return toast.error(result.message || "Unable to update tag.");
    setForm(result.data); toast.success("Tag updated successfully.");
  };

  return (
    <PageContainer>
      <PageHeader title="Edit Tag" description="Update tag information." />

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

            <TextareaField
              id="description"
              label="Description"
              rows={5}
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
            />

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
            onClick={() => {
              window.location.reload();
            }}
          >
            Reset
          </Button>

          <Button type="submit">Save Changes</Button>
        </PageActions>
      </form>
    </PageContainer>
  );
}
