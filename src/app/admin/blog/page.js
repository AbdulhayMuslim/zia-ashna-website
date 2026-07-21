"use client";

import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import { toast } from "@/components/admin/ui/Toast";

import { useMemo, useState } from "react";
import Link from "next/link";

import { posts, categories } from "@/data/posts";

import PageContainer from "@/components/admin/layout/PageContainer";

import PageHeader from "@/components/admin/ui/PageHeader";
import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import SelectField from "@/components/admin/ui/SelectField";
import StatusBadge from "@/components/admin/ui/StatusBadge";

export default function BlogPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const statusMatch =
        statusFilter === "all" || post.status === statusFilter;

      const categoryMatch =
        categoryFilter === "" || post.category === categoryFilter;

      return statusMatch && categoryMatch;
    });
  }, [statusFilter, categoryFilter]);

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

      {/* Stats */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading text-lg font-semibold text-heading dark:text-heading-dark">
              Posts Overview
            </h3>

            <p className="mt-1 text-sm text-text dark:text-text-dark">
              {filteredPosts.length} posts found
            </p>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <Card>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStatusFilter("all")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                statusFilter === "all"
                  ? "bg-brand-primary text-white"
                  : "border border-border bg-background dark:bg-background-dark dark:text-text-dark"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setStatusFilter("published")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                statusFilter === "published"
                  ? "bg-brand-primary text-white"
                  : "border border-border bg-background dark:bg-background-dark dark:text-text-dark"
              }`}
            >
              Published
            </button>

            <button
              onClick={() => setStatusFilter("draft")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                statusFilter === "draft"
                  ? "bg-brand-primary text-white"
                  : "border border-border bg-background dark:bg-background-dark dark:text-text-dark"
              }`}
            >
              Drafts
            </button>
          </div>

          <div className="w-full lg:w-72">
            <SelectField
              id="categoryFilter"
              label="Category"
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
        </div>
      </Card>

      {/* Posts Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted dark:bg-muted-dark">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text dark:text-text-dark">
                  Title
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text dark:text-text-dark">
                  Category
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text dark:text-text-dark">
                  Status
                </th>

                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-text dark:text-text-dark">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border bg-background dark:bg-background-dark">
              {filteredPosts.map((post) => (
                <tr
                  key={post.id}
                  className="transition-colors hover:bg-muted/50 dark:hover:bg-muted-dark/50"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-heading dark:text-heading-dark">
                      {post.title}
                    </div>

                    <div className="text-sm text-text dark:text-text-dark">
                      {post.slug}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-text dark:text-text-dark">
                    {post.category}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={post.status} />
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/blog/${post.id}`}>
                        <Button variant="secondary" size="sm">
                          Edit
                        </Button>
                      </Link>

                      <Button variant="danger" size="sm">
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredPosts.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-text dark:text-text-dark"
                  >
                    No blog posts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </PageContainer>
  );
}
