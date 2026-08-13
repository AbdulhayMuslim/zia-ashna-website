"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import InputField from "@/components/admin/ui/InputField";
import { Toaster, toast } from "@/components/admin/ui/Toast";

export default function LoginPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: form.username, password: form.password }),
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
  };

  return (
    <main className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-gray-100 px-5 py-10 dark:bg-gray-950 sm:px-6">
      <div
        aria-hidden="true"
        className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-primary/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-brand-secondary/20 blur-3xl"
      />

      <div className="relative z-10 w-full max-w-md">
        <Card>
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-heading dark:text-heading-dark">
              Admin Login
            </h1>

            <p className="mt-2 text-text dark:text-text-dark">
              Sign in to your dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              id="username"
              type="text"
              label="Username"
              value={form.username}
              onChange={(e) => updateField("username", e.target.value)}
              placeholder="admin"
              autoComplete="username"
            />

            <InputField
              id="password"
              type="password"
              label="Password"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Signing in…" : "Sign In"}
            </Button>
          </form>
        </Card>
      </div>
      <Toaster />
    </main>
  );
}
