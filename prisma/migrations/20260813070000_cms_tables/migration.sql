-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "slug" VARCHAR(200) NOT NULL,
    "excerpt" VARCHAR(500) NOT NULL,
    "content" TEXT NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'draft',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "featuredImage" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "description" VARCHAR(500),
    "status" VARCHAR(20) NOT NULL DEFAULT 'published',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "description" VARCHAR(500),
    "status" VARCHAR(20) NOT NULL DEFAULT 'published',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostTag" (
    "postId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "PostTag_pkey" PRIMARY KEY ("postId","tagId")
);

-- CreateTable
CREATE TABLE "HeroSection" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "sectionTitle" VARCHAR(120) NOT NULL DEFAULT 'Entrepreneur | Founder',
    "name" VARCHAR(160) NOT NULL DEFAULT 'Sayed Zia Ashna',
    "designation" VARCHAR(240) NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "buttonLabel" VARCHAR(80) NOT NULL DEFAULT 'Get In Touch',
    "buttonUrl" VARCHAR(500) NOT NULL DEFAULT '#contact',
    "heroImageUrl" VARCHAR(1000),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HeroSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroLogo" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(120) NOT NULL DEFAULT '',
    "imageUrl" VARCHAR(1000) NOT NULL,
    "linkUrl" VARCHAR(1000),
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "heroId" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "HeroLogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutSection" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "sectionTitle" VARCHAR(120) NOT NULL DEFAULT 'About Me',
    "role" VARCHAR(160) NOT NULL DEFAULT '',
    "heading" VARCHAR(240) NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperienceCard" (
    "id" SERIAL NOT NULL,
    "number" VARCHAR(40) NOT NULL,
    "title" VARCHAR(160) NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "aboutId" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "ExperienceCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EducationItem" (
    "id" SERIAL NOT NULL,
    "degree" VARCHAR(200) NOT NULL,
    "institution" VARCHAR(200) NOT NULL,
    "year" VARCHAR(40) NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "aboutId" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "EducationItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "issuer" VARCHAR(200),
    "year" VARCHAR(40),
    "url" VARCHAR(1000),
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "aboutId" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivitySection" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "sectionTitle" VARCHAR(120) NOT NULL DEFAULT 'Activity',
    "heading" VARCHAR(240) NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivitySection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityCard" (
    "id" SERIAL NOT NULL,
    "icon" VARCHAR(80) NOT NULL DEFAULT 'Rocket',
    "number" VARCHAR(40) NOT NULL,
    "heading" VARCHAR(160) NOT NULL,
    "description" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "sectionId" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "ActivityCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistorySection" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "sectionTitle" VARCHAR(120) NOT NULL DEFAULT 'History',
    "heading" VARCHAR(240) NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HistorySection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoryCard" (
    "id" SERIAL NOT NULL,
    "icon" VARCHAR(80) NOT NULL DEFAULT 'Rocket',
    "number" VARCHAR(80) NOT NULL,
    "heading" VARCHAR(200) NOT NULL,
    "description" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "sectionId" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "HistoryCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactSection" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "sectionTitle" VARCHAR(120) NOT NULL DEFAULT 'Contact',
    "heading" VARCHAR(240) NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactCard" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "value" VARCHAR(500) NOT NULL DEFAULT '',
    "linkUrl" VARCHAR(1000),
    "icon" VARCHAR(80),
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "sectionId" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "ContactCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactSubmission" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "subject" VARCHAR(150) NOT NULL,
    "message" TEXT NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "siteName" VARCHAR(160) NOT NULL DEFAULT 'Sayed Zia Ashna',
    "siteDescription" TEXT NOT NULL DEFAULT '',
    "logoUrl" VARCHAR(1000),
    "faviconUrl" VARCHAR(1000),
    "contactEmail" VARCHAR(254),
    "phone" VARCHAR(60),
    "address" TEXT,
    "seoTitle" VARCHAR(200),
    "seoDescription" TEXT,
    "facebook" VARCHAR(1000),
    "twitter" VARCHAR(1000),
    "instagram" VARCHAR(1000),
    "linkedin" VARCHAR(1000),
    "youtube" VARCHAR(1000),
    "copyright" VARCHAR(300),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminProfile" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "fullName" VARCHAR(160) NOT NULL DEFAULT '',
    "username" VARCHAR(100) NOT NULL DEFAULT 'admin',
    "email" VARCHAR(254),
    "phone" VARCHAR(60),
    "jobTitle" VARCHAR(160),
    "avatarUrl" VARCHAR(1000),
    "loginAlerts" BOOLEAN NOT NULL DEFAULT true,
    "twoFactor" BOOLEAN NOT NULL DEFAULT false,
    "contentUpdates" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaAsset" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "url" VARCHAR(1000) NOT NULL,
    "mimeType" VARCHAR(120) NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "altText" VARCHAR(300),
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MediaAsset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE INDEX "Post_categoryId_idx" ON "Post"("categoryId");

-- CreateIndex
CREATE INDEX "Post_status_publishedAt_idx" ON "Post"("status", "publishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_slug_key" ON "Tag"("slug");

-- CreateIndex
CREATE INDEX "PostTag_tagId_idx" ON "PostTag"("tagId");

-- CreateIndex
CREATE INDEX "HeroLogo_heroId_sortOrder_idx" ON "HeroLogo"("heroId", "sortOrder");

-- CreateIndex
CREATE INDEX "ExperienceCard_aboutId_sortOrder_idx" ON "ExperienceCard"("aboutId", "sortOrder");

-- CreateIndex
CREATE INDEX "EducationItem_aboutId_sortOrder_idx" ON "EducationItem"("aboutId", "sortOrder");

-- CreateIndex
CREATE INDEX "Certificate_aboutId_sortOrder_idx" ON "Certificate"("aboutId", "sortOrder");

-- CreateIndex
CREATE INDEX "ActivityCard_sectionId_sortOrder_idx" ON "ActivityCard"("sectionId", "sortOrder");

-- CreateIndex
CREATE INDEX "HistoryCard_sectionId_sortOrder_idx" ON "HistoryCard"("sectionId", "sortOrder");

-- CreateIndex
CREATE INDEX "ContactCard_sectionId_sortOrder_idx" ON "ContactCard"("sectionId", "sortOrder");

-- CreateIndex
CREATE INDEX "ContactSubmission_status_createdAt_idx" ON "ContactSubmission"("status", "createdAt");

-- CreateIndex
CREATE INDEX "ContactSubmission_email_idx" ON "ContactSubmission"("email");

-- CreateIndex
CREATE UNIQUE INDEX "MediaAsset_url_key" ON "MediaAsset"("url");

-- CreateIndex
CREATE INDEX "MediaAsset_uploadedAt_idx" ON "MediaAsset"("uploadedAt");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTag" ADD CONSTRAINT "PostTag_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTag" ADD CONSTRAINT "PostTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeroLogo" ADD CONSTRAINT "HeroLogo_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "HeroSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienceCard" ADD CONSTRAINT "ExperienceCard_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "AboutSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EducationItem" ADD CONSTRAINT "EducationItem_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "AboutSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "AboutSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityCard" ADD CONSTRAINT "ActivityCard_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "ActivitySection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryCard" ADD CONSTRAINT "HistoryCard_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "HistorySection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactCard" ADD CONSTRAINT "ContactCard_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "ContactSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
