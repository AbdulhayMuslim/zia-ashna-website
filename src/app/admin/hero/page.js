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
          <InputField label="Section Title" placeholder="INTRODUCTION" />

          <InputField label="Name" placeholder="Ashna" />

          <InputField
            label="Designation"
            placeholder="Entrepreneur • Network Engineer • Content Creator"
          />

          <TextareaField
            label="Description"
            placeholder="Write hero description..."
            rows={6}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <InputField label="Button Label" placeholder="Download CV" />

            <InputField label="Button URL" placeholder="https://..." />
          </div>
        </div>
      </FormSection>

      {/* Hero Image */}
      <FormSection
        title="Hero Image"
        description="Upload the main hero image displayed in the hero section."
      >
        <ImageUploadField
          label="Hero Image"
          description="Recommended high quality portrait image."
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
                label="Logo Image"
                description="Upload brand logo."
              />

              <InputField label="Logo URL" placeholder="https://company.com" />
            </div>
          </RepeaterItem>

          <Button variant="secondary">Add Logo</Button>
        </div>
      </FormSection>

      <PageActions />
    </PageContainer>
  );
}
