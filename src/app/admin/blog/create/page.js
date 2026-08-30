"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "@/components/admin/ui/Toast";
import { createBlogSchema } from "@/validations/blog";

import PageContainer from "@/components/admin/layout/PageContainer";
import PageActions from "@/components/admin/layout/PageActions";

import PageHeader from "@/components/admin/ui/PageHeader";
import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import InputField from "@/components/admin/ui/InputField";
import TextareaField from "@/components/admin/ui/TextareaField";
import SelectField from "@/components/admin/ui/SelectField";
import ImageUploadField from "@/components/admin/ui/ImageUploadField";
import RichTextEditor from "@/components/admin/ui/RichTextEditor";
import SwitchField from "@/components/admin/ui/SwitchField";
import UnsavedChangesGuard from "@/components/admin/ui/UnsavedChangesGuard";

function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function CreateBlogPostPage() {
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/admin/categories", { signal: controller.signal })
      .then((response) => response.json())
      .then((result) => setCategories(result.data ?? []))
      .catch((error) => { if (error.name !== "AbortError") toast.error("Unable to load categories."); });
    return () => controller.abort();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: "",
      slug: "",
      category: "",
      excerpt: "",
      content: "",
      status: "draft",
      featured: false,
    },
  });

  const title = useWatch({ control, name: "title" });
  const featured = useWatch({ control, name: "featured" });
  const status = useWatch({ control, name: "status" });
  const category = useWatch({ control, name: "category" });
  const content = useWatch({ control, name: "content" });
  const hasChanges = isDirty || image !== null;

  const handleGenerateSlug = () => {
    setValue("slug", generateSlug(title), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit = async (data) => {
    setSubmitting(true);

    try {
      let featuredImage = typeof image === "string" ? image : image?.url ?? null;
      if (image?.file) {
        const body = new FormData();
        body.append("file", image.file);
        body.append("purpose", "post");
        const uploadResponse = await fetch("/api/admin/uploads", { method: "POST", body });
        const uploadResult = await uploadResponse.json();
        if (!uploadResponse.ok) throw new Error(uploadResult.message || "Unable to upload image.");
        featuredImage = uploadResult.data.url;
      }
      const payload = { ...data, featuredImage };

      const response = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Unable to create post.");

      toast.success("Blog post created successfully.");
      reset();
      setImage(null);
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
      <PageHeader
        title="Create Blog Post"
        description="Create and publish a new blog post."
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 xl:grid-cols-3">
          <div className="space-y-6 xl:col-span-2">
            <Card title="Post Details">
              <div className="space-y-5">
                <InputField
                  id="title"
                  label="Post Title"
                  placeholder="Enter post title"
                  error={errors.title?.message}
                  {...register("title")}
                />

                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <InputField
                      id="slug"
                      label="Slug"
                      placeholder="post-url-slug"
                      error={errors.slug?.message}
                      {...register("slug")}
                    />
                  </div>

                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleGenerateSlug}
                  >
                    Generate
                  </Button>
                </div>

                <TextareaField
                  id="excerpt"
                  label="Excerpt"
                  placeholder="Short summary of the post"
                  rows={4}
                  error={errors.excerpt?.message}
                  {...register("excerpt")}
                />
              </div>
            </Card>

            <Card title="Content">
              <RichTextEditor
                label="Blog Content"
                placeholder="Write your blog post..."
                value={content}
                error={errors.content?.message}
                onChange={(value) =>
                  setValue("content", value, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
              />
            </Card>
          </div>

          <div className="space-y-6">
            <Card title="Publish">
              <div className="space-y-5">
                <SelectField
                  id="status"
                  label="Status"
                  value={status}
                  error={errors.status?.message}
                  onChange={(e) =>
                    setValue("status", e.target.value, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
                  options={[
                    {
                      label: "Draft",
                      value: "draft",
                    },
                    {
                      label: "Published",
                      value: "published",
                    },
                  ]}
                />

                <SwitchField
                  id="featured"
                  label="Featured Post"
                  description="Show this post in featured sections."
                  checked={featured}
                  onChange={(checked) =>
                    setValue("featured", checked, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
                />
              </div>
            </Card>

            <Card title="Category">
              <SelectField
                id="category"
                label="Post Category"
                value={category}
                error={errors.category?.message}
                onChange={(event) => setValue("category", event.target.value, { shouldDirty: true, shouldValidate: true })}
                options={[
                  {
                    label: "Select Category",
                    value: "",
                  },
                  ...categories.map((item) => ({
                    label: item.name,
                    value: item.slug,
                  })),
                ]}
              />
            </Card>

            <Card title="Featured Image">
              <ImageUploadField
                id="featuredImage"
                value={image}
                onChange={setImage}
                description="Max size: 2MB · JPG, PNG, WEBP"
              />
            </Card>
          </div>
        </div>

        <PageActions>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              reset();
              setImage(null);
            }}
            disabled={!hasChanges || submitting}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={!hasChanges || submitting}>
            {submitting ? "Saving..." : "Publish Post"}
          </Button>
        </PageActions>
      </form>
      <UnsavedChangesGuard when={hasChanges && !submitting} onSave={handleSubmit(onSubmit)} />
    </PageContainer>
  );
}
