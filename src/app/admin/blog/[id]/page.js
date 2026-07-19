"use client";

import { useState } from "react";

import { posts, categories } from "@/data/posts";

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

export default function EditBlogPostPage({ params }) {
  const post = posts.find((item) => String(item.id) === String(params.id));

  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [category, setCategory] = useState(post?.category || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [content, setContent] = useState(post?.content || "");
  const [image, setImage] = useState(post?.image || null);

  const [status, setStatus] = useState(post?.status || "draft");
  const [featured, setFeatured] = useState(post?.featured || false);

  if (!post) {
    return (
      <PageContainer>
        <Card>
          <p>Post not found.</p>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="Edit Blog Post"
        description="Update an existing blog post."
      />

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Main */}
        <div className="space-y-6 xl:col-span-2">
          <Card title="Post Details">
            <div className="space-y-5">
              <InputField
                id="title"
                label="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <InputField
                id="slug"
                label="Slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />

              <TextareaField
                id="excerpt"
                label="Excerpt"
                rows={4}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              />
            </div>
          </Card>

          <Card title="Content">
            <RichTextEditor
              id="content"
              label="Blog Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card title="Publish">
            <div className="space-y-5">
              <SelectField
                id="status"
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
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
                description="Show this post in featured areas."
                checked={featured}
                onChange={setFeatured}
              />
            </div>
          </Card>

          <Card title="Category">
            <SelectField
              id="category"
              label="Post Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
              helperText="Recommended size: 1200 × 800 px"
            />
          </Card>
        </div>
      </div>

      <PageActions>
        <Button variant="secondary">Cancel</Button>

        <Button>Save Changes</Button>
      </PageActions>
    </PageContainer>
  );
}
