import Button from "./Button";

export default function ActionBar() {
  return (
    <div className="flex justify-end gap-4">
      <Button variant="secondary">Reset</Button>

      <Button>Save Changes</Button>
    </div>
  );
}
