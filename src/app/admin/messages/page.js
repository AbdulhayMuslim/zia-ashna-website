"use client";

import { useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, Mail, MailOpen, Trash2, UserRound, X } from "lucide-react";

import PageContainer from "@/components/admin/layout/PageContainer";
import PageHeader from "@/components/admin/ui/PageHeader";
import ViewSectionLink from "@/components/admin/ui/ViewSectionLink";
import Button from "@/components/admin/ui/Button";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import DataTable from "@/components/admin/ui/DataTable/DataTable";
import DataTablePagination from "@/components/admin/ui/DataTable/DataTablePagination";
import StatusBadge from "@/components/admin/ui/StatusBadge";
import { toast } from "@/components/admin/ui/Toast";
import { useAdminCollection } from "@/hooks/useAdminCollection";

const MESSAGES_PER_PAGE = 15;
const FILTERS = [{ value: "all", label: "All" }, { value: "read", label: "Seen" }, { value: "unread", label: "Unread" }];

function messageStatus(message) { return message.status === "new" ? "unread" : "seen"; }
function clipText(value, limit) { const text = value || ""; return text.length > limit ? `${text.slice(0, limit).trimEnd()}…` : text; }
function formatDate(value, includeTime = false) {
  return new Date(value).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", ...(includeTime ? { hour: "numeric", minute: "2-digit" } : {}) });
}

function MessageDetailsDialog({ message, onClose, onStatusChange, onDelete }) {
  if (!message) return null;
  const unread = message.status === "new";
  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex max-h-[90vh] w-[94vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-2xl outline-none animate-in fade-in-0 zoom-in-95 dark:bg-gray-900">
          <div className="flex items-start justify-between gap-4 border-b border-border bg-card px-5 py-4 dark:bg-gray-800">
            <div className="min-w-0"><Dialog.Title className="font-heading text-xl font-semibold text-heading dark:text-heading-dark">Message details</Dialog.Title><Dialog.Description className="mt-1 truncate text-sm text-text dark:text-text-dark">Received {formatDate(message.createdAt, true)}</Dialog.Description></div>
            <Dialog.Close asChild><button type="button" aria-label="Close message details" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-text transition hover:bg-brand-primary/10 hover:text-brand-primary dark:text-text-dark"><X className="h-5 w-5" /></button></Dialog.Close>
          </div>
          <div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-6">
            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary"><UserRound className="h-5 w-5" /></span><div className="min-w-0"><p className="truncate font-semibold text-heading dark:text-heading-dark">{message.name}</p><a href={`mailto:${message.email}`} className="block truncate text-sm text-brand-primary hover:underline">{message.email}</a></div></div>
              <StatusBadge status={messageStatus(message)} />
            </div>
            <section><p className="text-xs font-semibold uppercase tracking-wider text-text-muted dark:text-text-muted-dark">Subject</p><h2 className="mt-2 font-heading text-xl font-semibold text-heading dark:text-heading-dark">{message.subject}</h2></section>
            <section className="rounded-2xl border border-border bg-card p-4 dark:bg-gray-800 sm:p-5"><p className="whitespace-pre-wrap break-words text-sm leading-7 text-text dark:text-text-dark">{message.message}</p></section>
          </div>
          <div className="flex flex-col-reverse gap-2 border-t border-border bg-card p-4 dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-end sm:px-6">
            <ConfirmDialog title="Delete Message" description={`Delete the message from ${message.name}? This cannot be undone.`} confirmText="Delete" onConfirm={() => onDelete(message.id)}><Button type="button" variant="danger" leftIcon={Trash2}>Delete</Button></ConfirmDialog>
            <Button type="button" variant="secondary" leftIcon={unread ? MailOpen : Mail} onClick={() => onStatusChange(message, unread ? "read" : "new")}>Mark as {unread ? "seen" : "unread"}</Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default function MessagesPage() {
  const { items, loading, remove, replace } = useAdminCollection("messages");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const counts = useMemo(() => ({ all: items.length, read: items.filter((item) => item.status !== "new").length, unread: items.filter((item) => item.status === "new").length }), [items]);
  const filteredMessages = useMemo(() => items.filter((item) => filter === "all" || (filter === "unread" ? item.status === "new" : item.status !== "new")), [filter, items]);
  const totalPages = Math.max(1, Math.ceil(filteredMessages.length / MESSAGES_PER_PAGE));
  const visiblePage = Math.min(currentPage, totalPages);
  const pageStart = (visiblePage - 1) * MESSAGES_PER_PAGE;
  const paginatedMessages = filteredMessages.slice(pageStart, pageStart + MESSAGES_PER_PAGE);

  function announceCountChange() { window.dispatchEvent(new Event("messages:unread-count-changed")); }
  async function updateStatus(message, status) {
    if (message.status === status) return message;
    try {
      const response = await fetch(`/api/admin/messages/${message.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to update message.");
      replace(result.data); setSelectedMessage((current) => current?.id === result.data.id ? result.data : current); announceCountChange();
      toast.success(`Message marked ${status === "new" ? "unread" : "seen"}.`); return result.data;
    } catch (error) { toast.error(error.message); return message; }
  }
  async function openMessage(message) {
    setSelectedMessage(message);
    if (message.status === "new") setSelectedMessage(await updateStatus(message, "read"));
  }
  async function deleteMessage(id) {
    try { await remove(id); setSelectedMessage((current) => current?.id === id ? null : current); announceCountChange(); toast.success("Message deleted."); }
    catch (error) { toast.error(error.message); }
  }
  const actions = (row) => <div className="flex shrink-0 justify-end gap-1 xl:gap-2" onClick={(event) => event.stopPropagation()}>
    <button type="button" title={`Mark as ${row.status === "new" ? "seen" : "unread"}`} aria-label={`Mark message from ${row.name} as ${row.status === "new" ? "seen" : "unread"}`} onClick={() => updateStatus(row, row.status === "new" ? "read" : "new")} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border text-text transition hover:border-brand-primary/30 hover:bg-brand-primary/10 hover:text-brand-primary dark:text-text-dark">{row.status === "new" ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}</button>
    <ConfirmDialog title="Delete Message" description={`Delete the message from ${row.name}? This cannot be undone.`} confirmText="Delete" onConfirm={() => deleteMessage(row.id)}><button type="button" title="Delete message" aria-label={`Delete message from ${row.name}`} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-red-500/25 text-red-500 transition hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></button></ConfirmDialog>
  </div>;
  const columns = [
    { key: "sender", label: "Sender", width: "24%", render: (row) => <button type="button" onClick={() => openMessage(row)} className="block w-full min-w-0 overflow-hidden text-left"><p className="truncate font-medium text-heading dark:text-heading-dark" title={row.name}>{clipText(row.name, 32)}</p><p className="truncate text-sm text-brand-primary" title={row.email}>{clipText(row.email, 38)}</p></button> },
    { key: "subject", label: "Message", render: (row) => <button type="button" onClick={() => openMessage(row)} className="block w-full min-w-0 overflow-hidden text-left"><p className="truncate font-medium text-heading dark:text-heading-dark" title={row.subject}>{clipText(row.subject, 55)}</p><p className="mt-1 truncate text-sm text-text dark:text-text-dark" title={row.message}>{clipText(row.message, 110)}</p></button> },
    { key: "date", label: "Received", width: "118px", render: (row) => <time className="block truncate whitespace-nowrap">{formatDate(row.createdAt)}</time> },
    { key: "status", label: "Status", width: "88px", render: (row) => <StatusBadge status={messageStatus(row)} /> },
    { key: "actions", label: "Actions", width: "104px", align: "right", render: actions },
  ];
  return <PageContainer className="min-w-0 max-w-full">
    <PageHeader title="Messages" description="Review and manage contact form submissions." actions={<ViewSectionLink href="/#contact" />} />
    <div className="flex max-w-full gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Message categories">{FILTERS.map((item) => <button key={item.value} type="button" role="tab" aria-selected={filter === item.value} onClick={() => { setFilter(item.value); setCurrentPage(1); }} className={`inline-flex shrink-0 items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-medium transition ${filter === item.value ? "border-brand-primary bg-brand-primary text-white" : "border-border bg-card text-heading hover:border-brand-primary/30 hover:bg-brand-primary/5 dark:bg-gray-800 dark:text-heading-dark"}`}>{item.label}<span className={`rounded-full px-2 py-0.5 text-xs ${filter === item.value ? "bg-white/20 text-white" : "bg-brand-primary/10 text-brand-primary"}`}>{counts[item.value]}</span></button>)}</div>
    <div className="min-w-0 max-w-full overflow-hidden rounded-2xl border border-border bg-card dark:bg-gray-800">
      <div className="grid gap-4 p-4 sm:grid-cols-2 lg:hidden">
        {loading ? [...Array(4)].map((_, index) => <div key={index} className="h-52 animate-pulse rounded-2xl bg-muted dark:bg-muted-dark" />) : paginatedMessages.length ? paginatedMessages.map((message) => <article key={message.id} onClick={() => openMessage(message)} className={`min-w-0 cursor-pointer rounded-2xl border p-4 transition hover:-translate-y-0.5 hover:border-brand-primary/30 hover:shadow-md ${message.status === "new" ? "border-brand-primary/25 bg-brand-primary/[0.04]" : "border-border bg-background dark:bg-gray-900"}`}>
          <div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate font-semibold text-heading dark:text-heading-dark">{clipText(message.name, 32)}</p><p className="mt-0.5 truncate text-xs text-brand-primary">{clipText(message.email, 38)}</p></div><StatusBadge status={messageStatus(message)} /></div><div className="my-4 border-t border-border" /><h2 className="truncate font-medium text-heading dark:text-heading-dark" title={message.subject}>{clipText(message.subject, 55)}</h2><p className="mt-2 line-clamp-2 break-words text-sm leading-6 text-text dark:text-text-dark">{clipText(message.message, 110)}</p><div className="mt-4 flex items-center justify-between gap-3"><time className="text-xs text-text-muted dark:text-text-muted-dark">{formatDate(message.createdAt)}</time>{actions(message)}</div>
        </article>) : <div className="col-span-full rounded-2xl border border-dashed border-border px-4 py-12 text-center"><p className="font-medium text-heading dark:text-heading-dark">No {filter === "all" ? "" : `${filter === "read" ? "seen" : filter} `}messages found</p><p className="mt-1 text-sm text-text dark:text-text-dark">New contact form submissions will appear here.</p></div>}
      </div>
      <div className="hidden min-w-0 max-w-full overflow-hidden lg:block"><DataTable columns={columns} data={paginatedMessages} loading={loading} fixedLayout emptyTitle={`No ${filter === "all" ? "" : `${filter === "read" ? "seen" : filter} `}messages found`} emptyDescription="New contact form submissions will appear here." /></div>
      <DataTablePagination className="border-border bg-card dark:bg-gray-800"><p className="text-sm text-text dark:text-text-dark">{filteredMessages.length ? `Showing ${pageStart + 1}–${Math.min(pageStart + MESSAGES_PER_PAGE, filteredMessages.length)} of ${filteredMessages.length} messages` : "No messages to show"}</p>{totalPages > 1 && <nav aria-label="Message pagination" className="flex flex-wrap items-center justify-center gap-2"><button type="button" aria-label="Previous page" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} disabled={visiblePage === 1} className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-primary/20 bg-bg text-brand-primary duration-300 hover:bg-brand-primary hover:text-white disabled:pointer-events-none disabled:opacity-40 dark:bg-bg-dark dark:text-brand-secondary"><ChevronLeft size={18} /></button>{Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <button key={page} type="button" aria-label={`Go to page ${page}`} aria-current={visiblePage === page ? "page" : undefined} onClick={() => setCurrentPage(page)} className={`h-11 w-11 rounded-xl border text-sm font-medium duration-300 ${visiblePage === page ? "border-brand-primary bg-brand-primary text-white" : "border-brand-primary/20 bg-bg text-brand-primary hover:bg-brand-primary hover:text-white dark:bg-bg-dark dark:text-brand-secondary"}`}>{page}</button>)}<button type="button" aria-label="Next page" onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} disabled={visiblePage === totalPages} className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-primary/20 bg-bg text-brand-primary duration-300 hover:bg-brand-primary hover:text-white disabled:pointer-events-none disabled:opacity-40 dark:bg-bg-dark dark:text-brand-secondary"><ChevronRight size={18} /></button></nav>}</DataTablePagination>
    </div>
    <MessageDetailsDialog message={selectedMessage} onClose={() => setSelectedMessage(null)} onStatusChange={updateStatus} onDelete={deleteMessage} />
  </PageContainer>;
}
