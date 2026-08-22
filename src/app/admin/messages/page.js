"use client";

import { CheckCheck, MailOpen, Trash2 } from "lucide-react";

import PageContainer from "@/components/admin/layout/PageContainer";
import PageHeader from "@/components/admin/ui/PageHeader";
import Button from "@/components/admin/ui/Button";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import DataTable from "@/components/admin/ui/DataTable/DataTable";
import StatusBadge from "@/components/admin/ui/StatusBadge";
import { toast } from "@/components/admin/ui/Toast";
import { useAdminCollection } from "@/hooks/useAdminCollection";

export default function MessagesPage() {
  const { items, loading, remove, replace } = useAdminCollection("messages");

  async function updateStatus(message, status) {
    try {
      const response = await fetch(`/api/admin/messages/${message.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to update message.");
      replace(result.data);
      toast.success(`Message marked ${status}.`);
    } catch (error) { toast.error(error.message); }
  }

  async function deleteMessage(id) {
    try { await remove(id); toast.success("Message deleted."); }
    catch (error) { toast.error(error.message); }
  }

  const columns = [
    { key: "sender", label: "Sender", render: (row) => <div><p className="font-medium text-heading dark:text-heading-dark">{row.name}</p><a className="text-sm text-brand-primary hover:underline" href={`mailto:${row.email}`}>{row.email}</a></div> },
    { key: "subject", label: "Message", render: (row) => <div className="max-w-xl"><p className="font-medium text-heading dark:text-heading-dark">{row.subject}</p><p className="mt-1 whitespace-pre-wrap text-sm text-text dark:text-text-dark">{row.message}</p></div> },
    { key: "date", label: "Received", render: (row) => <time className="whitespace-nowrap">{new Date(row.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time> },
    { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
    { key: "actions", label: "Actions", align: "right", render: (row) => <div className="flex justify-end gap-2">
      {row.status === "new" && <Button size="sm" variant="secondary" leftIcon={MailOpen} onClick={() => updateStatus(row, "read")}>Read</Button>}
      {row.status !== "archived" && <button type="button" title="Archive message" aria-label={`Archive message from ${row.name}`} onClick={() => updateStatus(row, "archived")} className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-text hover:text-brand-primary dark:text-text-dark"><CheckCheck className="h-4 w-4" /></button>}
      <ConfirmDialog title="Delete Message" description={`Delete the message from ${row.name}? This cannot be undone.`} confirmText="Delete" onConfirm={() => deleteMessage(row.id)}><button type="button" title="Delete message" aria-label={`Delete message from ${row.name}`} className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/25 text-red-500 hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button></ConfirmDialog>
    </div> },
  ];

  return <PageContainer><PageHeader title="Messages" description="Review and manage contact form submissions." /><DataTable columns={columns} data={items} loading={loading} emptyTitle="No messages found" emptyDescription="New contact form submissions will appear here." /></PageContainer>;
}
