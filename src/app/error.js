"use client";

export default function ErrorPage({ reset }) {
  return (
    <main className="grid min-h-[70vh] place-items-center px-6 text-center">
      <div className="max-w-lg">
        <h1 className="text-3xl font-bold text-heading dark:text-heading-dark">Something went wrong</h1>
        <p className="mt-4 text-text dark:text-text-dark">We could not load this page. Please try again.</p>
        <button type="button" onClick={reset} className="mt-8 rounded-full bg-brand-primary px-6 py-3 font-medium text-white">Try again</button>
      </div>
    </main>
  );
}
