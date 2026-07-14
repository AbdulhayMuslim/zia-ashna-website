import PageHeader from "@/components/admin/ui/PageHeader";
import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import InputField from "@/components/admin/ui/InputField";
import TextareaField from "@/components/admin/ui/TextareaField";

export default function HeroPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Hero Section"
        description="Manage the homepage hero content, CTA button, hero image and brand logos."
        actions={<Button>Save Changes</Button>}
      />

      {/* Content Settings */}
      <Card
        title="Content Settings"
        description="Main content displayed in the hero section."
      >
        <div className="grid gap-6">
          <InputField label="Section Title" placeholder="INTRODUCTION" />

          <InputField label="Name / Heading" placeholder="John Doe" />

          <TextareaField
            label="Description"
            placeholder="Enter hero description..."
            rows={6}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <InputField label="Button Label" placeholder="Download CV" />

            <InputField label="Button Link" placeholder="https://..." />
          </div>
        </div>
      </Card>

      {/* Hero Image */}
      <Card title="Hero Image" description="Upload or replace the hero image.">
        <div
          className="
            flex
            min-h-60
            items-center
            justify-center
            rounded-3xl
            border-2
            border-dashed
            border-border
            bg-background
          "
        >
          <div className="text-center">
            <p className="font-medium text-heading dark:text-heading-dark">
              Hero Image Upload
            </p>

            <p className="mt-2 text-sm text-text dark:text-text-dark">
              Image upload component will be connected later.
            </p>
          </div>
        </div>
      </Card>

      {/* Brand Logos */}
      <Card
        title="Brand Logos"
        description="Manage partner and client logos displayed in hero section."
      >
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="
                  flex
                  h-28
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-border
                  bg-background
                "
              >
                Logo {item}
              </div>
            ))}
          </div>

          <Button variant="secondary">Add Logo</Button>
        </div>
      </Card>

      {/* Save Footer */}
      <Card>
        <div className="flex justify-end gap-4">
          <Button variant="secondary">Reset</Button>

          <Button>Save Changes</Button>
        </div>
      </Card>
    </div>
  );
}
