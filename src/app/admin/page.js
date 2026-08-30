import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CircleCheck,
  Clock3,
  Database,
  FilePenLine,
  FolderTree,
  ImageIcon,
  Mail,
  MessageSquareText,
  Plus,
  Tags,
  TrendingUp,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import ViewSectionLink from "@/components/admin/ui/ViewSectionLink";

export const dynamic = "force-dynamic";

const monthFormatter = new Intl.DateTimeFormat("en", { month: "short" });
const dateFormatter = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" });

function monthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function buildMonthlySeries(posts, messages) {
  const now = new Date();
  return Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - 5 + index, 1);
    const key = monthKey(date);
    return {
      key,
      label: monthFormatter.format(date),
      posts: posts.filter((item) => monthKey(item.createdAt) === key).length,
      messages: messages.filter((item) => monthKey(item.createdAt) === key).length,
    };
  });
}

function getDemoData() {
  const now = new Date();
  const ago = (days) => new Date(now.getTime() - days * 86_400_000);
  const monthlyValues = [
    { posts: 3, messages: 6 },
    { posts: 5, messages: 9 },
    { posts: 4, messages: 7 },
    { posts: 8, messages: 13 },
    { posts: 6, messages: 11 },
    { posts: 9, messages: 16 },
  ];

  return {
    totalPosts: 35,
    publishedPosts: 28,
    draftPosts: 7,
    categories: 12,
    tags: 24,
    media: 86,
    messages: 62,
    newMessages: 8,
    configuredSections: 5,
    monthly: monthlyValues.map((values, index) => {
      const date = new Date(now.getFullYear(), now.getMonth() - 5 + index, 1);
      return { key: monthKey(date), label: monthFormatter.format(date), ...values };
    }),
    recentPosts: [
      { id: 1, title: "Building Ventures That Create Long-Term Value", slug: "building-ventures", status: "published", updatedAt: ago(1), category: { name: "Entrepreneurship" } },
      { id: 2, title: "Digital Transformation Starts With Strategy", slug: "digital-transformation", status: "published", updatedAt: ago(3), category: { name: "Technology" } },
      { id: 3, title: "Preparing Your Business for the AI Era", slug: "business-ai-era", status: "draft", updatedAt: ago(4), category: { name: "Artificial Intelligence" } },
      { id: 4, title: "Leading Teams Through Meaningful Change", slug: "leading-teams", status: "published", updatedAt: ago(8), category: { name: "Leadership" } },
    ],
    recentMessages: [
      { id: 1, name: "Farid Ahmad", email: "farid@example.com", subject: "Partnership opportunity", status: "new", createdAt: ago(0) },
      { id: 2, name: "Mina Rahimi", email: "mina@example.com", subject: "Speaking invitation", status: "new", createdAt: ago(2) },
      { id: 3, name: "Omid Khan", email: "omid@example.com", subject: "Technology consultation", status: "read", createdAt: ago(5) },
      { id: 4, name: "Sara Akbari", email: "sara@example.com", subject: "Educational collaboration", status: "read", createdAt: ago(7) },
    ],
  };
}

async function getDashboardData() {
  const since = new Date();
  since.setMonth(since.getMonth() - 5, 1);
  since.setHours(0, 0, 0, 0);

  const [
    totalPosts,
    publishedPosts,
    draftPosts,
    categories,
    tags,
    media,
    messages,
    newMessages,
    recentPosts,
    recentMessages,
    postsInPeriod,
    messagesInPeriod,
    hero,
    about,
    activity,
    history,
    contact,
    settings,
  ] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { status: "published" } }),
    prisma.post.count({ where: { status: "draft" } }),
    prisma.category.count(),
    prisma.tag.count(),
    prisma.mediaAsset.count(),
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { status: "new" } }),
    prisma.post.findMany({ take: 5, orderBy: { updatedAt: "desc" }, select: { id: true, title: true, slug: true, status: true, updatedAt: true, category: { select: { name: true } } } }),
    prisma.contactSubmission.findMany({ take: 5, orderBy: { createdAt: "desc" }, select: { id: true, name: true, email: true, subject: true, status: true, createdAt: true } }),
    prisma.post.findMany({ where: { createdAt: { gte: since } }, select: { createdAt: true } }),
    prisma.contactSubmission.findMany({ where: { createdAt: { gte: since } }, select: { createdAt: true } }),
    prisma.heroSection.count(),
    prisma.aboutSection.count(),
    prisma.activitySection.count(),
    prisma.historySection.count(),
    prisma.contactSection.count(),
    prisma.siteSettings.count(),
  ]);

  const configuredSections = [hero, about, activity, history, contact, settings].filter(Boolean).length;
  return {
    totalPosts, publishedPosts, draftPosts, categories, tags, media, messages, newMessages,
    recentPosts, recentMessages, configuredSections,
    monthly: buildMonthlySeries(postsInPeriod, messagesInPeriod),
  };
}

function MetricCard({ title, value, detail, icon: Icon, tone = "blue" }) {
  const tones = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    green: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    violet: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
  };

  return (
    <article className="rounded-3xl border border-border bg-card p-5 dark:bg-gray-800 shadow-sm ">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-text-muted dark:text-text-muted-dark">{title}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-heading dark:text-heading-dark">{value}</p>
          <p className="mt-2 text-xs text-text-muted dark:text-text-muted-dark">{detail}</p>
        </div>
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </article>
  );
}

function ActivityChart({ data }) {
  const max = Math.max(1, ...data.flatMap((item) => [item.posts, item.messages]));
  return (
    <div className="mt-7 grid h-52 grid-cols-6 items-end gap-3 sm:gap-5">
      {data.map((item) => (
        <div key={item.key} className="flex h-full flex-col justify-end gap-2">
          <div className="flex flex-1 items-end justify-center gap-1.5">
            <div title={`${item.posts} posts`} className="w-3 rounded-t-full bg-brand-primary transition-all sm:w-5" style={{ height: `${Math.max(item.posts ? 12 : 2, (item.posts / max) * 100)}%` }} />
            <div title={`${item.messages} messages`} className="w-3 rounded-t-full bg-violet-400 transition-all dark:bg-violet-500 sm:w-5" style={{ height: `${Math.max(item.messages ? 12 : 2, (item.messages / max) * 100)}%` }} />
          </div>
          <span className="text-center text-xs font-medium text-text-muted dark:text-text-muted-dark">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function EmptyRow({ children }) {
  return <div className="rounded-2xl border border-dashed border-border px-4 py-8 text-center text-sm text-text-muted dark:text-text-muted-dark">{children}</div>;
}

export default async function AdminDashboardPage({ searchParams }) {
  await requireAdmin();
  const params = await searchParams;
  const demoMode = params?.demo === "1";
  let data;
  try {
    data = demoMode ? getDemoData() : await getDashboardData();
  } catch (error) {
    console.error("Dashboard analytics failed:", error);
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-800 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200">
        <h1 className="text-xl font-semibold">Dashboard data is unavailable</h1>
        <p className="mt-2 text-sm">The CMS is running, but PostgreSQL could not return analytics. Check the database connection and refresh this page.</p>
      </div>
    );
  }

  const publishRate = data.totalPosts ? Math.round((data.publishedPosts / data.totalPosts) * 100) : 0;
  const contentTotal = data.totalPosts + data.categories + data.tags + data.media;
  const maxMonthly = Math.max(1, ...data.monthly.map((item) => item.posts + item.messages));
  const currentMonthly = data.monthly.at(-1).posts + data.monthly.at(-1).messages;

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-primary dark:text-brand-secondary">Overview</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-heading dark:text-heading-dark">Dashboard analytics</h1>
          <p className="mt-2 text-sm text-text dark:text-text-dark">Live content, publishing, and audience activity from PostgreSQL.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ViewSectionLink href="/" label="View website" />
          <Link href="/admin/blog/create" className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-brand-primary px-5 text-sm font-semibold text-white transition hover:opacity-90">
            <Plus className="h-4 w-4" /> New post
          </Link>
        </div>
      </header>

      <section aria-labelledby="analytics-heading">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="analytics-heading" className="text-lg font-semibold text-heading dark:text-heading-dark">Analytics</h2>
          <span className="inline-flex items-center gap-2 text-xs text-text-muted dark:text-text-muted-dark"><span className={`h-2 w-2 rounded-full ${demoMode ? "bg-amber-500" : "bg-emerald-500"}`} /> {demoMode ? "Demo data" : "Live database"}</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard title="Total posts" value={data.totalPosts} detail={`${data.publishedPosts} published · ${data.draftPosts} drafts`} icon={BookOpen} />
          <MetricCard title="Publish rate" value={`${publishRate}%`} detail="Share of posts currently public" icon={TrendingUp} tone="green" />
          <MetricCard title="New inquiries" value={data.newMessages} detail={`${data.messages} messages received in total`} icon={MessageSquareText} tone="violet" />
          <MetricCard title="Content assets" value={contentTotal} detail={`${data.categories} categories · ${data.tags} tags · ${data.media} media`} icon={Database} tone="amber" />
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.75fr)]">
          <div className="rounded-3xl border border-border bg-card p-5 dark:bg-gray-800 shadow-sm  sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div><h3 className="font-semibold text-heading dark:text-heading-dark">Six-month activity</h3><p className="mt-1 text-sm text-text-muted dark:text-text-muted-dark">Posts created and contact inquiries received.</p></div>
              <div className="flex items-center gap-4 text-xs text-text-muted dark:text-text-muted-dark"><span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-brand-primary" />Posts</span><span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-violet-400 dark:bg-violet-500" />Messages</span></div>
            </div>
            <ActivityChart data={data.monthly} />
          </div>

          <div className="rounded-3xl border border-border bg-card p-5 dark:bg-gray-800 shadow-sm  sm:p-6">
            <h3 className="font-semibold text-heading dark:text-heading-dark">CMS readiness</h3>
            <p className="mt-1 text-sm text-text-muted dark:text-text-muted-dark">Configured core website sections.</p>
            <div className="mt-6 flex items-center gap-5">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-primary/10 text-2xl font-bold text-brand-primary dark:bg-brand-secondary/10 dark:text-brand-secondary">{Math.round((data.configuredSections / 6) * 100)}%</div>
              <div><p className="font-semibold text-heading dark:text-heading-dark">{data.configuredSections} of 6 ready</p><p className="mt-1 text-xs text-text-muted dark:text-text-muted-dark">Hero, About, Activity, History, Contact, Settings</p></div>
            </div>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-brand-primary dark:bg-brand-secondary" style={{ width: `${(data.configuredSections / 6) * 100}%` }} /></div>
            <p className="mt-4 flex items-center gap-2 text-xs text-text-muted dark:text-text-muted-dark"><TrendingUp className="h-4 w-4 text-emerald-500" /> {currentMonthly} of {maxMonthly} peak monthly actions this month</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-5 dark:bg-gray-800 shadow-sm  sm:p-6">
          <div className="flex items-center justify-between"><div><h2 className="font-semibold text-heading dark:text-heading-dark">Recent posts</h2><p className="mt-1 text-sm text-text-muted dark:text-text-muted-dark">Latest publishing changes.</p></div><Link href="/admin/blog" className="text-sm font-medium text-brand-primary hover:underline dark:text-brand-secondary">View all</Link></div>
          <div className="mt-5 space-y-3">
            {data.recentPosts.length ? data.recentPosts.map((post) => (
              <Link key={post.id} href={`/admin/blog/${post.id}`} className="group flex items-center gap-3 rounded-2xl border border-border p-3 transition hover:border-brand-primary/30 hover:bg-brand-primary/5 dark:border-border dark:hover:border-brand-secondary/30 dark:hover:bg-brand-secondary/5">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${post.status === "published" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"}`}>{post.status === "published" ? <CircleCheck className="h-5 w-5" /> : <Clock3 className="h-5 w-5" />}</span>
                <span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold text-heading dark:text-heading-dark">{post.title}</span><span className="mt-1 block truncate text-xs text-text-muted dark:text-text-muted-dark">{post.category.name} · Updated {dateFormatter.format(post.updatedAt)}</span></span>
                <ArrowRight className="h-4 w-4 text-text-muted transition group-hover:translate-x-0.5 group-hover:text-brand-primary" />
              </Link>
            )) : <EmptyRow>No posts yet. Create the first publication.</EmptyRow>}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-5 dark:bg-gray-800 shadow-sm  sm:p-6">
          <div className="flex items-center justify-between"><div><h2 className="font-semibold text-heading dark:text-heading-dark">Recent inquiries</h2><p className="mt-1 text-sm text-text-muted dark:text-text-muted-dark">Messages submitted through the website.</p></div><span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">{data.newMessages} new</span></div>
          <div className="mt-5 space-y-3">
            {data.recentMessages.length ? data.recentMessages.map((message) => (
              <div key={message.id} className="flex items-center gap-3 rounded-2xl border border-border p-3 dark:border-border">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"><Mail className="h-5 w-5" /></span>
                <span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold text-heading dark:text-heading-dark">{message.subject}</span><span className="mt-1 block truncate text-xs text-text-muted dark:text-text-muted-dark">{message.name} · {dateFormatter.format(message.createdAt)}</span></span>
                {message.status === "new" && <span className="h-2 w-2 shrink-0 rounded-full bg-violet-500" title="New message" />}
              </div>
            )) : <EmptyRow>No contact inquiries have arrived yet.</EmptyRow>}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4"><h2 className="text-lg font-semibold text-heading dark:text-heading-dark">Quick actions</h2><p className="mt-1 text-sm text-text-muted dark:text-text-muted-dark">Common content management tasks.</p></div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { title: "Create post", detail: "Write a new publication", href: "/admin/blog/create", icon: FilePenLine },
            { title: "Add category", detail: "Organize blog content", href: "/admin/categories/create", icon: FolderTree },
            { title: "Manage tags", detail: "Review content labels", href: "/admin/tags", icon: Tags },
            { title: "Media library", detail: "Review stored assets", href: "/admin/media", icon: ImageIcon },
          ].map((action) => (
            <Link key={action.href} href={action.href} className="group flex items-center gap-4 rounded-3xl border border-border bg-card p-5 dark:bg-gray-800 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-primary/40 hover:shadow-md  dark:hover:border-brand-secondary/40">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary dark:bg-brand-secondary/10 dark:text-brand-secondary"><action.icon className="h-5 w-5" /></span>
              <span className="min-w-0 flex-1"><span className="block font-semibold text-heading dark:text-heading-dark">{action.title}</span><span className="mt-1 block text-xs text-text-muted dark:text-text-muted-dark">{action.detail}</span></span>
              <ArrowRight className="h-4 w-4 text-text-muted transition group-hover:translate-x-1 group-hover:text-brand-primary dark:group-hover:text-brand-secondary" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
