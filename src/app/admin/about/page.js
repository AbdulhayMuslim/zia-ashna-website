import PageHeader from "@/components/admin/ui/PageHeader";
import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import InputField from "@/components/admin/ui/InputField";
import TextareaField from "@/components/admin/ui/TextareaField";

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="About Section"
        description="Manage biography, experience, education and certifications."
        actions={<Button>Save Changes</Button>}
      />

      {/* Main Content */}
      <Card
        title="Content Settings"
        description="Main content displayed in the About section."
      >
        <div className="grid gap-6">
          <InputField label="Section Title" placeholder="ABOUT ME" />

          <InputField label="Role" placeholder="Full Stack Developer" />

          <InputField
            label="Heading"
            placeholder="Building modern digital experiences"
          />

          <TextareaField
            label="Description"
            placeholder="Write your biography..."
            rows={8}
          />
        </div>
      </Card>

      {/* Experience Cards */}
      <Card
        title="Experience Cards"
        description="Highlight key achievements and statistics."
      >
        <div className="space-y-4">
          {[1, 2, 3].map((card) => (
            <div
              key={card}
              className="
                rounded-2xl
                border
                border-border
                p-5
              "
            >
              <div className="grid gap-4 md:grid-cols-3">
                <InputField label="Number" placeholder="10+" />

                <InputField label="Title" placeholder="Years Experience" />

                <InputField label="Icon" placeholder="Briefcase" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Button variant="secondary">Add Experience Card</Button>
        </div>
      </Card>

      {/* Education */}
      <Card title="Education Degrees" description="Manage education records.">
        <div className="space-y-4">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="
                rounded-2xl
                border
                border-border
                p-5
              "
            >
              <div className="grid gap-4">
                <InputField
                  label="Degree"
                  placeholder="Bachelor of Computer Science"
                />

                <InputField label="Institution" placeholder="University Name" />

                <InputField label="Year" placeholder="2024" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Button variant="secondary">Add Degree</Button>
        </div>
      </Card>

      {/* Certificates */}
      <Card
        title="Certificates"
        description="Manage professional certifications."
      >
        <div className="space-y-4">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="
                rounded-2xl
                border
                border-border
                p-5
              "
            >
              <div className="grid gap-4">
                <InputField
                  label="Certificate Name"
                  placeholder="AWS Certified Developer"
                />

                <InputField label="Issuer" placeholder="Amazon Web Services" />

                <InputField label="Year" placeholder="2025" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Button variant="secondary">Add Certificate</Button>
        </div>
      </Card>

      {/* Footer Actions */}
      <Card>
        <div className="flex justify-end gap-4">
          <Button variant="secondary">Reset</Button>

          <Button>Save Changes</Button>
        </div>
      </Card>
    </div>
  );
}
