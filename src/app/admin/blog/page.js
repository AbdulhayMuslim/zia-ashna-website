"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { posts, categories } from "@/data/posts";

import PageContainer from "@/components/admin/layout/PageContainer";

import PageHeader from "@/components/admin/ui/PageHeader";
import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import SelectField from "@/components/admin/ui/SelectField";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import StatusBadge from "@/components/admin/ui/StatusBadge";
import ActionMenu from "@/components/admin/ui/ActionMenu";

import DataTable from "@/components/admin/ui/DataTable/DataTable";
import DataTableToolbar from "@/components/admin/ui/DataTable/DataTableToolbar";
import DataTablePagination from "@/components/admin/ui/DataTable/DataTablePagination";

import { toast } from "@/components/admin/ui/Toast";

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("");

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
  }, [search, statusFilter, categoryFilter]);

  const columns = [
    {
      key: "title",
      label: "Title",
      render: (row) => (
        <div>
          <div className="font-medium text-heading dark:text-heading-dark">
            {row.title}
          </div>

          <div className="text-sm text-text dark:text-text-dark">
            {row.slug}
          </div>
        </div>
      ),
    },

    {
      key: "category",
      label: "Category",
    },

    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },

    {
      key: "actions",
      label: "Actions",
      align: "right",
      render: (row) => (
        <div className="flex justify-end">
          <ConfirmDialog
            title="Delete Blog Post"
            description={`Delete "${row.title}"? This action cannot be undone.`}
            confirmText="Delete"
            onConfirm={() => {
              toast.success("Blog post deleted.");
            }}
          >
            <ActionMenu
              onEdit={() => {
                window.location.href = `/admin/blog/${row.id}`;
              }}
              onDelete={(e) => {
                e?.preventDefault?.();
              }}
            />
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
            <Button>Add New Post</Button>
          </Link>
        }
      />
      <Card>
        <DataTableToolbar
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search blog posts..."
        >
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={statusFilter === "all" ? "primary" : "secondary"}
              onClick={() => setStatusFilter("all")}
            >
              All
            </Button>

            <Button
              size="sm"
              variant={statusFilter === "published" ? "primary" : "secondary"}
              onClick={() => setStatusFilter("published")}
            >
              Published
            </Button>

            <Button
              size="sm"
              variant={statusFilter === "draft" ? "primary" : "secondary"}
              onClick={() => setStatusFilter("draft")}
            >
              Draft
            </Button>
          </div>

          <div className="w-full md:w-64">
            <SelectField
              id="categoryFilter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              options={[
                {
                  label: "All Categories",
                  value: "",
                },
                ...categories.map((category) => ({
                  label: category,
                  value: category,
                })),
              ]}
            />
          </div>
        </DataTableToolbar>

        <DataTable
          columns={columns}
          data={filteredPosts}
          emptyTitle="No blog posts found"
          emptyDescription="Create your first blog post to get started."
        />

        <DataTablePagination>
          <p className="text-sm text-text dark:text-text-dark">
            Showing {filteredPosts.length} post
            {filteredPosts.length !== 1 ? "s" : ""}
          </p>

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" disabled>
              Previous
            </Button>

            <Button variant="secondary" size="sm" disabled>
              Next
            </Button>
          </div>
        </DataTablePagination>
      </Card>
    </PageContainer>
  );
}
