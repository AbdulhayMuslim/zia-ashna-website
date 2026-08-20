import ActionBar from "@/components/admin/ui/ActionBar";

export default function PageActions({ children }) {
  return (
    <ActionBar className="sticky bottom-4 z-20 rounded-2xl border border-border bg-card/95 p-4 shadow-xl backdrop-blur dark:bg-gray-800/95">
      {children}
    </ActionBar>
  );
}
