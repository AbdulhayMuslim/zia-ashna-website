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
import SelectField from "@/components/admin/ui/SelectField";
import UnsavedChangesGuard from "@/components/admin/ui/UnsavedChangesGuard";

function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function EditCategoryPage() {
  const { id } = useParams();

  const initialForm = {
    name: "",
    slug: "",
    description: "",
    status: "published",
  };
  const [form, setForm] = useState(initialForm);
  const [savedForm, setSavedForm] = useState(null);

  useEffect(() => {
    fetch(`/api/admin/categories/${id}`)
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setForm(result.data);
        setSavedForm(result.data);
      })
      .catch((error) => toast.error(error.message));
  }, [id]);

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const response = await fetch(`/api/admin/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await response.json();
    if (!response.ok) { toast.error(result.message || "Unable to update category."); return false; }
    setForm(result.data);
    setSavedForm(result.data);
    toast.success("Category updated successfully.");
    return true;
  };

  return (
    <PageContainer>
      <PageHeader
        title="Edit Category"
        description="Update category information."
      />

      <form onSubmit={handleSubmit}>
        <Card title="Category Details">
          <div className="space-y-5">
            <InputField
              id="name"
              label="Category Name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Enter category name"
            />

            <div className="flex items-end gap-3">
              <div className="flex-1">
                <InputField
                  id="slug"
                  label="Slug"
                  value={form.slug}
                  onChange={(e) => updateField("slug", e.target.value)}
                  placeholder="category-slug"
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
            onClick={() => {
              setForm(savedForm ?? initialForm);
            }}
          >
            Reset
          </Button>

          <Button type="submit">Save Changes</Button>
        </PageActions>
      </form>
      <UnsavedChangesGuard when={Boolean(savedForm) && JSON.stringify(form) !== JSON.stringify(savedForm)} onSave={handleSubmit} />
    </PageContainer>
  );
}
