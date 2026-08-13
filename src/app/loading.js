export default function Loading() {
  return (
    <div className="grid min-h-[50vh] place-items-center" role="status" aria-live="polite">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-brand-primary/20 border-t-brand-primary" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
