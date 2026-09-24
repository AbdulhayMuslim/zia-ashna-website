-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `slug` VARCHAR(200) NOT NULL,
    `excerpt` VARCHAR(500) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'draft',
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `featuredImage` VARCHAR(191) NULL,
    `publishedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `categoryId` INTEGER NOT NULL,

    UNIQUE INDEX `Post_slug_key`(`slug`),
    INDEX `Post_categoryId_idx`(`categoryId`),
    INDEX `Post_status_featured_publishedAt_id_idx`(`status`, `featured`, `publishedAt`, `id`),
    INDEX `Post_createdAt_idx`(`createdAt`),
    INDEX `Post_updatedAt_idx`(`updatedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `description` VARCHAR(500) NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'published',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Category_name_key`(`name`),
    UNIQUE INDEX `Category_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `description` VARCHAR(500) NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'published',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Tag_name_key`(`name`),
    UNIQUE INDEX `Tag_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PostTag` (
    `postId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,

    INDEX `PostTag_tagId_idx`(`tagId`),
    PRIMARY KEY (`postId`, `tagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HeroSection` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `sectionTitle` VARCHAR(120) NOT NULL DEFAULT 'Entrepreneur | Founder',
    `name` VARCHAR(160) NOT NULL DEFAULT 'Sayed Zia Ashna',
    `description` TEXT NOT NULL DEFAULT '',
    `buttonLabel` VARCHAR(80) NOT NULL DEFAULT 'Get In Touch',
    `buttonUrl` VARCHAR(500) NOT NULL DEFAULT '#contact',
    `heroImageUrl` VARCHAR(1000) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HeroLogo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) NOT NULL DEFAULT '',
    `imageUrl` VARCHAR(1000) NOT NULL,
    `linkUrl` VARCHAR(1000) NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `heroId` INTEGER NOT NULL DEFAULT 1,

    INDEX `HeroLogo_heroId_sortOrder_idx`(`heroId`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AboutSection` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `sectionTitle` VARCHAR(120) NOT NULL DEFAULT 'About Me',
    `role` VARCHAR(160) NOT NULL DEFAULT '',
    `heading` VARCHAR(240) NOT NULL DEFAULT '',
    `description` TEXT NOT NULL DEFAULT '',
    `imageUrl` VARCHAR(1000) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExperienceCard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` VARCHAR(40) NOT NULL,
    `title` VARCHAR(160) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `aboutId` INTEGER NOT NULL DEFAULT 1,

    INDEX `ExperienceCard_aboutId_sortOrder_idx`(`aboutId`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobExperience` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(160) NOT NULL,
    `institution` VARCHAR(200) NOT NULL,
    `year` VARCHAR(80) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `aboutId` INTEGER NOT NULL DEFAULT 1,

    INDEX `JobExperience_aboutId_sortOrder_idx`(`aboutId`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EducationItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `degree` VARCHAR(200) NOT NULL,
    `institution` VARCHAR(200) NOT NULL,
    `year` VARCHAR(40) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `aboutId` INTEGER NOT NULL DEFAULT 1,

    INDEX `EducationItem_aboutId_sortOrder_idx`(`aboutId`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Certificate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `aboutId` INTEGER NOT NULL DEFAULT 1,

    INDEX `Certificate_aboutId_sortOrder_idx`(`aboutId`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActivitySection` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `sectionTitle` VARCHAR(120) NOT NULL DEFAULT 'Activity',
    `heading` VARCHAR(240) NOT NULL DEFAULT '',
    `description` TEXT NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActivityCard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `icon` VARCHAR(80) NOT NULL DEFAULT 'Rocket',
    `number` VARCHAR(40) NOT NULL,
    `heading` VARCHAR(160) NOT NULL,
    `description` TEXT NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `sectionId` INTEGER NOT NULL DEFAULT 1,

    INDEX `ActivityCard_sectionId_sortOrder_idx`(`sectionId`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistorySection` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `sectionTitle` VARCHAR(120) NOT NULL DEFAULT 'History',
    `heading` VARCHAR(240) NOT NULL DEFAULT '',
    `description` TEXT NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistoryCard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `icon` VARCHAR(80) NOT NULL DEFAULT 'Rocket',
    `number` VARCHAR(80) NOT NULL,
    `heading` VARCHAR(200) NOT NULL,
    `description` TEXT NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `sectionId` INTEGER NOT NULL DEFAULT 1,

    INDEX `HistoryCard_sectionId_sortOrder_idx`(`sectionId`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactSection` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `sectionTitle` VARCHAR(120) NOT NULL DEFAULT 'Contact',
    `heading` VARCHAR(240) NOT NULL DEFAULT '',
    `description` TEXT NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactCard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `icon` VARCHAR(80) NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `sectionId` INTEGER NOT NULL DEFAULT 1,

    INDEX `ContactCard_sectionId_sortOrder_idx`(`sectionId`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactAddress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(120) NOT NULL,
    `value` VARCHAR(500) NOT NULL,
    `icon` VARCHAR(80) NOT NULL DEFAULT 'MapPin',
    `linkUrl` VARCHAR(1000) NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `sectionId` INTEGER NOT NULL DEFAULT 1,

    INDEX `ContactAddress_sectionId_sortOrder_idx`(`sectionId`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactSocialLink` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(100) NOT NULL,
    `icon` VARCHAR(80) NOT NULL DEFAULT 'Globe',
    `url` VARCHAR(1000) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `sectionId` INTEGER NOT NULL DEFAULT 1,

    INDEX `ContactSocialLink_sectionId_sortOrder_idx`(`sectionId`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactSubmission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(254) NOT NULL,
    `subject` VARCHAR(150) NOT NULL,
    `message` TEXT NOT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'new',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ContactSubmission_status_createdAt_idx`(`status`, `createdAt`),
    INDEX `ContactSubmission_createdAt_idx`(`createdAt`),
    INDEX `ContactSubmission_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiteSettings` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `siteName` VARCHAR(160) NOT NULL DEFAULT 'Sayed Zia Ashna',
    `siteDescription` TEXT NOT NULL DEFAULT '',
    `logoUrl` VARCHAR(1000) NULL,
    `faviconUrl` VARCHAR(1000) NULL,
    `contactEmail` VARCHAR(254) NULL,
    `phone` VARCHAR(60) NULL,
    `address` TEXT NULL,
    `seoTitle` VARCHAR(200) NULL,
    `seoDescription` TEXT NULL,
    `facebook` VARCHAR(1000) NULL,
    `twitter` VARCHAR(1000) NULL,
    `instagram` VARCHAR(1000) NULL,
    `linkedin` VARCHAR(1000) NULL,
    `youtube` VARCHAR(1000) NULL,
    `whatsapp` VARCHAR(1000) NULL,
    `copyright` VARCHAR(300) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdminProfile` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `fullName` VARCHAR(160) NOT NULL DEFAULT '',
    `username` VARCHAR(100) NOT NULL DEFAULT 'admin',
    `email` VARCHAR(254) NULL,
    `phone` VARCHAR(60) NULL,
    `jobTitle` VARCHAR(160) NULL,
    `avatarUrl` VARCHAR(1000) NULL,
    `loginAlerts` BOOLEAN NOT NULL DEFAULT true,
    `twoFactor` BOOLEAN NOT NULL DEFAULT false,
    `contentUpdates` BOOLEAN NOT NULL DEFAULT true,
    `passwordHash` VARCHAR(128) NULL,
    `passwordSalt` VARCHAR(64) NULL,
    `passwordChangedAt` DATETIME(3) NULL,
    `sessionVersion` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PasswordResetToken` (
    `tokenHash` VARCHAR(64) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `PasswordResetToken_expiresAt_idx`(`expiresAt`),
    PRIMARY KEY (`tokenHash`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MediaAsset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `url` VARCHAR(1000) NOT NULL,
    `mimeType` VARCHAR(120) NOT NULL,
    `sizeBytes` INTEGER NOT NULL,
    `altText` VARCHAR(300) NULL,
    `uploadedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `MediaAsset_uploadedAt_idx`(`uploadedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RateLimitEvent` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `scope` VARCHAR(80) NOT NULL,
    `keyHash` VARCHAR(64) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `RateLimitEvent_scope_keyHash_createdAt_idx`(`scope`, `keyHash`, `createdAt`),
    INDEX `RateLimitEvent_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RateLimitBucket` (
    `scope` VARCHAR(80) NOT NULL,
    `keyHash` VARCHAR(64) NOT NULL,
    `windowStart` DATETIME(3) NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 0,
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `RateLimitBucket_updatedAt_idx`(`updatedAt`),
    PRIMARY KEY (`scope`, `keyHash`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostTag` ADD CONSTRAINT `PostTag_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostTag` ADD CONSTRAINT `PostTag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HeroLogo` ADD CONSTRAINT `HeroLogo_heroId_fkey` FOREIGN KEY (`heroId`) REFERENCES `HeroSection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExperienceCard` ADD CONSTRAINT `ExperienceCard_aboutId_fkey` FOREIGN KEY (`aboutId`) REFERENCES `AboutSection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobExperience` ADD CONSTRAINT `JobExperience_aboutId_fkey` FOREIGN KEY (`aboutId`) REFERENCES `AboutSection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EducationItem` ADD CONSTRAINT `EducationItem_aboutId_fkey` FOREIGN KEY (`aboutId`) REFERENCES `AboutSection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Certificate` ADD CONSTRAINT `Certificate_aboutId_fkey` FOREIGN KEY (`aboutId`) REFERENCES `AboutSection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityCard` ADD CONSTRAINT `ActivityCard_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `ActivitySection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoryCard` ADD CONSTRAINT `HistoryCard_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `HistorySection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContactCard` ADD CONSTRAINT `ContactCard_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `ContactSection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContactAddress` ADD CONSTRAINT `ContactAddress_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `ContactSection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContactSocialLink` ADD CONSTRAINT `ContactSocialLink_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `ContactSection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

