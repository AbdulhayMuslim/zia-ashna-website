"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdminCollection } from "@/hooks/useAdminCollection";

import PageContainer from "@/components/admin/layout/PageContainer";
import PageHeader from "@/components/admin/ui/PageHeader";
import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import StatusBadge from "@/components/admin/ui/StatusBadge";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import ActionMenu from "@/components/admin/ui/ActionMenu";
import DataTable from "@/components/admin/ui/DataTable/DataTable";
import DataTableToolbar from "@/components/admin/ui/DataTable/DataTableToolbar";
import DataTablePagination from "@/components/admin/ui/DataTable/DataTablePagination";

import { toast } from "@/components/admin/ui/Toast";

export default function TagsPage() {
  const router = useRouter();
  const { items: tags, remove } = useAdminCollection("tags");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTags = useMemo(() => {
    return tags.filter((tag) => {
      const matchesSearch =
        tag.name.toLowerCase().includes(search.toLowerCase()) ||
        tag.slug.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || tag.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [tags, search, statusFilter]);

  const handleDelete = async (id) => {
    try { await remove(id); toast.success("Tag deleted."); }
    catch (error) { toast.error(error.message); }
  };

  const columns = [
    {
      key: "name",
      label: "Tag",
      render: (row) => (
        <div>
          <div className="font-medium text-heading dark:text-heading-dark">
            {row.name}
          </div>

          <div className="text-sm text-text dark:text-text-dark">
            {row.slug}
          </div>
        </div>
      ),
    },
    {
      key: "description",
      label: "Description",
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
            title="Delete Tag"
            description={`Delete "${row.name}"? This action cannot be undone.`}
            confirmText="Delete"
            onConfirm={() => handleDelete(row.id)}
          >
            <ActionMenu
              onEdit={() => router.push(`/admin/tags/${row.id}`)}
              onDelete={(e) => e?.preventDefault?.()}
            />
          </ConfirmDialog>
        </div>
      ),
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Tags"
        description="Manage blog tags."
        actions={
          <Link href="/admin/tags/create">
            <Button>Add Tag</Button>
          </Link>
        }
      />

      <Card>
        <DataTableToolbar
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search tags..."
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
        </DataTableToolbar>

        <DataTable
          columns={columns}
          data={filteredTags}
          emptyTitle="No tags found"
          emptyDescription="Create your first tag to get started."
        />

        <DataTablePagination>
          <p className="text-sm text-text dark:text-text-dark">
            Showing {filteredTags.length} tag
            {filteredTags.length === 1 ? "" : "s"}
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
