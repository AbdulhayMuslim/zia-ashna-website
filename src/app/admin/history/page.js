"use client";

import PageContainer from "@/components/admin/layout/PageContainer";
import PageActions from "@/components/admin/layout/PageActions";

import PageHeader from "@/components/admin/ui/PageHeader";
import FormSection from "@/components/admin/ui/FormSection";

import InputField from "@/components/admin/ui/InputField";
import TextareaField from "@/components/admin/ui/TextareaField";

import IconField from "@/components/admin/ui/IconField";
import RepeaterItem from "@/components/admin/ui/RepeaterItem";
import Button from "@/components/admin/ui/Button";

export default function HistoryPage() {
  return (
    <PageContainer>
      <PageHeader
        title="History Section"
        description="Manage timeline content and milestones displayed on the homepage."
      />

      {/* Main Content */}
      <FormSection
        title="Content Settings"
        description="Main heading and description for the history section."
      >
        <div className="grid gap-6">
          <InputField
            id="sectionTitle"
            label="Section Title"
            placeholder="MY HISTORY"
          />

          <InputField
            id="heading"
            label="Heading"
            placeholder="My Professional Journey"
          />

          <TextareaField
            id="description"
            label="Description"
            placeholder="Write history section description..."
            rows={6}
          />
        </div>
      </FormSection>

      {/* History Cards */}
      <FormSection
        title="History Cards"
        description="Manage timeline cards and milestones."
      >
        <div className="space-y-6">
          <RepeaterItem title="History Card 1">
            <div className="grid gap-6">
              <IconField id="historyIcon" label="Icon" />

              <div className="grid gap-6 md:grid-cols-2">
                <InputField id="number" label="Number" placeholder="2020" />

                <InputField
                  id="cardHeading"
                  label="Heading"
                  placeholder="Started Career"
                />
              </div>

              <TextareaField
                id="cardDescription"
                label="Description"
                placeholder="Describe this milestone..."
                rows={4}
              />
            </div>
          </RepeaterItem>

          <Button variant="secondary">Add History Card</Button>
        </div>
      </FormSection>

      <PageActions>
        <Button variant="secondary">Reset</Button>

        <Button>Save Changes</Button>
      </PageActions>
    </PageContainer>
  );
}
