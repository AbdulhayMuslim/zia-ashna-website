"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, LockKeyhole, ShieldCheck, UserRound } from "lucide-react";

import Button from "@/components/admin/ui/Button";
import InputField from "@/components/admin/ui/InputField";
import { Toaster, toast } from "@/components/admin/ui/Toast";
import ThemeToggle from "@/components/ui/ThemeToggle";

const EMPTY_PROFILE = {
  fullName: "",
  role: "",
  avatarUrl: "",
  updatedAt: null,
};

function avatarSource(profile) {
  if (!profile.avatarUrl) return "";
  const separator = profile.avatarUrl.includes("?") ? "&" : "?";
  return `${profile.avatarUrl}${separator}profile=${profile.updatedAt ? new Date(profile.updatedAt).getTime() : "latest"}`;
}

export default function LoginPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });

  const loadProfile = useCallback(() => {
    fetch("/api/auth/profile", { cache: "no-store" })
      .then((response) => response.json())
      .then((result) => {
        if (result.data) setProfile({ ...EMPTY_PROFILE, ...result.data });
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    loadProfile();

    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") loadProfile();
    };
    const channel = typeof BroadcastChannel === "undefined"
      ? null
      : new BroadcastChannel("admin-profile");
    channel?.addEventListener("message", loadProfile);
    window.addEventListener("focus", loadProfile);
    document.addEventListener("visibilitychange", refreshWhenVisible);

    return () => {
      channel?.removeEventListener("message", loadProfile);
      channel?.close();
      window.removeEventListener("focus", loadProfile);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
    };
  }, [loadProfile]);

  const updateField = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message || "Unable to sign in.");
        return;
      }
      toast.success("Login successful.");
      router.replace("/admin");
      router.refresh();
    } catch {
      toast.error("Unable to sign in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const displayName = profile.fullName || "CMS Administrator";
  const imageUrl = avatarFailed ? "" : avatarSource(profile);

  return (
    <main className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-[#f5f4f1] px-4 py-8 dark:bg-gray-950 sm:px-6">
      <div
        aria-hidden="true"
        className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-brand-primary/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-brand-secondary/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>

      <section className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-[0_30px_100px_rgba(36,32,27,0.16)] backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/90 dark:shadow-black/40 md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative hidden min-h-[650px] overflow-hidden bg-brand-primary p-10 text-white md:flex md:flex-col md:justify-between lg:p-12">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[42px] border-white/10"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-2xl"
          />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em]">
              <ShieldCheck className="h-4 w-4" /> Secure access
            </span>
            <h1 className="mt-8 font-heading text-4xl font-bold leading-tight lg:text-5xl">
              Welcome back to your CMS.
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/75">
              Manage publications, website sections, media, and messages from
              one focused workspace.
            </p>
          </div>
          <div className="relative space-y-4">
            {[
              "Protected administrator access",
              "Database-powered content management",
              "Responsive publishing workspace",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm text-white/85"
              >
                <span className="h-2 w-2 rounded-full bg-brand-secondary" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex min-h-[620px] flex-col justify-center px-5 py-9 sm:px-10 lg:px-14 dark:bg-gray-800">
          <Link
            href="/"
            className="mb-8 inline-flex w-fit items-center gap-2 text-sm font-medium text-text-muted transition hover:text-brand-primary dark:text-text-muted-dark"
          >
            <ArrowLeft className="h-4 w-4" /> Back to website
          </Link>

          <div className="text-center">
            <div className="relative mx-auto h-24 w-24">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-brand-primary/30 to-brand-secondary/40 blur-md" />
              <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-brand-primary/10 shadow-xl dark:border-gray-800">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={`${displayName} profile`}
                    width={96}
                    height={96}
                    priority
                    onError={() => setAvatarFailed(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound className="h-10 w-10 text-brand-primary" />
                )}
              </div>
              <span
                className="absolute bottom-1 right-0 h-5 w-5 rounded-full border-4 border-white bg-emerald-500 dark:border-gray-800"
                title="Administrator profile"
              />
            </div>
            <h2 className="mt-5 font-heading text-2xl font-bold text-heading dark:text-heading-dark">
              {displayName}
            </h2>
            <p className="mt-1 text-sm text-text-muted dark:text-text-muted-dark">
              {profile.role || "Administrator"}
            </p>
            <p className="mt-5 text-sm text-text dark:text-text-dark">
              Enter your credentials to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <InputField
              id="username"
              type="text"
              label="Username"
              value={form.username}
              onChange={(event) => updateField("username", event.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
              required
              className="bg-white/80 py-3.5 dark:bg-gray-950/60"
            />
            <InputField
              id="password"
              type="password"
              label="Password"
              value={form.password}
              onChange={(event) => updateField("password", event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="bg-white/80 py-3.5 dark:bg-gray-950/60"
            />
            <div className="flex justify-end">
              <Link href="/reset-password" className="text-sm font-medium text-brand-primary transition hover:opacity-75">Forgot password?</Link>
            </div>
            <Button
              type="submit"
              size="lg"
              leftIcon={LockKeyhole}
              className="w-full shadow-lg shadow-brand-primary/20"
              loading={submitting}
            >
              Sign in securely
            </Button>
          </form>

          <p className="mt-7 text-center text-xs leading-5 text-text-muted dark:text-text-muted-dark">
            Authorized administrators only. Login attempts are rate limited and
            monitored.
          </p>
        </div>
      </section>
      <Toaster />
    </main>
  );
}
