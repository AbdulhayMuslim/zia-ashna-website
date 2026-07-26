"use client";

import { useState } from "react";

import PageContainer from "@/components/admin/layout/PageContainer";
import PageActions from "@/components/admin/layout/PageActions";

import PageHeader from "@/components/admin/ui/PageHeader";
import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import InputField from "@/components/admin/ui/InputField";
import ImageUploadField from "@/components/admin/ui/ImageUploadField";

import { toast } from "@/components/admin/ui/Toast";

export default function ProfilePage() {
  const [avatar, setAvatar] = useState(null);

  const [profile, setProfile] = useState({
    fullName: "",
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const updateField = (key, value) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend API call

    toast.success("Profile updated successfully.");
  };

  return (
    <PageContainer>
      <PageHeader
        title="Profile"
        description="Manage your account information."
      />

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card title="Profile Photo">
            <ImageUploadField
              id="avatar"
              label="Profile Photo"
              value={avatar}
              onChange={setAvatar}
              description="Recommended size: 400 × 400 px"
            />
          </Card>

          <Card title="Personal Information">
            <div className="space-y-5">
              <InputField
                id="fullName"
                label="Full Name"
                value={profile.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
              />

              <InputField
                id="username"
                label="Username"
                value={profile.username}
                onChange={(e) => updateField("username", e.target.value)}
              />

              <InputField
                id="email"
                type="email"
                label="Email Address"
                value={profile.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </div>
          </Card>

          <Card title="Change Password">
            <div className="space-y-5">
              <InputField
                id="currentPassword"
                type="password"
                label="Current Password"
                value={profile.currentPassword}
                onChange={(e) => updateField("currentPassword", e.target.value)}
              />

              <InputField
                id="newPassword"
                type="password"
                label="New Password"
                value={profile.newPassword}
                onChange={(e) => updateField("newPassword", e.target.value)}
              />

              <InputField
                id="confirmPassword"
                type="password"
                label="Confirm New Password"
                value={profile.confirmPassword}
                onChange={(e) => updateField("confirmPassword", e.target.value)}
              />
            </div>
          </Card>

          <PageActions>
            <Button type="submit">Save Changes</Button>
          </PageActions>
        </div>
      </form>
    </PageContainer>
  );
}
