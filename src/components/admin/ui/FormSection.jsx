import Card from "./Card";

export default function FormSection({ title, description, children }) {
  return (
    <Card title={title} description={description}>
      {children}
    </Card>
  );
}
