"use client";

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
                  : "border border-border bg-background"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setStatusFilter("published")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                statusFilter === "published"
                  ? "bg-brand-primary text-white"
                  : "border border-border bg-background"
              }`}
            >
              Published
            </button>

            <button
              onClick={() => setStatusFilter("draft")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                statusFilter === "draft"
                  ? "bg-brand-primary text-white"
                  : "border border-border bg-background"
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
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-4 text-left text-sm font-semibold">
                  Title
                </th>

                <th className="px-4 py-4 text-left text-sm font-semibold">
                  Category
                </th>

                <th className="px-4 py-4 text-left text-sm font-semibold">
                  Date
                </th>

                <th className="px-4 py-4 text-left text-sm font-semibold">
                  Status
                </th>

                <th className="px-4 py-4 text-right text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredPosts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium text-heading dark:text-heading-dark">
                        {post.title}
                      </p>

                      <p className="mt-1 text-xs text-text dark:text-text-dark">
                        {post.slug}
                      </p>
                    </div>
                  </td>

                  <td className="px-4 py-4">{post.category}</td>

                  <td className="px-4 py-4">{post.date}</td>

                  <td className="px-4 py-4">
                    <StatusBadge status={post.status} />
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/blog/${post.id}`}>
                        <Button variant="secondary">Edit</Button>
                      </Link>

                      <Button
                        variant="danger"
                        onClick={() => console.log("Delete Post:", post.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageContainer>
  );
}
