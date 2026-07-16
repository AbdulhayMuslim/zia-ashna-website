import PageContainer from "@/components/admin/layout/PageContainer";
import PageActions from "@/components/admin/layout/PageActions";

import PageHeader from "@/components/admin/ui/PageHeader";
import FormSection from "@/components/admin/ui/FormSection";

import InputField from "@/components/admin/ui/InputField";
import TextareaField from "@/components/admin/ui/TextareaField";

import RepeaterItem from "@/components/admin/ui/RepeaterItem";

import Button from "@/components/admin/ui/Button";

export default function ContactPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Contact Section"
        description="Manage contact section content."
      />

      {/* Content */}
      <FormSection
        title="Content Settings"
        description="Main contact section content."
      >
        <div className="grid gap-6">
          <InputField label="Section Title" placeholder="CONTACT" />

          <InputField label="Heading" placeholder="Let's Work Together" />

          <TextareaField
            label="Description"
            placeholder="Write contact section description..."
            rows={5}
          />
        </div>
      </FormSection>

      {/* Contact Cards */}
      <FormSection
        title="Contact Cards"
        description="Manage contact card titles."
      >
        <div className="space-y-6">
          <RepeaterItem title="Contact Card">
            <InputField label="Card Title" placeholder="example@email.com" />
          </RepeaterItem>

          <Button variant="secondary">Add Contact Card</Button>
        </div>
      </FormSection>

      <PageActions />
    </PageContainer>
  );
}
