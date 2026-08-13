import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div className="max-w-lg">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-primary">404</p>
        <h1 className="mt-3 text-4xl font-bold text-heading dark:text-heading-dark">Page not found</h1>
        <p className="mt-4 text-text dark:text-text-dark">The page may have moved or the address may be incorrect.</p>
        <Link className="mt-8 inline-flex rounded-full bg-brand-primary px-6 py-3 font-medium text-white" href="/">Return home</Link>
      </div>
    </main>
  );
}
