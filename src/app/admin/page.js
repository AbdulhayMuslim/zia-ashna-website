export default function AdminDashboardPage() {
  const stats = [
    {
      title: "Website Sections",
      value: "6",
      description: "Manage all homepage sections",
    },
    {
      title: "Publications",
      value: "12",
      description: "Published articles & resources",
    },
    {
      title: "Content Blocks",
      value: "48",
      description: "Editable content items",
    },
    {
      title: "Media Files",
      value: "24",
      description: "Images and assets",
    },
  ];

  const sections = [
    {
      title: "Hero Section",
      description: "Manage hero content, image, CTA button and logos.",
      href: "/admin/hero",
    },
    {
      title: "About Section",
      description: "Update profile, education, experience and certificates.",
      href: "/admin/about",
    },
    {
      title: "Activity Section",
      description: "Manage activity statistics and cards.",
      href: "/admin/activity",
    },
    {
      title: "History Section",
      description: "Update timeline and history cards.",
      href: "/admin/history",
    },
    {
      title: "Publications",
      description: "Manage publications and resources.",
      href: "/admin/publications",
    },
    {
      title: "Contact Section",
      description: "Update contact information and cards.",
      href: "/admin/contact",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome to ASHNA CMS. Manage and update your website content from one
          place.
        </p>
      </section>

      {/* Stats */}
      <section>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm
                dark:border-gray-800
                dark:bg-gray-900
              "
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.title}
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {item.value}
              </h2>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section Shortcuts */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          Content Management
        </h2>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sections.map((section) => (
            <a
              key={section.href}
              href={section.href}
              className="
                group
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-6
                transition
                hover:border-brand-primary
                hover:shadow-md
                dark:border-gray-800
                dark:bg-gray-900
              "
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {section.title}
              </h3>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {section.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section
        className="
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-6
          dark:border-gray-800
          dark:bg-gray-900
        "
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h2>

        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Activity logs will appear here once the backend is connected.
        </p>
      </section>

      {/* System Status */}
      <section
        className="
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-6
          dark:border-gray-800
          dark:bg-gray-900
        "
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          System Status
        </h2>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-green-500" />

          <span className="text-sm text-gray-600 dark:text-gray-400">
            CMS Frontend Ready
          </span>
        </div>
      </section>
    </div>
  );
}
