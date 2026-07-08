import Link from "next/link";

export default function DashboardCard({ title, description, href }) {
  return (
    <Link
      href={href}
      className="rounded-xl border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>

      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </Link>
  );
}
