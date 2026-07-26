"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import InputField from "@/components/admin/ui/InputField";
import { toast } from "@/components/admin/ui/Toast";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend authentication

    toast.success("Login successful.");

    router.push("/admin");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 dark:bg-background-dark">
      <div className="w-full max-w-md">
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
              id="email"
              type="email"
              label="Email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="admin@example.com"
            />

            <InputField
              id="password"
              type="password"
              label="Password"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              placeholder="••••••••"
            />

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={(e) => updateField("remember", e.target.checked)}
              />

              <span className="text-sm text-text dark:text-text-dark">
                Remember me
              </span>
            </label>

            <Button type="submit" className="w-full">
              Sign In
            </Button>

            <div className="text-center">
              <Link
                href="#"
                className="text-sm text-brand-primary hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
