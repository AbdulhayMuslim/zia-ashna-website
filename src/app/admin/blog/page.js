"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronDown, ChevronLeft, ChevronRight, ExternalLink, FileText, FolderOpen, Loader2, Pencil, Plus, Save, Trash2, X } from "lucide-react";

import { useAdminCollection } from "@/hooks/useAdminCollection";
import { posts as demoPosts } from "@/data/posts";

import PageContainer from "@/components/admin/layout/PageContainer";

import PageHeader from "@/components/admin/ui/PageHeader";
import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import InputField from "@/components/admin/ui/InputField";
import TextareaField from "@/components/admin/ui/TextareaField";
import SelectField from "@/components/admin/ui/SelectField";
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

function EditPostDrawer({ editor, onClose, onSaved }) {
  const { post, categories, demo } = editor;
  const [form, setForm] = useState({
    title: post.title ?? "",
    slug: post.slug ?? "",
    category: typeof post.category === "string" ? post.category : (post.category?.slug ?? ""),
    excerpt: post.excerpt ?? "",
    content: post.content ?? "",
    status: post.status ?? "draft",
    featured: post.featured ?? false,
    featuredImage: post.featuredImage ?? post.image?.src ?? null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  async function selectFeaturedImage(value) {
    if (!value?.file) {
      update("featuredImage", null);
      return;
    }
    if (demo) {
      update("featuredImage", value.preview);
      return;
    }

    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", value.file);
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
    if (demo) return;
    setSubmitting(true);
    try {
      const response = await fetch(`/api/admin/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tagIds: post.tags?.map((entry) => entry.tagId) ?? [],
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to update post.");
      onSaved(result.data);
      toast.success("Blog post updated successfully.");
      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm animate-in fade-in-0" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-2xl flex-col border-l border-border bg-background shadow-2xl outline-none dark:bg-gray-900 animate-in slide-in-from-right duration-300">
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
            {demo && <div className="rounded-2xl border border-brand-primary/25 bg-brand-primary/10 p-4 text-sm text-heading dark:text-heading-dark">This is a demo post from <code>src/data/posts.js</code>. You can explore the editor, but demo changes cannot be saved.</div>}

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
                <SelectField id="drawer-post-status" label="Status" value={form.status} onChange={(event) => update("status", event.target.value)} options={[{ label: "Draft", value: "draft" }, { label: "Published", value: "published" }]} />
                <SelectField id="drawer-post-category" label="Category" value={form.category} onChange={(event) => update("category", event.target.value)} options={categories.map((category) => ({ label: category.name, value: category.slug }))} />
              </div>
              <SwitchField id="drawer-post-featured" label="Featured Post" description="Show this post in featured areas." checked={form.featured} onChange={(value) => update("featured", value)} />
            </section>

            <section className="space-y-5 rounded-3xl border border-border bg-card p-5 dark:bg-gray-800">
              <div><h3 className="font-semibold text-heading dark:text-heading-dark">Featured image</h3><p className="mt-1 text-sm text-text dark:text-text-dark">Choose the image displayed with this post.</p></div>
              <ImageUploadField id="drawer-post-image" value={form.featuredImage} onChange={selectFeaturedImage} disabled={uploading} description={uploading ? "Uploading image..." : "JPG, PNG, WebP, GIF, or SVG · maximum 5 MB"} />
            </section>
          </div>

          <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-border bg-card p-4 dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            {!demo && <Link href={`/admin/blog/${post.id}`} className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-medium text-text transition hover:bg-brand-primary/10 hover:text-brand-primary dark:text-text-dark"><ExternalLink className="h-4 w-4" /> Open full editor</Link>}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
              <Button type="button" leftIcon={Save} onClick={save} loading={submitting} disabled={demo || uploading}>Save changes</Button>
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

export default function BlogPage() {
  const { items: rawPosts, loading, remove, replace } = useAdminCollection("posts");
  const [editor, setEditor] = useState(null);
  const [openingEditor, setOpeningEditor] = useState(null);
  const [removedDemoPosts, setRemovedDemoPosts] = useState([]);
  const usingDemoPosts = !loading && rawPosts.length === 0;
  const posts = useMemo(() => {
    if (!rawPosts.length && !loading) {
      return demoPosts
        .map((post) => ({ ...post, id: `demo-${post.id}`, _demo: true }))
        .filter((post) => !removedDemoPosts.includes(post.id));
    }
    return rawPosts.map((post) => ({ ...post, category: post.category?.name ?? "" }));
  }, [rawPosts, loading, removedDemoPosts]);
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
    if (post._demo) {
      setRemovedDemoPosts((current) => [...current, post.id]);
      toast.success("Demo post removed from this preview.");
      return;
    }
    try { await remove(post.id); toast.success("Blog post deleted."); }
    catch (error) { toast.error(error.message); }
  };

  async function openEditor(row) {
    if (row._demo) {
      setEditor({
        post: row,
        demo: true,
        categories: [...new Set(demoPosts.map((post) => post.category))].map((name) => ({ name, slug: name })),
      });
      return;
    }

    setOpeningEditor(row.id);
    try {
      const [postResponse, categoryResponse] = await Promise.all([
        fetch(`/api/admin/posts/${row.id}`),
        fetch("/api/admin/categories"),
      ]);
      const [postResult, categoryResult] = await Promise.all([postResponse.json(), categoryResponse.json()]);
      if (!postResponse.ok) throw new Error(postResult.message || "Unable to load post.");
      if (!categoryResponse.ok) throw new Error(categoryResult.message || "Unable to load categories.");
      setEditor({ post: postResult.data, categories: categoryResult.data ?? [], demo: false });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setOpeningEditor(null);
    }
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
      render: (row) => <span className="whitespace-nowrap text-text dark:text-text-dark">{row.date || (row.publishedAt ? new Date(row.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Not published")}</span>,
    },

    {
      key: "status",
      label: "Status",
      width: "12%",
      render: (row) => <StatusBadge status={row.status} />,
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
            description={row._demo ? `Remove "${row.title}" from this demo preview?` : `Delete "${row.title}"? This action cannot be undone.`}
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

        <DataTable
          columns={columns}
          data={paginatedPosts}
          loading={loading}
          fixedLayout
          emptyTitle="No blog posts found"
          emptyDescription="Create your first blog post to get started."
        />

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

      {editor && <EditPostDrawer key={`${editor.demo ? "demo" : "post"}-${editor.post.id}`} editor={editor} onClose={() => setEditor(null)} onSaved={replace} />}
    </PageContainer>
  );
}
