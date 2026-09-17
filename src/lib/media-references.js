function canonical(value) { return typeof value === "string" ? value.trim().split(/[?#]/, 1)[0] : null; }
export function referencesAsset(value, url) {
  if (typeof value === "string") {
    if (canonical(value) === canonical(url)) return true;
    return Array.from(value.matchAll(/\bsrc\s*=\s*["']([^"']+)["']/gi)).some((match) => canonical(match[1].replaceAll("&amp;", "&")) === canonical(url));
  }
  if (Array.isArray(value)) return value.some((item) => referencesAsset(item, url));
  return value && typeof value === "object" ? Object.values(value).some((item) => referencesAsset(item, url)) : false;
}
export async function isMediaInUse(database, url) {
  const records = await Promise.all([
    database.post.findMany({ where: { OR: [{ featuredImage: { startsWith: canonical(url) } }, { content: { contains: canonical(url) } }] }, select: { featuredImage: true, content: true } }),
    database.heroSection.findUnique({ where: { id: 1 }, include: { logos: true } }),
    database.aboutSection.findUnique({ where: { id: 1 } }),
    database.siteSettings.findUnique({ where: { id: 1 } }),
    database.adminProfile.findUnique({ where: { id: 1 }, select: { avatarUrl: true } }),
  ]);
  return referencesAsset(records, url);
}
