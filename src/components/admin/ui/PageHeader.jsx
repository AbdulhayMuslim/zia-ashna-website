export default function PageHeader({ title, description, actions }) {
  return (
    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h1 className="font-heading text-3xl font-bold text-heading dark:text-heading-dark">
          {title}
        </h1>

        {description && (
          <p className="mt-2 max-w-2xl text-sm text-text dark:text-text-dark">
            {description}
          </p>
        )}
      </div>

      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}
