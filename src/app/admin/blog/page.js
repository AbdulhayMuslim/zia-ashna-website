"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronDown, ChevronLeft, ChevronRight, ExternalLink, FileText, FolderOpen, Loader2, Pencil, Plus, Save, Tags, Trash2, X } from "lucide-react";

import { useAdminCollection } from "@/hooks/useAdminCollection";

import PageContainer from "@/components/admin/layout/PageContainer";

import PageHeader from "@/components/admin/ui/PageHeader";
import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import InputField from "@/components/admin/ui/InputField";
import TextareaField from "@/components/admin/ui/TextareaField";
import SwitchField from "@/components/admin/ui/SwitchField";
import RichTextEditor from "@/components/admin/ui/RichTextEditor";
import ImageUploadField from "@/components/admin/ui/ImageUploadField";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import StatusBadge from "@/components/admin/ui/StatusBadge";

import DataTable from "@/components/admin/ui/DataTable/DataTable";
import DataTableToolbar from "@/components/admin/ui/DataTable/DataTableToolbar";
import DataTablePagination from "@/components/admin/ui/DataTable/DataTablePagination";

import { toast } from "@/components/admin/ui/Toast";

const shorten = (value, limit) => value.length > limit ? `${value.slice(0, limit).trimEnd()}…` : value;
const generateSlug = (value) => value.toLowerCase().trim().replace(/['"]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const POSTS_PER_PAGE = 10;
const formatPostDate = (post) => post.date || (post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Not published");

function DrawerSelect({ id, label, value, options, onChange, icon: Icon }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    function closeOnOutsideClick(event) {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    }
    function closeOnEscape(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative space-y-2">
      <label id={`${id}-label`} className="block text-sm font-medium text-heading dark:text-heading-dark">{label}</label>
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label`}
        onClick={() => setOpen((current) => !current)}
        className="flex h-12 w-full items-center gap-3 rounded-2xl border border-border bg-card px-4 text-left text-sm text-heading outline-none transition hover:border-brand-primary/50 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 dark:bg-gray-900 dark:text-heading-dark"
      >
        <Icon className="h-4 w-4 shrink-0 text-brand-primary" />
        <span className="min-w-0 flex-1 truncate">{selected?.label ?? "Select an option"}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-text-muted transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-2xl dark:bg-gray-800">
          <div role="listbox" aria-labelledby={`${id}-label`} className="max-h-64 space-y-1 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={value === option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${value === option.value ? "bg-brand-primary/10 text-brand-primary" : "text-heading hover:bg-brand-primary/10 dark:text-heading-dark"}`}
              >
                <span className="min-w-0 flex-1 truncate">{option.label}</span>
                <Check className={`h-4 w-4 ${value === option.value ? "opacity-100" : "opacity-0"}`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function EditPostDrawer({ editor, onClose, onSaved }) {
  const { post, categories, tags } = editor;
  const initialForm = {
    title: post.title ?? "",
    slug: post.slug ?? "",
    category: typeof post.category === "string" ? post.category : (post.category?.slug ?? ""),
    excerpt: post.excerpt ?? "",
    content: post.content ?? "",
    status: post.status ?? "draft",
    featured: post.featured ?? false,
    featuredImage: post.featuredImage ?? post.image?.src ?? null,
    tagIds: post.tags?.map((entry) => entry.tagId ?? entry.tag?.id).filter(Boolean) ?? [],
  };
  const [form, setForm] = useState(initialForm);
  const [open, setOpen] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const dirty = JSON.stringify(form) !== JSON.stringify(initialForm);
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  useEffect(() => {
    if (open) return undefined;
    const closeTimer = window.setTimeout(onClose, 300);
    return () => window.clearTimeout(closeTimer);
  }, [open, onClose]);

  async function selectFeaturedImage(value) {
    if (value?.url) {
      update("featuredImage", value.url);
      return;
    }
    if (!value?.file) {
      update("featuredImage", null);
      return;
    }
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", value.file);
      body.append("purpose", "post");
      const response = await fetch("/api/admin/uploads", { method: "POST", body });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to upload image.");
      update("featuredImage", result.data.url);
      toast.success("Featured image uploaded.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  }

  async function save() {
    if (!dirty) return;

    setSubmitting(true);
    try {
      const response = await fetch(`/api/admin/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to update post.");
      onSaved(result.data);
      toast.success("Blog post updated successfully.");
      setOpen(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 duration-300" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-2xl flex-col border-l border-border bg-background shadow-2xl outline-none dark:bg-gray-900 data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right duration-300">
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border bg-card px-5 py-4 dark:bg-gray-800 sm:px-6">
            <div className="min-w-0">
              <Dialog.Title className="font-heading text-xl font-semibold text-heading dark:text-heading-dark">Edit blog post</Dialog.Title>
              <Dialog.Description className="mt-1 truncate text-sm text-text dark:text-text-dark">{post.title}</Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button type="button" aria-label="Close editor" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-text transition hover:bg-brand-primary/10 hover:text-brand-primary dark:text-text-dark"><X className="h-5 w-5" /></button>
            </Dialog.Close>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-6">
            <section className="space-y-5 rounded-3xl border border-border bg-card p-5 dark:bg-gray-800">
              <div><h3 className="font-semibold text-heading dark:text-heading-dark">Post details</h3><p className="mt-1 text-sm text-text dark:text-text-dark">Update the title, URL slug, and summary.</p></div>
              <InputField id="drawer-post-title" label="Post Title" value={form.title} onChange={(event) => update("title", event.target.value)} />
              <div className="flex items-end gap-3">
                <div className="min-w-0 flex-1"><InputField id="drawer-post-slug" label="Slug" value={form.slug} onChange={(event) => update("slug", event.target.value)} /></div>
                <Button type="button" variant="secondary" onClick={() => update("slug", generateSlug(form.title))}>Generate</Button>
              </div>
              <TextareaField id="drawer-post-excerpt" label="Excerpt" rows={4} value={form.excerpt} onChange={(event) => update("excerpt", event.target.value)} />
            </section>

            <section className="space-y-5 rounded-3xl border border-border bg-card p-5 dark:bg-gray-800">
              <div><h3 className="font-semibold text-heading dark:text-heading-dark">Content</h3><p className="mt-1 text-sm text-text dark:text-text-dark">Edit the main body of your post.</p></div>
              <RichTextEditor id="drawer-post-content" label="Blog Content" value={form.content} onChange={(value) => update("content", value)} />
            </section>

            <section className="space-y-5 rounded-3xl border border-border bg-card p-5 dark:bg-gray-800">
              <div className="grid gap-5 sm:grid-cols-2">
                <DrawerSelect id="drawer-post-status" label="Status" icon={FileText} value={form.status} onChange={(value) => update("status", value)} options={[{ label: "Draft", value: "draft" }, { label: "Published", value: "published" }]} />
                <DrawerSelect id="drawer-post-category" label="Category" icon={FolderOpen} value={form.category} onChange={(value) => update("category", value)} options={categories.map((category) => ({ label: category.name, value: category.slug }))} />
              </div>
              <SwitchField id="drawer-post-featured" label="Featured Post" description="Show this post in featured areas." checked={form.featured} onChange={(value) => update("featured", value)} />
            </section>

            <section className="space-y-4 rounded-3xl border border-border bg-card p-5 dark:bg-gray-800">
              <div><h3 className="flex items-center gap-2 font-semibold text-heading dark:text-heading-dark"><Tags className="h-4 w-4 text-brand-primary" /> Tags</h3><p className="mt-1 text-sm text-text dark:text-text-dark">Select or remove tags for this post.</p></div>
              {tags.length ? (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => {
                    const selected = form.tagIds.includes(tag.id);
                    return (
                      <button
                        key={tag.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => update("tagIds", selected ? form.tagIds.filter((id) => id !== tag.id) : [...form.tagIds, tag.id])}
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition ${selected ? "border-brand-primary bg-brand-primary text-white" : "border-border text-heading hover:border-brand-primary/50 hover:bg-brand-primary/10 dark:text-heading-dark"}`}
                      >
                        {selected && <Check className="h-3.5 w-3.5" />}
                        {tag.name}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="rounded-2xl bg-background p-4 text-sm text-text dark:bg-gray-900 dark:text-text-dark">No tags are available. Create tags from the Tags page first.</p>
              )}
            </section>

            <section className="space-y-5 rounded-3xl border border-border bg-card p-5 dark:bg-gray-800">
              <div><h3 className="font-semibold text-heading dark:text-heading-dark">Featured image</h3><p className="mt-1 text-sm text-text dark:text-text-dark">Choose the image displayed with this post.</p></div>
              <ImageUploadField id="drawer-post-image" value={form.featuredImage} onChange={selectFeaturedImage} disabled={uploading} description="Max size: 2MB · JPG, PNG, WEBP" />
            </section>
          </div>

          <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-border bg-card p-4 dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <Link href={`/admin/blog/${post.id}`} className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-medium text-text transition hover:bg-brand-primary/10 hover:text-brand-primary dark:text-text-dark"><ExternalLink className="h-4 w-4" /> Open full editor</Link>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="button" leftIcon={Save} onClick={save} loading={submitting} disabled={!dirty || uploading}>Save Changes</Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function CategoryFilter({ value, categories, counts, onChange }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function closeOnOutsideClick(event) {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    }
    function closeOnEscape(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const choose = (category) => {
    onChange(category);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full md:w-64">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex h-11 w-full items-center gap-3 rounded-2xl border border-border bg-card px-4 text-left text-sm text-heading outline-none transition hover:border-brand-primary/50 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 dark:bg-gray-900 dark:text-heading-dark"
      >
        <FolderOpen className="h-4 w-4 shrink-0 text-brand-primary" />
        <span className="min-w-0 flex-1 truncate">{value || "All categories"}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-text-muted transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-40 mt-2 w-full min-w-64 overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-2xl dark:bg-gray-800">
          <div role="listbox" aria-label="Filter posts by category" className="max-h-72 space-y-1 overflow-y-auto">
            <button
              type="button"
              role="option"
              aria-selected={!value}
              onClick={() => choose("")}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${!value ? "bg-brand-primary/10 text-brand-primary" : "text-heading hover:bg-brand-primary/10 dark:text-heading-dark"}`}
            >
              <span className="flex-1">All categories</span>
              <span className="text-xs text-text-muted dark:text-text-muted-dark">{counts.all}</span>
              <Check className={`h-4 w-4 ${!value ? "opacity-100" : "opacity-0"}`} />
            </button>
            <div className="mx-2 border-t border-border" />
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                role="option"
                aria-selected={value === category}
                onClick={() => choose(category)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${value === category ? "bg-brand-primary/10 text-brand-primary" : "text-heading hover:bg-brand-primary/10 dark:text-heading-dark"}`}
              >
                <span className="min-w-0 flex-1 truncate">{category}</span>
                <span className="text-xs text-text-muted dark:text-text-muted-dark">{counts[category] ?? 0}</span>
                <Check className={`h-4 w-4 ${value === category ? "opacity-100" : "opacity-0"}`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PostDetailsDialog({ post, onClose, onEdit, onDelete }) {
  if (!post) return null;
  const image = post.featuredImage || post.image;
  const tags = post.tags?.map((entry) => entry.tag?.name ?? entry.name).filter(Boolean) ?? [];

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex max-h-[90vh] w-[94vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-2xl outline-none animate-in fade-in-0 zoom-in-95 dark:bg-gray-900">
          <div className="flex items-start justify-between gap-4 border-b border-border bg-card px-5 py-4 dark:bg-gray-800">
            <div className="min-w-0">
              <Dialog.Title className="font-heading text-xl font-semibold text-heading dark:text-heading-dark">Post details</Dialog.Title>
              <Dialog.Description className="mt-1 truncate text-sm text-text dark:text-text-dark">{post.title}</Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button type="button" aria-label="Close post details" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-text transition hover:bg-brand-primary/10 hover:text-brand-primary dark:text-text-dark"><X className="h-5 w-5" /></button>
            </Dialog.Close>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-6">
            {image && (
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
                <Image src={image} alt={post.title} fill sizes="(max-width: 768px) 94vw, 672px" className="object-cover" />
              </div>
            )}

            <div>
              <h2 className="font-heading text-2xl font-bold text-heading dark:text-heading-dark">{post.title}</h2>
              <p className="mt-2 break-all text-sm text-text-muted dark:text-text-muted-dark">/{post.slug}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-medium text-brand-primary">{post.category || "Uncategorized"}</span>
              <span className="rounded-full bg-muted px-3 py-1 text-xs text-text dark:bg-gray-800 dark:text-text-dark">{formatPostDate(post)}</span>
              <StatusBadge status={post.status} />
              {post.featured && <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-600 dark:text-purple-400">Featured</span>}
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-heading dark:text-heading-dark">#{tag}</span>)}
              </div>
            )}

            <section className="rounded-2xl border border-border bg-card p-4 dark:bg-gray-800">
              <h3 className="mb-2 text-sm font-semibold text-heading dark:text-heading-dark">Excerpt</h3>
              <p className="whitespace-pre-wrap text-sm leading-6 text-text dark:text-text-dark">{post.excerpt || "No excerpt provided."}</p>
            </section>

            <section className="rounded-2xl border border-border bg-card p-4 dark:bg-gray-800">
              <h3 className="mb-3 text-sm font-semibold text-heading dark:text-heading-dark">Content</h3>
              <div className="whitespace-pre-wrap text-sm leading-7 text-text dark:text-text-dark [&_a]:text-brand-primary [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5" dangerouslySetInnerHTML={{ __html: post.content || "No content provided." }} />
            </section>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-border bg-card p-4 dark:bg-gray-800 sm:px-6">
            <Button type="button" variant="secondary" leftIcon={Pencil} onClick={() => onEdit(post)}>Edit Post</Button>
            <ConfirmDialog
              title="Delete Blog Post"
              description={`Delete "${post.title}"? This action cannot be undone.`}
              confirmText="Delete"
              onConfirm={() => onDelete(post)}
            >
              <Button type="button" variant="danger" leftIcon={Trash2}>Delete</Button>
            </ConfirmDialog>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default function BlogPage() {
  const { items: rawPosts, loading, remove, replace } = useAdminCollection("posts");
  const [editor, setEditor] = useState(null);
  const [openingEditor, setOpeningEditor] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const posts = useMemo(() => {
    return rawPosts.map((post) => ({ ...post, category: post.category?.name ?? "" }));
  }, [rawPosts]);
  const categories = useMemo(() => [...new Set(posts.map((post) => post.category).filter(Boolean))], [posts]);
  const categoryCounts = useMemo(() => posts.reduce((counts, post) => {
    counts.all += 1;
    if (post.category) counts[post.category] = (counts[post.category] ?? 0) + 1;
    return counts;
  }, { all: 0 }), [posts]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = async (post) => {
    try {
      await remove(post.id);
      toast.success("Blog post deleted.");
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  async function openEditor(row) {
    setOpeningEditor(row.id);
    try {
      const [postResponse, categoryResponse, tagResponse] = await Promise.all([
        fetch(`/api/admin/posts/${row.id}`),
        fetch("/api/admin/categories"),
        fetch("/api/admin/tags"),
      ]);
      const [postResult, categoryResult, tagResult] = await Promise.all([postResponse.json(), categoryResponse.json(), tagResponse.json()]);
      if (!postResponse.ok) throw new Error(postResult.message || "Unable to load post.");
      if (!categoryResponse.ok) throw new Error(categoryResult.message || "Unable to load categories.");
      if (!tagResponse.ok) throw new Error(tagResult.message || "Unable to load tags.");
      setEditor({ post: postResult.data, categories: categoryResult.data ?? [], tags: tagResult.data ?? [] });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setOpeningEditor(null);
    }
  }

  function handleSavedPost(nextPost) {
    replace(nextPost);
  }

  async function togglePostStatus(post) {
    const status = post.status === "published" ? "draft" : "published";

    setUpdatingStatus(post.id);
    try {
      const response = await fetch(`/api/admin/posts/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to update post status.");
      replace(result.data);
      toast.success(`Post changed to ${status}.`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdatingStatus(null);
    }
  }

  function statusToggle(post) {
    const nextStatus = post.status === "published" ? "draft" : "published";
    const isUpdating = updatingStatus === post.id;

    return (
      <button
        type="button"
        disabled={isUpdating}
        aria-label={`Change ${post.title} to ${nextStatus}`}
        title={`Change to ${nextStatus}`}
        onClick={(event) => {
          event.stopPropagation();
          togglePostStatus(post);
        }}
        onKeyDown={(event) => event.stopPropagation()}
        className="rounded-full outline-none transition hover:brightness-95 focus-visible:ring-2 focus-visible:ring-brand-primary/40 disabled:cursor-wait disabled:opacity-60"
      >
        {isUpdating ? <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs text-text-muted"><Loader2 className="mr-1.5 h-3 w-3 animate-spin" />Updating</span> : <StatusBadge status={post.status} />}
      </button>
    );
  }

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.slug.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || post.status === statusFilter;

      const matchesCategory =
        categoryFilter === "" || post.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [posts, search, statusFilter, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const visiblePage = Math.min(currentPage, totalPages);
  const pageStart = (visiblePage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(pageStart, pageStart + POSTS_PER_PAGE);

  const columns = [
    {
      key: "title",
      label: "Post",
      width: "40%",
      render: (row) => (
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-xl bg-brand-primary/10">
            {row.featuredImage || row.image ? (
              <Image src={row.featuredImage || row.image} alt="" fill sizes="64px" className="object-cover" />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-brand-primary"><FileText className="h-5 w-5" /></span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div title={row.title} className="truncate font-medium text-heading dark:text-heading-dark">{shorten(row.title, 52)}</div>
          </div>
        </div>
      ),
    },

    {
      key: "category",
      label: "Category",
      width: "18%",
      render: (row) => <span title={row.category || "Uncategorized"} className="inline-block max-w-full truncate rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-medium text-brand-primary">{row.category || "Uncategorized"}</span>,
    },

    {
      key: "date",
      label: "Date",
      width: "18%",
      render: (row) => <span className="whitespace-nowrap text-text dark:text-text-dark">{formatPostDate(row)}</span>,
    },

    {
      key: "status",
      label: "Status",
      width: "12%",
      render: (row) => statusToggle(row),
    },

    {
      key: "actions",
      label: "Actions",
      width: "12%",
      align: "right",
      render: (row) => (
        <div className="flex justify-end gap-1.5">
          <button type="button" onClick={() => openEditor(row)} disabled={openingEditor === row.id} aria-label={`Edit ${row.title}`} title="Edit post" className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-text transition hover:border-brand-primary/40 hover:bg-brand-primary/10 hover:text-brand-primary disabled:opacity-60 dark:text-text-dark">
            {openingEditor === row.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Pencil className="h-4 w-4" />}
          </button>
          <ConfirmDialog
            title="Delete Blog Post"
            description={`Delete "${row.title}"? This action cannot be undone.`}
            confirmText="Delete"
            onConfirm={() => handleDelete(row)}
          >
            <button type="button" aria-label={`Delete ${row.title}`} title="Delete post" className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-red-500 transition hover:border-red-500/30 hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
          </ConfirmDialog>
        </div>
      ),
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Blog Posts"
        description="Manage and organize your blog content."
        actions={
          <Link href="/admin/blog/create">
            <Button leftIcon={Plus}>Add New Post</Button>
          </Link>
        }
      />

      <Card
        title="Blog post library"
        description="Review, filter, and manage the posts available in your blog."
      >
        <DataTableToolbar
          search={search}
          onSearchChange={(value) => { setSearch(value); setCurrentPage(1); }}
          searchPlaceholder="Search blog posts..."
        >
          <div className="flex flex-wrap gap-2 rounded-2xl bg-background p-1 dark:bg-gray-900">
            <Button
              size="sm"
              variant={statusFilter === "all" ? "primary" : "secondary"}
              onClick={() => { setStatusFilter("all"); setCurrentPage(1); }}
            >
              All
            </Button>

            <Button
              size="sm"
              variant={statusFilter === "published" ? "primary" : "secondary"}
              onClick={() => { setStatusFilter("published"); setCurrentPage(1); }}
            >
              Published
            </Button>

            <Button
              size="sm"
              variant={statusFilter === "draft" ? "primary" : "secondary"}
              onClick={() => { setStatusFilter("draft"); setCurrentPage(1); }}
            >
              Draft
            </Button>
          </div>

          <CategoryFilter value={categoryFilter} categories={categories} counts={categoryCounts} onChange={(value) => { setCategoryFilter(value); setCurrentPage(1); }} />
        </DataTableToolbar>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:hidden">
          {loading ? (
            [...Array(3)].map((_, index) => <div key={index} className="h-40 animate-pulse rounded-2xl border border-border bg-muted dark:bg-gray-800" />)
          ) : paginatedPosts.length ? (
            paginatedPosts.map((post) => (
              <article
                key={post.id}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${post.title}`}
                onClick={() => setSelectedPost(post)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedPost(post);
                  }
                }}
                className="cursor-pointer space-y-3 rounded-2xl border border-border bg-card p-3 outline-none transition hover:border-brand-primary/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-brand-primary/30 dark:bg-gray-800"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-lg bg-brand-primary/10">
                    {post.featuredImage || post.image ? (
                      <Image src={post.featuredImage || post.image} alt="" fill sizes="56px" className="object-cover" />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-brand-primary"><FileText className="h-4 w-4" /></span>
                    )}
                  </div>
                  <h3 className="line-clamp-2 min-h-10 min-w-0 flex-1 text-sm font-semibold leading-5 text-heading dark:text-heading-dark">{post.title}</h3>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="truncate rounded-full bg-brand-primary/10 px-2.5 py-1 text-xs font-medium text-brand-primary">{post.category || "Uncategorized"}</span>
                  <span className="whitespace-nowrap rounded-full bg-muted px-2.5 py-1 text-xs text-text dark:bg-gray-900 dark:text-text-dark">{formatPostDate(post)}</span>
                </div>

                <div className="flex items-center justify-between gap-2 border-t border-border pt-3">
                  {statusToggle(post)}
                  <div className="flex items-center gap-2" onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()}>
                    <button type="button" onClick={() => openEditor(post)} disabled={openingEditor === post.id} aria-label={`Edit ${post.title}`} title="Edit post" className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-text transition hover:border-brand-primary/40 hover:bg-brand-primary/10 hover:text-brand-primary disabled:opacity-60 dark:text-text-dark">
                      {openingEditor === post.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Pencil className="h-4 w-4" />}
                    </button>
                    <ConfirmDialog title="Delete Blog Post" description={`Delete "${post.title}"? This action cannot be undone.`} confirmText="Delete" onConfirm={() => handleDelete(post)}>
                      <button type="button" aria-label={`Delete ${post.title}`} title="Delete post" className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-red-500 transition hover:border-red-500/30 hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button>
                    </ConfirmDialog>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-border px-4 py-12 text-center"><p className="font-medium text-heading dark:text-heading-dark">No blog posts found</p><p className="mt-1 text-sm text-text dark:text-text-dark">Create your first post to get started.</p></div>
          )}
        </div>

        <div className="hidden lg:block">
          <DataTable
            columns={columns}
            data={paginatedPosts}
            loading={loading}
            fixedLayout
            emptyTitle="No blog posts found"
            emptyDescription="Create your first blog post to get started."
          />
        </div>

        <DataTablePagination className="rounded-b-2xl border-border bg-card dark:bg-gray-800">
          <p className="text-sm text-text dark:text-text-dark">
            {filteredPosts.length
              ? `Showing ${pageStart + 1}–${Math.min(pageStart + POSTS_PER_PAGE, filteredPosts.length)} of ${filteredPosts.length} posts`
              : "No posts to show"}
          </p>

          {totalPages > 1 && (
            <nav aria-label="Blog post pagination" className="flex flex-wrap items-center justify-center gap-2">
              <button type="button" aria-label="Previous page" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} disabled={visiblePage === 1} className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-primary/20 bg-bg text-brand-primary duration-300 hover:bg-brand-primary hover:text-white disabled:pointer-events-none disabled:opacity-40 dark:bg-bg-dark dark:text-brand-secondary">
                <ChevronLeft size={18} />
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button key={page} type="button" aria-label={`Go to page ${page}`} aria-current={visiblePage === page ? "page" : undefined} onClick={() => setCurrentPage(page)} className={`h-11 w-11 rounded-xl border text-sm font-medium duration-300 ${visiblePage === page ? "border-brand-primary bg-brand-primary text-white" : "border-brand-primary/20 bg-bg text-brand-primary hover:bg-brand-primary hover:text-white dark:bg-bg-dark dark:text-brand-secondary"}`}>
                  {page}
                </button>
              ))}
              <button type="button" aria-label="Next page" onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} disabled={visiblePage === totalPages} className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-primary/20 bg-bg text-brand-primary duration-300 hover:bg-brand-primary hover:text-white disabled:pointer-events-none disabled:opacity-40 dark:bg-bg-dark dark:text-brand-secondary">
                <ChevronRight size={18} />
              </button>
            </nav>
          )}
        </DataTablePagination>
      </Card>

      {editor && <EditPostDrawer key={`post-${editor.post.id}`} editor={editor} onClose={() => setEditor(null)} onSaved={handleSavedPost} />}
      <PostDetailsDialog
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onEdit={(post) => {
          setSelectedPost(null);
          void openEditor(post);
        }}
        onDelete={async (post) => {
          if (await handleDelete(post)) setSelectedPost(null);
        }}
      />
    </PageContainer>
  );
}
