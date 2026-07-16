import PageContainer from "@/components/admin/layout/PageContainer";
import PageActions from "@/components/admin/layout/PageActions";

import PageHeader from "@/components/admin/ui/PageHeader";
import FormSection from "@/components/admin/ui/FormSection";

import InputField from "@/components/admin/ui/InputField";
import TextareaField from "@/components/admin/ui/TextareaField";

import IconField from "@/components/admin/ui/IconField";
import RepeaterItem from "@/components/admin/ui/RepeaterItem";
import Button from "@/components/admin/ui/Button";

export default function ActivityPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Activity Section"
        description="Manage activity cards displayed on the homepage."
      />

      {/* Activity Cards */}
      <FormSection
        title="Activity Cards"
        description="Manage statistics and achievements shown in the activity section."
      >
        <div className="space-y-6">
          {/* Default Card */}
          <RepeaterItem title="Activity Card 1">
            <div className="grid gap-6">
              <IconField label="Icon" />

              <div className="grid gap-6 md:grid-cols-2">
                <InputField label="Number" placeholder="50+" />

                <InputField label="Heading" placeholder="Projects Completed" />
              </div>

              <TextareaField
                label="Description"
                placeholder="Short description..."
                rows={4}
              />
            </div>
          </RepeaterItem>

          <Button variant="secondary">Add Activity Card</Button>
        </div>
      </FormSection>

      <PageActions />
    </PageContainer>
  );
}
