"use client";

import { useState } from "react";
import PageContainer from "@/components/admin/layout/PageContainer";
import PageActions from "@/components/admin/layout/PageActions";
import PageHeader from "@/components/admin/ui/PageHeader";
import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import InputField from "@/components/admin/ui/InputField";
import RepeaterItem from "@/components/admin/ui/RepeaterItem";
import FormSection from "@/components/admin/ui/FormSection";

export default function BlogCategoriesPage() {
  const [categories, setCategories] = useState([
    "Technology",
    "Design",
    "Business",
    "Education",
  ]);

  const [newCategory, setNewCategory] = useState("");

  function addCategory() {
    const value = newCategory.trim();

    if (!value) return;

    if (categories.includes(value)) return;

    setCategories([...categories, value]);
    setNewCategory("");
  }

  function removeCategory(category) {
    setCategories(categories.filter((item) => item !== category));
  }

  return (
    <PageContainer>
      <PageHeader
        title="Blog Categories"
        description="Create and manage blog categories."
      />

      <FormSection
        title="Add Category"
        description="Create a new blog category."
      >
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <InputField
              id="category"
              label="Category Name"
              placeholder="Islamic History"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </div>

          <div className="flex items-end">
            <Button onClick={addCategory}>Add Category</Button>
          </div>
        </div>
      </FormSection>

      <Card title="Existing Categories">
        <div className="space-y-4">
          {categories.map((category) => (
            <RepeaterItem key={category} title={category}>
              <div className="flex justify-end">
                <Button
                  variant="danger"
                  onClick={() => removeCategory(category)}
                >
                  Delete
                </Button>
              </div>
            </RepeaterItem>
          ))}

          {categories.length === 0 && (
            <p className="text-sm text-text-muted">No categories available.</p>
          )}
        </div>
      </Card>

      <PageActions>
        <Button variant="secondary">Cancel</Button>

        <Button>Save Changes</Button>
      </PageActions>
    </PageContainer>
  );
}
