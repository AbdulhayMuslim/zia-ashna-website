"use client";

import { useEffect, useState } from "react";
import { KeyRound, Mail, Save, ShieldCheck } from "lucide-react";

import Button from "@/components/admin/ui/Button";
import Card from "@/components/admin/ui/Card";
import InputField from "@/components/admin/ui/InputField";
import UnsavedChangesGuard from "@/components/admin/ui/UnsavedChangesGuard";
import { toast } from "@/components/admin/ui/Toast";

const EMPTY_FORM = { currentPassword: "", newPassword: "", confirmPassword: "" };

export default function PasswordSettings() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState({ loading: true, customPassword: false, changedAt: null, canReset: false });
  const [submitting, setSubmitting] = useState(false);
  const [requestingReset, setRequestingReset] = useState(false);
  const dirty = Object.values(form).some(Boolean);
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  useEffect(() => {
    fetch("/api/admin/profile/password")
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Unable to load password settings.");
        setStatus({ loading: false, ...result.data });
      })
      .catch((error) => { setStatus((current) => ({ ...current, loading: false })); toast.error(error.message); });
  }, []);

  async function savePassword(event) {
    event?.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/admin/profile/password", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to update password.");
      setStatus({ loading: false, ...result.data });
      setForm(EMPTY_FORM);
      toast.success(status.customPassword ? "Password changed successfully." : "Password added successfully.");
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setSubmitting(false);
    }
  }

  async function requestPasswordReset() {
    setRequestingReset(true);
    try {
      const response = await fetch("/api/auth/password-reset/request", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to send the reset email.");
      toast.success(result.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setRequestingReset(false);
    }
  }

  return (
    <Card
      title="Password settings"
      description="Add or change your CMS password and securely verify changes with your current password."
      className="overflow-visible"
    >
      <form onSubmit={savePassword} className="space-y-6">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-background p-4 dark:bg-gray-900">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"><ShieldCheck className="h-5 w-5" /></span>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-heading dark:text-heading-dark">{status.loading ? "Checking password status..." : status.customPassword ? "Custom CMS password enabled" : "Using server-configured password"}</p>
            {status.changedAt && <p className="mt-1 text-xs text-text-muted dark:text-text-muted-dark">Last changed {new Date(status.changedAt).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}</p>}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <InputField id="profile-current-password" type="password" label="Current password" autoComplete="current-password" value={form.currentPassword} onChange={(event) => update("currentPassword", event.target.value)} />
          <InputField id="profile-new-password" type="password" label="New password" autoComplete="new-password" helperText="Use at least 8 characters." value={form.newPassword} onChange={(event) => update("newPassword", event.target.value)} />
          <InputField id="profile-confirm-password" type="password" label="Confirm new password" autoComplete="new-password" value={form.confirmPassword} onChange={(event) => update("confirmPassword", event.target.value)} />
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs text-text-muted dark:text-text-muted-dark"><KeyRound className="h-4 w-4 shrink-0" /> Passwords are stored as salted cryptographic hashes.</div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="secondary" leftIcon={Mail} loading={requestingReset} onClick={requestPasswordReset}>Forgot current password?</Button>
            <Button type="submit" leftIcon={Save} loading={submitting} disabled={!dirty || status.loading}>{status.customPassword ? "Change password" : "Add password"}</Button>
          </div>
        </div>
      </form>
      <UnsavedChangesGuard when={dirty && !submitting && !requestingReset} onSave={savePassword} />
    </Card>
  );
}
