import Card from "./Card";

export default function FormSection({
  title,
  description,
  footer,
  children,
  className,
}) {
  return (
    <Card
      title={title}
      description={description}
      footer={footer}
      className={className}
    >
      <div className="space-y-6">{children}</div>
    </Card>
  );
}
