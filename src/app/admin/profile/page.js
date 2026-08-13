"use client";

import { useState } from "react";
import {
  Bell,
  Camera,
  KeyRound,
  LockKeyhole,
  Mail,
  MonitorSmartphone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import PageContainer from "@/components/admin/layout/PageContainer";
import PageHeader from "@/components/admin/ui/PageHeader";
import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import InputField from "@/components/admin/ui/InputField";
import ImageUploadField from "@/components/admin/ui/ImageUploadField";
import SwitchField from "@/components/admin/ui/SwitchField";
import { toast } from "@/components/admin/ui/Toast";

const INITIAL_PROFILE = {
  fullName: "Administrator",
  username: "admin",
  email: "",
  phone: "",
  jobTitle: "Website Administrator",
};

export default function ProfilePage() {
  const [avatar, setAvatar] = useState(null);
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [password, setPassword] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [preferences, setPreferences] = useState({
    loginAlerts: true,
    contentUpdates: true,
    twoFactor: false,
  });

  const updateProfile = (key, value) =>
    setProfile((current) => ({ ...current, [key]: value }));
  const updatePassword = (key, value) =>
    setPassword((current) => ({ ...current, [key]: value }));
  const updatePreference = (key, value) =>
    setPreferences((current) => ({ ...current, [key]: value }));

  function persistenceNotice() {
    toast.error("Connect a user database before account changes can be saved.");
  }

  function handlePasswordChange(event) {
    event.preventDefault();

    if (!password.current || !password.next || !password.confirm) {
      toast.error("Complete all password fields.");
      return;
    }
    if (password.next.length < 8) {
      toast.error("The new password must contain at least 8 characters.");
      return;
    }
    if (password.next !== password.confirm) {
      toast.error("The new passwords do not match.");
      return;
    }

    persistenceNotice();
  }

  return (
    <PageContainer>
      <PageHeader
        title="Profile & Account"
        description="Manage your identity, sign-in details, security, and account preferences."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(19rem,0.8fr)]">
        <div className="space-y-6">
          <Card>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="w-full shrink-0 sm:w-36">
                <ImageUploadField
                  id="avatar"
                  value={avatar}
                  onChange={setAvatar}
                  description="JPG, PNG or WebP"
                  maxSize={2 * 1024 * 1024}
                  compact
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-sm font-medium text-brand-primary">
                  <Camera className="h-4 w-4" /> Profile photo
                </div>
                <h2 className="mt-2 truncate text-2xl font-bold text-heading dark:text-heading-dark">
                  {profile.fullName || "Administrator"}
                </h2>
                <p className="mt-1 text-sm text-text dark:text-text-dark">
                  @{profile.username || "admin"} · {profile.jobTitle}
                </p>
                <p className="mt-3 text-xs text-text-muted">
                  Use a square image up to 2 MB. It will appear in your account and activity records.
                </p>
              </div>
            </div>
          </Card>

          <Card title="Personal information">
            <form
              className="grid gap-5 md:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault();
                persistenceNotice();
              }}
            >
              <InputField
                id="fullName"
                label="Full name"
                value={profile.fullName}
                onChange={(event) => updateProfile("fullName", event.target.value)}
                autoComplete="name"
              />
              <InputField
                id="username"
                label="Username"
                value={profile.username}
                onChange={(event) => updateProfile("username", event.target.value)}
                autoComplete="username"
                helperText="Used to sign in to the admin panel."
              />
              <InputField
                id="email"
                type="email"
                label="Email address"
                placeholder="admin@example.com"
                value={profile.email}
                onChange={(event) => updateProfile("email", event.target.value)}
                autoComplete="email"
              />
              <InputField
                id="phone"
                type="tel"
                label="Phone number"
                placeholder="+93 700 000 000"
                value={profile.phone}
                onChange={(event) => updateProfile("phone", event.target.value)}
                autoComplete="tel"
              />
              <InputField
                id="jobTitle"
                label="Role / job title"
                value={profile.jobTitle}
                onChange={(event) => updateProfile("jobTitle", event.target.value)}
              />
              <div className="md:col-span-2 flex justify-end">
                <Button type="submit" leftIcon={UserRound}>Save profile</Button>
              </div>
            </form>
          </Card>

          <Card title="Change password">
            <form className="space-y-5" onSubmit={handlePasswordChange}>
              <InputField
                id="currentPassword"
                type="password"
                label="Current password"
                value={password.current}
                onChange={(event) => updatePassword("current", event.target.value)}
                autoComplete="current-password"
              />
              <div className="grid gap-5 md:grid-cols-2">
                <InputField
                  id="newPassword"
                  type="password"
                  label="New password"
                  value={password.next}
                  onChange={(event) => updatePassword("next", event.target.value)}
                  autoComplete="new-password"
                  helperText="Use at least 8 characters."
                />
                <InputField
                  id="confirmPassword"
                  type="password"
                  label="Confirm new password"
                  value={password.confirm}
                  onChange={(event) => updatePassword("confirm", event.target.value)}
                  autoComplete="new-password"
                />
              </div>
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={persistenceNotice}
                  className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary hover:underline"
                >
                  <Mail className="h-4 w-4" /> Send password-reset email
                </button>
                <Button type="submit" leftIcon={KeyRound}>Update password</Button>
              </div>
            </form>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card title="Security">
            <div className="space-y-6">
              <SwitchField
                id="loginAlerts"
                label="Login alerts"
                description="Email me when a new device signs in."
                checked={preferences.loginAlerts}
                onChange={(value) => updatePreference("loginAlerts", value)}
              />
              <SwitchField
                id="twoFactor"
                label="Two-factor authentication"
                description="Require a second verification step when signing in."
                checked={preferences.twoFactor}
                onChange={(value) => updatePreference("twoFactor", value)}
              />
              <Button className="w-full" variant="secondary" leftIcon={ShieldCheck} onClick={persistenceNotice}>
                Configure security
              </Button>
            </div>
          </Card>

          <Card title="Notifications">
            <SwitchField
              id="contentUpdates"
              label="Content updates"
              description="Receive notices about publishing and account activity."
              checked={preferences.contentUpdates}
              onChange={(value) => updatePreference("contentUpdates", value)}
            />
          </Card>

          <Card title="Active session">
            <div className="rounded-2xl border border-border bg-background p-4">
              <div className="flex items-start gap-3">
                <MonitorSmartphone className="mt-0.5 h-5 w-5 text-brand-primary" />
                <div>
                  <p className="text-sm font-semibold text-heading dark:text-heading-dark">Current browser</p>
                  <p className="mt-1 text-xs text-text-muted">Active now · Signed session expires after 8 hours</p>
                </div>
              </div>
            </div>
            <Button className="mt-4 w-full" variant="secondary" leftIcon={LockKeyhole} onClick={persistenceNotice}>
              Sign out other sessions
            </Button>
          </Card>

          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-100">
            <div className="flex items-start gap-3">
              <Bell className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="text-sm font-semibold">Database connection required</p>
                <p className="mt-1 text-xs leading-5 opacity-80">
                  Account edits and password recovery become available after user persistence and email delivery are connected.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </PageContainer>
  );
}
