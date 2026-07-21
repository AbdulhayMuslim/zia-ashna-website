"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "@/components/admin/ui/Toast";
import { createBlogSchema } from "@/validations/blog";
import { categories } from "@/data/posts";

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

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: "",
      slug: "",
      category: "",
      excerpt: "",
      content: "",
      published: false,
      featured: false,
    },
  });

  const title = watch("title");
  const featured = watch("featured");
  const published = watch("published");

  const handleGenerateSlug = () => {
    setValue("slug", generateSlug(title), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit = (data) => {
    const payload = {
      ...data,
      featuredImage: image,
    };

    console.log(payload);

    toast.success("Blog post created successfully.");

    reset();
    setImage(null);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Create Blog Post"
        description="Create and publish a new blog post."
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 xl:grid-cols-3">
          {/* Main Content */}
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
                error={errors.content?.message}
                {...register("content")}
              />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card title="Publish">
              <div className="space-y-5">
                <SelectField
                  id="published"
                  label="Status"
                  error={errors.published?.message}
                  value={published ? "published" : "draft"}
                  onChange={(e) =>
                    setValue("published", e.target.value === "published", {
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
                error={errors.category?.message}
                {...register("category")}
                options={[
                  {
                    label: "Select Category",
                    value: "",
                  },
                  ...categories.map((item) => ({
                    label: item,
                    value: item,
                  })),
                ]}
              />
            </Card>

            <Card title="Featured Image">
              <ImageUploadField
                id="featuredImage"
                value={image}
                onChange={setImage}
                description="Recommended size: 1200 × 800 px"
              />
            </Card>
          </div>
        </div>

        <PageActions>
          <Button type="button" variant="secondary" onClick={() => reset()}>
            Cancel
          </Button>

          <Button type="submit">Publish Post</Button>
        </PageActions>
      </form>
    </PageContainer>
  );
}
