import { prisma } from "@/lib/prisma";

const orderBy = { sortOrder: "asc" };

const readers = {
  hero: () => prisma.heroSection.findUnique({ where: { id: 1 }, include: { logos: { orderBy } } }),
  about: () => prisma.aboutSection.findUnique({ where: { id: 1 }, include: {
    experiences: { orderBy }, jobExperiences: { orderBy }, education: { orderBy }, certificates: { orderBy },
  } }),
  activity: () => prisma.activitySection.findUnique({ where: { id: 1 }, include: { cards: { orderBy } } }),
  history: () => prisma.historySection.findUnique({ where: { id: 1 }, include: { cards: { orderBy } } }),
  contact: () => prisma.contactSection.findUnique({ where: { id: 1 }, include: { cards: { orderBy } } }),
  settings: () => prisma.siteSettings.findUnique({ where: { id: 1 } }),
  profile: () => prisma.adminProfile.findUnique({ where: { id: 1 } }),
};

function orderedCreate(items) {
  return items.map(({ id: _id, sortOrder: _sortOrder, ...item }, index) => ({ ...item, sortOrder: index }));
}

const writers = {
  hero: ({ logos, ...data }) => prisma.heroSection.upsert({
    where: { id: 1 }, create: { id: 1, ...data, logos: { create: orderedCreate(logos) } },
    update: { ...data, logos: { deleteMany: {}, create: orderedCreate(logos) } }, include: { logos: { orderBy } },
  }),
  about: ({ experiences, jobExperiences, education, certificates, ...data }) => prisma.aboutSection.upsert({
    where: { id: 1 }, create: { id: 1, ...data, experiences: { create: orderedCreate(experiences) }, jobExperiences: { create: orderedCreate(jobExperiences) }, education: { create: orderedCreate(education) }, certificates: { create: orderedCreate(certificates) } },
    update: { ...data, experiences: { deleteMany: {}, create: orderedCreate(experiences) }, jobExperiences: { deleteMany: {}, create: orderedCreate(jobExperiences) }, education: { deleteMany: {}, create: orderedCreate(education) }, certificates: { deleteMany: {}, create: orderedCreate(certificates) } },
    include: { experiences: { orderBy }, jobExperiences: { orderBy }, education: { orderBy }, certificates: { orderBy } },
  }),
  activity: ({ cards, ...data }) => prisma.activitySection.upsert({
    where: { id: 1 }, create: { id: 1, ...data, cards: { create: orderedCreate(cards) } },
    update: { ...data, cards: { deleteMany: {}, create: orderedCreate(cards) } }, include: { cards: { orderBy } },
  }),
  history: ({ cards, ...data }) => prisma.historySection.upsert({
    where: { id: 1 }, create: { id: 1, ...data, cards: { create: orderedCreate(cards) } },
    update: { ...data, cards: { deleteMany: {}, create: orderedCreate(cards) } }, include: { cards: { orderBy } },
  }),
  contact: ({ cards, ...data }) => prisma.contactSection.upsert({
    where: { id: 1 }, create: { id: 1, ...data, cards: { create: orderedCreate(cards) } },
    update: { ...data, cards: { deleteMany: {}, create: orderedCreate(cards) } }, include: { cards: { orderBy } },
  }),
  settings: (data) => prisma.siteSettings.upsert({ where: { id: 1 }, create: { id: 1, ...data }, update: data }),
  profile: (data) => prisma.adminProfile.upsert({ where: { id: 1 }, create: { id: 1, ...data }, update: data }),
};

export function isCmsSection(section) {
  return Object.hasOwn(readers, section);
}

export function readCmsSection(section) {
  return readers[section]();
}

export function writeCmsSection(section, data) {
  return writers[section](data);
}
