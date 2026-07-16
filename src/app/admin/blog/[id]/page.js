"use client";

import { useState } from "react";

import { posts, categories } from "@/data/posts";

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
  const [image, setImage] = useState(post?.image || "");

  const [status, setStatus] = useState(post?.status || "draft");

  const [featured, setFeatured] = useState(post?.featured || false);

  if (!post) {
    return (
      <Card>
        <p>Post not found.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
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
                label="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <InputField
                label="Slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />

              <TextareaField
                label="Excerpt"
                rows={4}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              />
            </div>
          </Card>

          <Card title="Content">
            <RichTextEditor
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
                label="Featured Post"
                description="Show this post in featured areas."
                checked={featured}
                onChange={setFeatured}
              />

              <div className="flex flex-col gap-3">
                <Button>Save Changes</Button>

                <Button variant="secondary">Update & Publish</Button>
              </div>
            </div>
          </Card>

          <Card title="Category">
            <SelectField
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
              image={image}
              onChange={setImage}
              description="Recommended size: 1200 × 800 px"
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
