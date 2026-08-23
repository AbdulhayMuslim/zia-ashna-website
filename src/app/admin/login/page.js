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
    const channel =
      typeof BroadcastChannel === "undefined"
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
    <main className="relative flex h-dvh w-full items-center justify-center overflow-hidden bg-[#f5f4f1] p-2 dark:bg-gray-950 sm:p-4">
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

      <section className="relative z-10 grid h-full max-h-[90dvh] min-h-0 w-full max-w-5xl overflow-hidden rounded-2xl border border-white/70 bg-white/90 shadow-[0_30px_100px_rgba(36,32,27,0.16)] backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/90 dark:shadow-black/40 sm:rounded-[2rem] md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative hidden h-full min-h-0 overflow-hidden bg-brand-primary p-6 text-white md:flex md:flex-col md:justify-between lg:p-10">
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
            <h1 className="mt-5 font-heading text-3xl font-bold leading-tight lg:mt-8 lg:text-5xl">
              Welcome back to your CMS.
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/75 lg:mt-5 lg:leading-7">
              Manage publications, website sections, media, and messages from
              one focused workspace.
            </p>
          </div>
          <div className="relative space-y-4">
            {[
              "Protected administrator access",
              "Database powered content management",
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

        <div className="h-full min-h-0 overflow-hidden px-4 dark:bg-gray-800 sm:px-10 lg:px-14">
          <div className="relative flex h-full min-h-0 w-full flex-col items-center justify-around pb-2 pt-14 sm:pb-4">
            <div className="absolute inset-x-0 md:-inset-x-5 lg:-inset-x-8 top-3 md:top-4 z-20 flex items-center justify-between">
              <Link
                href="/"
                className="inline-flex w-fit items-center gap-2 text-xs font-medium text-text-muted transition hover:text-brand-primary dark:text-text-muted-dark sm:text-sm"
              >
                <ArrowLeft className="h-4 w-4" /> Back to website
              </Link>

              <ThemeToggle />
            </div>

            <div className="text-center">
              <div className="relative mx-auto h-14 w-14 sm:h-16 sm:w-16">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-brand-primary/30 to-brand-secondary/40 blur-md" />
                <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-brand-primary/10 shadow-xl dark:border-gray-800 sm:h-16 sm:w-16">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={`${displayName} profile`}
                      width={64}
                      height={64}
                      priority
                      onError={() => setAvatarFailed(true)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserRound className="h-7 w-7 text-brand-primary sm:h-8 sm:w-8" />
                  )}
                </div>
                <span
                  className="absolute bottom-0.5 right-0 h-4 w-4 rounded-full border-[3px] border-white bg-emerald-500 dark:border-gray-800 sm:bottom-1 sm:h-5 sm:w-5 sm:border-4"
                  title="Administrator profile"
                />
              </div>
              <h2 className="mt-1 font-heading text-lg font-bold text-heading dark:text-heading-dark sm:mt-2 sm:text-xl">
                {displayName}
              </h2>
              <p className="mt-0.5 text-xs text-text-muted dark:text-text-muted-dark sm:mt-1 sm:text-sm">
                {profile.role || "Administrator"}
              </p>
              <p className="mt-1 text-xs text-text dark:text-text-dark sm:mt-2 sm:text-sm">
                Enter your credentials to continue.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full space-y-2 sm:space-y-3"
            >
              <InputField
                id="username"
                type="text"
                label="Username"
                value={form.username}
                onChange={(event) =>
                  updateField("username", event.target.value)
                }
                placeholder="Enter your username"
                autoComplete="username"
                required
                className="bg-white/80 py-1.5 text-sm dark:bg-gray-950/60 sm:py-2"
              />
              <InputField
                id="password"
                type="password"
                label="Password"
                value={form.password}
                onChange={(event) =>
                  updateField("password", event.target.value)
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="bg-white/80 py-1.5 text-sm dark:bg-gray-950/60 sm:py-2"
              />
              <div className="flex justify-end">
                <Link
                  href="/reset-password"
                  className="text-xs font-medium text-brand-primary transition hover:opacity-75 sm:text-sm"
                >
                  Forgot password?
                </Link>
              </div>
              <Button
                type="submit"
                size="sm"
                leftIcon={LockKeyhole}
                className="h-8 w-full text-sm shadow-lg shadow-brand-primary/20 sm:h-9"
                loading={submitting}
              >
                Sign in securely
              </Button>
            </form>

            <p className="text-center text-[11px] leading-4 text-text-muted dark:text-text-muted-dark sm:text-xs sm:leading-5">
              Authorized administrators only. Login attempts are rate limited
              and monitored.
            </p>
          </div>
        </div>
      </section>
      <Toaster />
    </main>
  );
}
