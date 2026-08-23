import { prisma } from "@/lib/prisma";

const orderBy = { sortOrder: "asc" };

export function formatPost(post) {
  return {
    ...post,
    category: post.category?.name ?? "Uncategorized",
    date: post.publishedAt
      ? new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(post.publishedAt)
      : "Not published",
    image: post.featuredImage,
  };
}

export async function getPublishedPosts({ take, skip } = {}) {
  const posts = await prisma.post.findMany({
    where: { status: "published" },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }, { id: "desc" }],
    ...(Number.isInteger(take) ? { take } : {}),
    ...(Number.isInteger(skip) ? { skip } : {}),
    include: { category: true, tags: { include: { tag: true } } },
  });
  return posts.map(formatPost);
}

export function getPublishedPost(slug) {
  return prisma.post.findFirst({
    where: { slug, status: "published" },
    include: { category: true, tags: { include: { tag: true } } },
  });
}

export async function getHomepageContent() {
  const [hero, about, activity, history, contact, settings, posts] = await Promise.all([
    prisma.heroSection.findUnique({ where: { id: 1 }, include: { logos: { orderBy } } }),
    prisma.aboutSection.findUnique({ where: { id: 1 }, include: { experiences: { orderBy }, jobExperiences: { orderBy }, education: { orderBy }, certificates: { orderBy } } }),
    prisma.activitySection.findUnique({ where: { id: 1 }, include: { cards: { orderBy } } }),
    prisma.historySection.findUnique({ where: { id: 1 }, include: { cards: { orderBy } } }),
    prisma.contactSection.findUnique({ where: { id: 1 }, include: { cards: { orderBy }, addresses: { orderBy }, socialLinks: { orderBy } } }),
    getSiteSettings(),
    getPublishedPosts({ take: 4 }),
  ]);
  return { hero, about, activity, history, contact, settings, posts };
}

export function getSiteSettings() {
  return prisma.siteSettings.findUnique({ where: { id: 1 } });
}

export async function getWebsiteChrome() {
  const [settings, contact] = await Promise.all([
    getSiteSettings(),
    prisma.contactSection.findUnique({
      where: { id: 1 },
      select: { socialLinks: { orderBy } },
    }),
  ]);
  return { settings, socialLinks: contact?.socialLinks ?? [] };
}
