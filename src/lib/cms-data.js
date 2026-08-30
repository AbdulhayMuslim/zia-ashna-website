import { prisma } from "@/lib/prisma";

const orderBy = { sortOrder: "asc" };
const sectionModels = {
  hero: "heroSection", about: "aboutSection", activity: "activitySection",
  history: "historySection", contact: "contactSection", settings: "siteSettings", profile: "adminProfile",
};
const profileSelect = {
  id: true, fullName: true, username: true, email: true, phone: true, jobTitle: true, avatarUrl: true,
  loginAlerts: true, twoFactor: true, contentUpdates: true, createdAt: true, updatedAt: true,
};

const readers = {
  hero: () => prisma.heroSection.findUnique({ where: { id: 1 }, include: { logos: { orderBy } } }),
  about: () => prisma.aboutSection.findUnique({ where: { id: 1 }, include: {
    experiences: { orderBy }, jobExperiences: { orderBy }, education: { orderBy }, certificates: { orderBy },
  } }),
  activity: () => prisma.activitySection.findUnique({ where: { id: 1 }, include: { cards: { orderBy } } }),
  history: () => prisma.historySection.findUnique({ where: { id: 1 }, include: { cards: { orderBy } } }),
  contact: () => prisma.contactSection.findUnique({ where: { id: 1 }, include: {
    cards: { orderBy }, addresses: { orderBy }, socialLinks: { orderBy },
  } }),
  settings: () => prisma.siteSettings.findUnique({ where: { id: 1 } }),
  profile: () => prisma.adminProfile.findUnique({ where: { id: 1 }, select: profileSelect }),
};

function orderedCreate(items) {
  return items.map(({ id: _id, sortOrder: _sortOrder, ...item }, index) => ({ ...item, sortOrder: index }));
}

const writers = {
  hero: (db, { logos, ...data }) => db.heroSection.upsert({
    where: { id: 1 }, create: { id: 1, ...data, logos: { create: orderedCreate(logos) } },
    update: { ...data, logos: { deleteMany: {}, create: orderedCreate(logos) } }, include: { logos: { orderBy } },
  }),
  about: (db, { experiences, jobExperiences, education, certificates, ...data }) => db.aboutSection.upsert({
    where: { id: 1 }, create: { id: 1, ...data, experiences: { create: orderedCreate(experiences) }, jobExperiences: { create: orderedCreate(jobExperiences) }, education: { create: orderedCreate(education) }, certificates: { create: orderedCreate(certificates) } },
    update: { ...data, experiences: { deleteMany: {}, create: orderedCreate(experiences) }, jobExperiences: { deleteMany: {}, create: orderedCreate(jobExperiences) }, education: { deleteMany: {}, create: orderedCreate(education) }, certificates: { deleteMany: {}, create: orderedCreate(certificates) } },
    include: { experiences: { orderBy }, jobExperiences: { orderBy }, education: { orderBy }, certificates: { orderBy } },
  }),
  activity: (db, { cards, ...data }) => db.activitySection.upsert({
    where: { id: 1 }, create: { id: 1, ...data, cards: { create: orderedCreate(cards) } },
    update: { ...data, cards: { deleteMany: {}, create: orderedCreate(cards) } }, include: { cards: { orderBy } },
  }),
  history: (db, { cards, ...data }) => db.historySection.upsert({
    where: { id: 1 }, create: { id: 1, ...data, cards: { create: orderedCreate(cards) } },
    update: { ...data, cards: { deleteMany: {}, create: orderedCreate(cards) } }, include: { cards: { orderBy } },
  }),
  contact: (db, { cards, addresses, socialLinks, ...data }) => db.contactSection.upsert({
    where: { id: 1 },
    create: { id: 1, ...data, cards: { create: orderedCreate(cards) }, addresses: { create: orderedCreate(addresses) }, socialLinks: { create: orderedCreate(socialLinks) } },
    update: { ...data, cards: { deleteMany: {}, create: orderedCreate(cards) }, addresses: { deleteMany: {}, create: orderedCreate(addresses) }, socialLinks: { deleteMany: {}, create: orderedCreate(socialLinks) } },
    include: { cards: { orderBy }, addresses: { orderBy }, socialLinks: { orderBy } },
  }),
  settings: (db, data) => db.siteSettings.upsert({ where: { id: 1 }, create: { id: 1, ...data }, update: data }),
  profile: (db, data) => db.adminProfile.upsert({ where: { id: 1 }, create: { id: 1, ...data }, update: data, select: profileSelect }),
};

export function isCmsSection(section) {
  return Object.hasOwn(readers, section);
}

export function readCmsSection(section) {
  return readers[section]();
}

export function writeCmsSection(section, data) {
  const { expectedUpdatedAt, ...safeData } = data;
  return prisma.$transaction(async (tx) => {
    if (expectedUpdatedAt) {
      const current = await tx[sectionModels[section]].findUnique({ where: { id: 1 }, select: { updatedAt: true } });
      if (current?.updatedAt.toISOString() !== expectedUpdatedAt) throw new Error("CMS_WRITE_CONFLICT");
    }
    return writers[section](tx, safeData);
  }, { isolationLevel: "Serializable" });
}
