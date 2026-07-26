"use client";

import { useState } from "react";

import PageContainer from "@/components/admin/layout/PageContainer";
import PageActions from "@/components/admin/layout/PageActions";

import PageHeader from "@/components/admin/ui/PageHeader";
import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import InputField from "@/components/admin/ui/InputField";
import TextareaField from "@/components/admin/ui/TextareaField";
import ImageUploadField from "@/components/admin/ui/ImageUploadField";

import { toast } from "@/components/admin/ui/Toast";

export default function SettingsPage() {
  const [logo, setLogo] = useState(null);
  const [favicon, setFavicon] = useState(null);

  const [form, setForm] = useState({
    siteName: "",
    siteDescription: "",

    contactEmail: "",
    phone: "",
    address: "",

    seoTitle: "",
    seoDescription: "",

    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: "",

    copyright: "",
  });

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend API call

    toast.success("Settings saved successfully.");
  };

  return (
    <PageContainer>
      <PageHeader title="Settings" description="Manage website settings." />

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card title="General">
            <div className="space-y-5">
              <InputField
                id="siteName"
                label="Site Name"
                value={form.siteName}
                onChange={(e) => updateField("siteName", e.target.value)}
                placeholder="My Website"
              />

              <TextareaField
                id="siteDescription"
                label="Site Description"
                rows={4}
                value={form.siteDescription}
                onChange={(e) => updateField("siteDescription", e.target.value)}
              />
            </div>
          </Card>

          <Card title="Branding">
            <div className="grid gap-6 lg:grid-cols-2">
              <ImageUploadField
                id="logo"
                label="Site Logo"
                value={logo}
                onChange={setLogo}
                description="Recommended size: 512 × 512 px"
              />

              <ImageUploadField
                id="favicon"
                label="Favicon"
                value={favicon}
                onChange={setFavicon}
                description="Recommended size: 64 × 64 px"
              />
            </div>
          </Card>

          <Card title="Contact Information">
            <div className="space-y-5">
              <InputField
                id="contactEmail"
                label="Contact Email"
                type="email"
                value={form.contactEmail}
                onChange={(e) => updateField("contactEmail", e.target.value)}
              />

              <InputField
                id="phone"
                label="Phone Number"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />

              <TextareaField
                id="address"
                label="Address"
                rows={3}
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
              />
            </div>
          </Card>

          <Card title="SEO">
            <div className="space-y-5">
              <InputField
                id="seoTitle"
                label="SEO Title"
                value={form.seoTitle}
                onChange={(e) => updateField("seoTitle", e.target.value)}
              />

              <TextareaField
                id="seoDescription"
                label="SEO Description"
                rows={4}
                value={form.seoDescription}
                onChange={(e) => updateField("seoDescription", e.target.value)}
              />
            </div>
          </Card>

          <Card title="Social Links">
            <div className="space-y-5">
              <InputField
                id="facebook"
                label="Facebook"
                value={form.facebook}
                onChange={(e) => updateField("facebook", e.target.value)}
              />

              <InputField
                id="twitter"
                label="X (Twitter)"
                value={form.twitter}
                onChange={(e) => updateField("twitter", e.target.value)}
              />

              <InputField
                id="instagram"
                label="Instagram"
                value={form.instagram}
                onChange={(e) => updateField("instagram", e.target.value)}
              />

              <InputField
                id="linkedin"
                label="LinkedIn"
                value={form.linkedin}
                onChange={(e) => updateField("linkedin", e.target.value)}
              />

              <InputField
                id="youtube"
                label="YouTube"
                value={form.youtube}
                onChange={(e) => updateField("youtube", e.target.value)}
              />
            </div>
          </Card>

          <Card title="Footer">
            <InputField
              id="copyright"
              label="Copyright"
              value={form.copyright}
              onChange={(e) => updateField("copyright", e.target.value)}
              placeholder="© 2026 My Website. All rights reserved."
            />
          </Card>

          <PageActions>
            <Button type="submit">Save Settings</Button>
          </PageActions>
        </div>
      </form>
    </PageContainer>
  );
}
