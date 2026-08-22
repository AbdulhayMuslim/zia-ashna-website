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

export default function EditBlogPostPage() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("draft");
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`/api/admin/posts/${id}`).then((response) => response.json().then((body) => ({ response, body }))),
      fetch("/api/admin/categories").then((response) => response.json()),
    ]).then(([postResult, categoryResult]) => {
      if (!postResult.response.ok) throw new Error(postResult.body.message);
      const data = postResult.body.data;
      setPost(data); setTitle(data.title); setSlug(data.slug); setCategory(data.category.slug);
      setExcerpt(data.excerpt); setContent(data.content); setImage(data.featuredImage);
      setStatus(data.status); setFeatured(data.featured); setCategories(categoryResult.data ?? []);
    }).catch((error) => toast.error(error.message));
  }, [id]);

  async function save() {
    let featuredImage = typeof image === "string" ? image : image?.url ?? null;
    if (image?.file) {
      const body = new FormData();
      body.append("file", image.file);
      const uploadResponse = await fetch("/api/admin/uploads", { method: "POST", body });
      const uploadResult = await uploadResponse.json();
      if (!uploadResponse.ok) return toast.error(uploadResult.message || "Unable to upload image.");
      featuredImage = uploadResult.data.url;
    }
    const response = await fetch(`/api/admin/posts/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
      title, slug, category, excerpt, content, status, featured,
      featuredImage,
      tagIds: post.tags?.map((entry) => entry.tagId) ?? [],
    }) });
    const result = await response.json();
    if (!response.ok) return toast.error(result.message || "Unable to update post.");
    setPost(result.data); toast.success("Blog post updated successfully.");
  }

  function handleGenerateSlug() {
    setSlug(generateSlug(title));
  }

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

              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <InputField
                    id="slug"
                    label="Slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
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
              onChange={setContent}
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
              description="Recommended size: 1200 × 800 px"
            />
          </Card>
        </div>
      </div>

      <PageActions>
        <Button variant="secondary">Cancel</Button>

        <Button
          onClick={save}
        >
          Save Changes
        </Button>
      </PageActions>
    </PageContainer>
  );
}
