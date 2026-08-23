"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, KeyRound, Mail, ShieldCheck } from "lucide-react";

import Button from "@/components/admin/ui/Button";
import InputField from "@/components/admin/ui/InputField";
import { Toaster, toast } from "@/components/admin/ui/Toast";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function ResetPasswordForm({ token }) {
  const [email, setEmail] = useState("");
  const [passwords, setPasswords] = useState({ newPassword: "", confirmPassword: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [complete, setComplete] = useState(false);

  async function requestReset(event) {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/auth/password-reset/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to send the reset email.");
      setSent(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function resetPassword(event) {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/auth/password-reset/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, ...passwords }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to reset the password.");
      setComplete(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden bg-[#f5f4f1] px-4 py-10 dark:bg-gray-950 sm:px-6">
      <div aria-hidden="true" className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-brand-primary/15 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-brand-secondary/20 blur-3xl" />
      <div className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6"><ThemeToggle /></div>

      <section className="relative z-10 w-full max-w-lg rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_30px_100px_rgba(36,32,27,0.16)] backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/90 sm:p-10">
        <Link href="/admin/login" className="inline-flex items-center gap-2 text-sm font-medium text-text-muted transition hover:text-brand-primary dark:text-text-muted-dark"><ArrowLeft className="h-4 w-4" /> Back to login</Link>

        <div className="mt-8 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary"><KeyRound className="h-7 w-7" /></span>
          <h1 className="mt-5 font-heading text-3xl font-bold text-heading dark:text-heading-dark">{token ? "Create a new password" : "Reset your password"}</h1>
          <p className="mt-2 text-sm leading-6 text-text dark:text-text-dark">{token ? "Choose a secure password for your CMS account." : "Enter the email saved in your profile and we’ll send you a secure reset link."}</p>
        </div>

        {complete ? (
          <div className="mt-8 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" />
            <p className="mt-4 font-medium text-heading dark:text-heading-dark">Your password has been reset.</p>
            <Link href="/admin/login" className="mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-brand-primary px-6 font-medium text-white">Continue to login</Link>
          </div>
        ) : sent && !token ? (
          <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-center">
            <Mail className="mx-auto h-7 w-7 text-emerald-600 dark:text-emerald-400" />
            <p className="mt-3 font-medium text-heading dark:text-heading-dark">Check your inbox</p>
            <p className="mt-1 text-sm leading-6 text-text dark:text-text-dark">If the email matches your profile, the reset link will arrive shortly. It expires in 30 minutes.</p>
          </div>
        ) : token ? (
          <form onSubmit={resetPassword} className="mt-8 space-y-5">
            <InputField id="reset-new-password" type="password" label="New password" autoComplete="new-password" helperText="Use at least 8 characters." value={passwords.newPassword} onChange={(event) => setPasswords((current) => ({ ...current, newPassword: event.target.value }))} required />
            <InputField id="reset-confirm-password" type="password" label="Confirm new password" autoComplete="new-password" value={passwords.confirmPassword} onChange={(event) => setPasswords((current) => ({ ...current, confirmPassword: event.target.value }))} required />
            <Button type="submit" size="lg" leftIcon={ShieldCheck} loading={submitting} className="w-full">Reset password</Button>
          </form>
        ) : (
          <form onSubmit={requestReset} className="mt-8 space-y-5">
            <InputField id="reset-email" type="email" label="Profile email" autoComplete="email" placeholder="Enter your saved email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            <Button type="submit" size="lg" leftIcon={Mail} loading={submitting} className="w-full">Send reset link</Button>
          </form>
        )}
      </section>
      <Toaster />
    </main>
  );
}
