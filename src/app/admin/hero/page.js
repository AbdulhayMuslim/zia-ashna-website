"use client";

import { useState } from "react";

import PageContainer from "@/components/admin/layout/PageContainer";
import PageActions from "@/components/admin/layout/PageActions";

import PageHeader from "@/components/admin/ui/PageHeader";
import FormSection from "@/components/admin/ui/FormSection";

import InputField from "@/components/admin/ui/InputField";
import TextareaField from "@/components/admin/ui/TextareaField";
import ImageUploadField from "@/components/admin/ui/ImageUploadField";
import RepeaterItem from "@/components/admin/ui/RepeaterItem";
import Button from "@/components/admin/ui/Button";

export default function HeroPage() {
  const [heroImage, setHeroImage] = useState(null);
  const [logoImage, setLogoImage] = useState(null);

  return (
    <PageContainer>
      <PageHeader
        title="Hero Section"
        description="Manage the homepage hero content, image and brand logos."
      />

      {/* Content Settings */}
      <FormSection
        title="Content Settings"
        description="Main hero content displayed on the website."
      >
        <div className="grid gap-6">
          <InputField
            id="sectionTitle"
            label="Section Title"
            placeholder="INTRODUCTION"
          />

          <InputField id="name" label="Name" placeholder="Ashna" />

          <InputField
            id="designation"
            label="Designation"
            placeholder="Entrepreneur • Network Engineer • Content Creator"
          />

          <TextareaField
            id="description"
            label="Description"
            placeholder="Write hero description..."
            rows={6}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <InputField
              id="buttonLabel"
              label="Button Label"
              placeholder="Download CV"
            />

            <InputField
              id="buttonUrl"
              label="Button URL"
              placeholder="https://..."
            />
          </div>
        </div>
      </FormSection>

      {/* Hero Image */}
      <FormSection
        title="Hero Image"
        description="Upload the main hero image displayed in the hero section."
      >
        <ImageUploadField
          id="heroImage"
          label="Hero Image"
          description="Recommended high quality portrait image."
          value={heroImage}
          onChange={setHeroImage}
        />
      </FormSection>

      {/* Brand Logos */}
      <FormSection
        title="Brand Logos"
        description="Manage logos displayed below the hero section."
      >
        <div className="space-y-6">
          <RepeaterItem title="Brand Logo">
            <div className="grid gap-6">
              <ImageUploadField
                id="logoImage"
                label="Logo Image"
                description="Upload brand logo."
                value={logoImage}
                onChange={setLogoImage}
              />

              <InputField
                id="logoUrl"
                label="Logo URL"
                placeholder="https://company.com"
              />
            </div>
          </RepeaterItem>

          <Button variant="secondary">Add Logo</Button>
        </div>
      </FormSection>

      <PageActions>
        <Button variant="secondary">Reset</Button>

        <Button>Save Changes</Button>
      </PageActions>
    </PageContainer>
  );
}
