"use client";

import PageContainer from "@/components/admin/layout/PageContainer";
import PageActions from "@/components/admin/layout/PageActions";

import PageHeader from "@/components/admin/ui/PageHeader";
import FormSection from "@/components/admin/ui/FormSection";

import InputField from "@/components/admin/ui/InputField";
import TextareaField from "@/components/admin/ui/TextareaField";

import RepeaterItem from "@/components/admin/ui/RepeaterItem";
import Button from "@/components/admin/ui/Button";

export default function AboutPage() {
  return (
    <PageContainer>
      <PageHeader
        title="About Section"
        description="Manage biography, experience, education and certificates."
      />

      {/* Content Settings */}
      <FormSection
        title="Content Settings"
        description="Main information displayed in the About section."
      >
        <div className="grid gap-6">
          <InputField
            id="sectionTitle"
            label="Section Title"
            placeholder="ABOUT ME"
          />

          <InputField
            id="role"
            label="Role"
            placeholder="Full Stack Developer"
          />

          <InputField
            id="heading"
            label="Heading"
            placeholder="Building modern digital experiences"
          />

          <TextareaField
            id="description"
            label="Description"
            placeholder="Write your about description..."
            rows={8}
          />
        </div>
      </FormSection>

      {/* Experience Cards */}
      <FormSection
        title="Experience Cards"
        description="Manage statistics displayed in the About section."
      >
        <div className="space-y-6">
          <RepeaterItem title="Experience Card 1">
            <div className="grid gap-6 md:grid-cols-2">
              <InputField
                id="experienceNumber"
                label="Number"
                placeholder="10+"
              />

              <InputField
                id="experienceTitle"
                label="Title"
                placeholder="Years Experience"
              />
            </div>
          </RepeaterItem>

          <Button variant="secondary">Add Experience Card</Button>
        </div>
      </FormSection>

      {/* Education */}
      <FormSection
        title="Education Degrees"
        description="Manage academic qualifications."
      >
        <div className="space-y-6">
          <RepeaterItem title="Degree 1">
            <div className="grid gap-6">
              <InputField
                id="degree"
                label="Degree"
                placeholder="Bachelor of Computer Science"
              />

              <InputField
                id="institution"
                label="Institution"
                placeholder="Kabul University"
              />

              <InputField id="year" label="Year" placeholder="2020" />
            </div>
          </RepeaterItem>

          <Button variant="secondary">Add Degree</Button>
        </div>
      </FormSection>

      {/* Certificates */}
      <FormSection
        title="Certificates"
        description="Manage professional certifications."
      >
        <div className="space-y-6">
          <RepeaterItem title="Certificate 1">
            <InputField
              id="certificateName"
              label="Certificate Name"
              placeholder="CCNA"
            />
          </RepeaterItem>

          <Button variant="secondary">Add Certificate</Button>
        </div>
      </FormSection>

      <PageActions>
        <Button variant="secondary">Reset</Button>

        <Button>Save Changes</Button>
      </PageActions>
    </PageContainer>
  );
}
