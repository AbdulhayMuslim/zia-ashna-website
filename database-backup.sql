/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.8.8-MariaDB, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: zia_ashna
-- ------------------------------------------------------
-- Server version	11.8.8-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `AboutSection`
--

DROP TABLE IF EXISTS `AboutSection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `AboutSection` (
  `id` int(11) NOT NULL DEFAULT 1,
  `sectionTitle` varchar(120) NOT NULL DEFAULT 'About Me',
  `role` varchar(160) NOT NULL DEFAULT '',
  `heading` varchar(240) NOT NULL DEFAULT '',
  `description` text NOT NULL DEFAULT '',
  `imageUrl` varchar(1000) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AboutSection`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `AboutSection` WRITE;
/*!40000 ALTER TABLE `AboutSection` DISABLE KEYS */;
INSERT INTO `AboutSection` VALUES
(1,'About Me','Entrepreneur • Founder • Business Leader','Sayed Zia ASHNA','Sayed Zia Ashna is an entrepreneur, founder, and business leader with a strong background in technology, education, and digital innovation. With experience spanning academia, government institutions, and private sector ventures, he has dedicated his career to building impactful organizations, empowering communities, and creating sustainable opportunities through technology and entrepreneurship.','/images/cms/zia-ashna-profile.webp','2026-08-22 07:24:31.159','2026-08-22 10:02:53.240');
/*!40000 ALTER TABLE `AboutSection` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `ActivityCard`
--

DROP TABLE IF EXISTS `ActivityCard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ActivityCard` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `icon` varchar(80) NOT NULL DEFAULT 'Rocket',
  `number` varchar(40) NOT NULL,
  `heading` varchar(160) NOT NULL,
  `description` text NOT NULL,
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `sectionId` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `ActivityCard_sectionId_sortOrder_idx` (`sectionId`,`sortOrder`),
  CONSTRAINT `ActivityCard_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `ActivitySection` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ActivityCard`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `ActivityCard` WRITE;
/*!40000 ALTER TABLE `ActivityCard` DISABLE KEYS */;
INSERT INTO `ActivityCard` VALUES
(19,'Rocket','01','Entrepreneurship','Building ventures that create value, solve problems, and scale through innovation and leadership.',0,1),
(20,'Handshake','02','Business Development','Creating partnerships that unlock opportunities, growth, and expansion.',1,1),
(21,'TrendingUp','03','Strategic Growth','Developing strategies that strengthen performance, growth, and resilience.',2,1),
(22,'Lightbulb','04','Innovation','Transforming ideas into solutions that drive progress and meaningful differentiation.',3,1),
(23,'Crown','05','Leadership','Guiding teams with vision, purpose, accountability, and operational excellence.',4,1),
(24,'Banknote','06','Investment','Building alliances and investments that accelerate growth and success.',5,1);
/*!40000 ALTER TABLE `ActivityCard` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `ActivitySection`
--

DROP TABLE IF EXISTS `ActivitySection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ActivitySection` (
  `id` int(11) NOT NULL DEFAULT 1,
  `sectionTitle` varchar(120) NOT NULL DEFAULT 'Activity',
  `heading` varchar(240) NOT NULL DEFAULT '',
  `description` text NOT NULL DEFAULT '',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ActivitySection`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `ActivitySection` WRITE;
/*!40000 ALTER TABLE `ActivitySection` DISABLE KEYS */;
INSERT INTO `ActivitySection` VALUES
(1,'Activity','Focus Areas of Activities','','2026-08-22 07:24:31.172','2026-08-30 06:03:15.438');
/*!40000 ALTER TABLE `ActivitySection` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `AdminProfile`
--

DROP TABLE IF EXISTS `AdminProfile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `AdminProfile` (
  `id` int(11) NOT NULL DEFAULT 1,
  `fullName` varchar(160) NOT NULL DEFAULT '',
  `username` varchar(100) NOT NULL DEFAULT 'admin',
  `email` varchar(254) DEFAULT NULL,
  `phone` varchar(60) DEFAULT NULL,
  `jobTitle` varchar(160) DEFAULT NULL,
  `avatarUrl` varchar(1000) DEFAULT NULL,
  `loginAlerts` tinyint(1) NOT NULL DEFAULT 1,
  `twoFactor` tinyint(1) NOT NULL DEFAULT 0,
  `contentUpdates` tinyint(1) NOT NULL DEFAULT 1,
  `passwordHash` varchar(128) DEFAULT NULL,
  `passwordSalt` varchar(64) DEFAULT NULL,
  `passwordChangedAt` datetime(3) DEFAULT NULL,
  `sessionVersion` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AdminProfile`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `AdminProfile` WRITE;
/*!40000 ALTER TABLE `AdminProfile` DISABLE KEYS */;
INSERT INTO `AdminProfile` VALUES
(1,'Sayed Zia Ashna','ashna','zia@ashna.af','','Administrator','/uploads/a9f7d3cc-09a8-4891-95a7-1b7b5dcba77c.jpg',1,0,1,'390ea5bc693da1265c744713078387e07f9102ff10b2b690af1ea014da228c228d779f906e9bfa96902015b33613c2130306ca4dd2f10d38997a7605787a6ca4','a39f3f54f024eeae98181c6162c75d3b','2026-09-17 10:07:45.230',1,'2026-08-20 07:34:52.915','2026-09-23 11:30:12.508');
/*!40000 ALTER TABLE `AdminProfile` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'published',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Category_name_key` (`name`),
  UNIQUE KEY `Category_slug_key` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES
(3,'Tech','tech','','published','2026-08-20 11:09:47.432','2026-08-20 11:09:47.432'),
(5,'Education','education','','published','2026-08-20 11:10:02.600','2026-08-22 07:24:27.765'),
(6,'Business','business','','published','2026-08-20 11:10:21.304','2026-08-22 07:24:28.360'),
(7,'Entrepreneurship','entrepreneurship',NULL,'published','2026-08-22 07:24:26.697','2026-08-22 07:24:26.697'),
(8,'Technology','technology',NULL,'published','2026-08-22 07:24:26.991','2026-08-22 07:24:26.991'),
(9,'Leadership','leadership',NULL,'published','2026-08-22 07:24:27.078','2026-08-22 07:24:27.078'),
(10,'AI','ai',NULL,'published','2026-08-22 07:24:27.473','2026-08-22 07:24:27.473'),
(11,'Startups','startups',NULL,'published','2026-08-22 07:24:28.058','2026-08-22 07:24:28.058'),
(12,'Marketing','marketing',NULL,'published','2026-08-22 07:24:28.622','2026-08-22 07:24:28.622'),
(13,'Development','development',NULL,'published','2026-08-22 07:24:28.905','2026-08-22 07:24:28.905'),
(14,'Innovation','innovation',NULL,'published','2026-08-22 07:24:29.191','2026-08-22 07:24:29.191'),
(15,'Productivity','productivity',NULL,'published','2026-08-22 07:24:29.534','2026-08-22 07:24:29.534'),
(16,'Strategy','strategy',NULL,'published','2026-08-22 07:24:29.789','2026-08-22 07:24:29.789');
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `Certificate`
--

DROP TABLE IF EXISTS `Certificate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Certificate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `aboutId` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `Certificate_aboutId_sortOrder_idx` (`aboutId`,`sortOrder`),
  CONSTRAINT `Certificate_aboutId_fkey` FOREIGN KEY (`aboutId`) REFERENCES `AboutSection` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Certificate`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `Certificate` WRITE;
/*!40000 ALTER TABLE `Certificate` DISABLE KEYS */;
INSERT INTO `Certificate` VALUES
(9,'MCITP',0,1),
(10,'CCNA',1,1),
(11,'CCNP',2,1),
(12,'AWS Professional',3,1);
/*!40000 ALTER TABLE `Certificate` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `ContactAddress`
--

DROP TABLE IF EXISTS `ContactAddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ContactAddress` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(120) NOT NULL,
  `value` varchar(500) NOT NULL,
  `icon` varchar(80) NOT NULL DEFAULT 'MapPin',
  `linkUrl` varchar(1000) DEFAULT NULL,
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `sectionId` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `ContactAddress_sectionId_sortOrder_idx` (`sectionId`,`sortOrder`),
  CONSTRAINT `ContactAddress_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `ContactSection` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ContactAddress`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `ContactAddress` WRITE;
/*!40000 ALTER TABLE `ContactAddress` DISABLE KEYS */;
/*!40000 ALTER TABLE `ContactAddress` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `ContactCard`
--

DROP TABLE IF EXISTS `ContactCard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ContactCard` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `icon` varchar(80) DEFAULT NULL,
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `sectionId` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `ContactCard_sectionId_sortOrder_idx` (`sectionId`,`sortOrder`),
  CONSTRAINT `ContactCard_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `ContactSection` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ContactCard`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `ContactCard` WRITE;
/*!40000 ALTER TABLE `ContactCard` DISABLE KEYS */;
INSERT INTO `ContactCard` VALUES
(21,'Application','CheckCircle',0,1),
(22,'Evaluation','CheckCircle',1,1),
(23,'Shortlisting','CheckCircle',2,1),
(24,'Interview','CheckCircle',3,1),
(25,'Internship','CheckCircle',4,1),
(26,'Staff','CheckCircle',5,1);
/*!40000 ALTER TABLE `ContactCard` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `ContactSection`
--

DROP TABLE IF EXISTS `ContactSection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ContactSection` (
  `id` int(11) NOT NULL DEFAULT 1,
  `sectionTitle` varchar(120) NOT NULL DEFAULT 'Contact',
  `heading` varchar(240) NOT NULL DEFAULT '',
  `description` text NOT NULL DEFAULT '',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ContactSection`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `ContactSection` WRITE;
/*!40000 ALTER TABLE `ContactSection` DISABLE KEYS */;
INSERT INTO `ContactSection` VALUES
(1,'You Want To Work With Us?','Recruitment Process','Our recruitment process is simple, transparent, and designed to help us find the right talent while providing a smooth experience for every candidate.','2026-08-18 07:10:34.135','2026-08-22 11:01:42.091');
/*!40000 ALTER TABLE `ContactSection` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `ContactSocialLink`
--

DROP TABLE IF EXISTS `ContactSocialLink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ContactSocialLink` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(100) NOT NULL,
  `icon` varchar(80) NOT NULL DEFAULT 'Globe',
  `url` varchar(1000) NOT NULL,
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `sectionId` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `ContactSocialLink_sectionId_sortOrder_idx` (`sectionId`,`sortOrder`),
  CONSTRAINT `ContactSocialLink_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `ContactSection` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ContactSocialLink`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `ContactSocialLink` WRITE;
/*!40000 ALTER TABLE `ContactSocialLink` DISABLE KEYS */;
INSERT INTO `ContactSocialLink` VALUES
(14,'Facebook','Facebook','#',0,1),
(15,'Instagram','Instagram','#',1,1),
(16,'LinkedIn','LinkedIn','#',2,1),
(17,'WhatsApp','WhatsApp','#',3,1);
/*!40000 ALTER TABLE `ContactSocialLink` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `ContactSubmission`
--

DROP TABLE IF EXISTS `ContactSubmission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ContactSubmission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(254) NOT NULL,
  `subject` varchar(150) NOT NULL,
  `message` text NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'new',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  KEY `ContactSubmission_status_createdAt_idx` (`status`,`createdAt`),
  KEY `ContactSubmission_createdAt_idx` (`createdAt`),
  KEY `ContactSubmission_email_idx` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ContactSubmission`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `ContactSubmission` WRITE;
/*!40000 ALTER TABLE `ContactSubmission` DISABLE KEYS */;
INSERT INTO `ContactSubmission` VALUES
(2,'ahmad','test@example.com','a','test msg 2 sent to test contact form.','read','2026-08-22 11:03:37.286'),
(3,'Amu Venture','ventureamu@gmail.com','test','AJFPIEHF8OYFLAWHCKJBVKZVK;NV;OIWJF\'WJEFPWJFAWHAEVB;OANVAFIFP9HAEFO;AWF;OAIONVKZVKJLZBLJBDILABFUYAGFQPGFAIGBVUDBV,ZBV,ZNBVLBVLIWABP9UGEFUAWGFIWABVLIBVJBZVBZLBVLISHIOQHFQP9HFPHIUELABVLIEBVIAUHPIAUFIUAEVILBLJKBJLVBLJZBKLBVLBIUOAEFPAWEFAVBIAEBVAUIEBUAIWHFAWHEFIAWHEFIAUBVALJBVDJLBVLIABVIAWBEVIWABIAW','read','2026-08-22 11:04:35.545'),
(4,'Kabul Qadim','kabulqadim30@gmail.com','test1','test msg one sent to new set ashna email.','read','2026-09-23 11:36:35.662');
/*!40000 ALTER TABLE `ContactSubmission` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `EducationItem`
--

DROP TABLE IF EXISTS `EducationItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `EducationItem` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `degree` varchar(200) NOT NULL,
  `institution` varchar(200) NOT NULL,
  `year` varchar(40) NOT NULL,
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `aboutId` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `EducationItem_aboutId_sortOrder_idx` (`aboutId`,`sortOrder`),
  CONSTRAINT `EducationItem_aboutId_fkey` FOREIGN KEY (`aboutId`) REFERENCES `AboutSection` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EducationItem`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `EducationItem` WRITE;
/*!40000 ALTER TABLE `EducationItem` DISABLE KEYS */;
INSERT INTO `EducationItem` VALUES
(5,'Master of Science (MSc) in Data Science','University of East London (UEL)','2026',0,1),
(6,'Bachelor of Computer Science','Balkh University, Afghanistan','2015',1,1);
/*!40000 ALTER TABLE `EducationItem` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `ExperienceCard`
--

DROP TABLE IF EXISTS `ExperienceCard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ExperienceCard` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` varchar(40) NOT NULL,
  `title` varchar(160) NOT NULL,
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `aboutId` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `ExperienceCard_aboutId_sortOrder_idx` (`aboutId`,`sortOrder`),
  CONSTRAINT `ExperienceCard_aboutId_fkey` FOREIGN KEY (`aboutId`) REFERENCES `AboutSection` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ExperienceCard`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `ExperienceCard` WRITE;
/*!40000 ALTER TABLE `ExperienceCard` DISABLE KEYS */;
INSERT INTO `ExperienceCard` VALUES
(7,'5+','Years Teaching',0,1),
(8,'4','Institutions',1,1),
(9,'2','Degrees',2,1);
/*!40000 ALTER TABLE `ExperienceCard` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `HeroLogo`
--

DROP TABLE IF EXISTS `HeroLogo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `HeroLogo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(120) NOT NULL DEFAULT '',
  `imageUrl` varchar(1000) NOT NULL,
  `linkUrl` varchar(1000) DEFAULT NULL,
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `heroId` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `HeroLogo_heroId_sortOrder_idx` (`heroId`,`sortOrder`),
  CONSTRAINT `HeroLogo_heroId_fkey` FOREIGN KEY (`heroId`) REFERENCES `HeroSection` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HeroLogo`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `HeroLogo` WRITE;
/*!40000 ALTER TABLE `HeroLogo` DISABLE KEYS */;
INSERT INTO `HeroLogo` VALUES
(47,'Microasan','/images/cms/microasan.webp','https://microasan.com/',0,1),
(48,'Tawangar','/images/cms/tawangar.webp','https://tawangar.com/',1,1),
(49,'Hamkar','/images/cms/hamkar.webp','https://hamkar.edu.af/',2,1),
(50,'Asan Technology','/images/cms/asan-technology.webp','https://asantech.net/',3,1),
(51,'Global Vision','/images/cms/hamkar.webp','https://globalvision.com',4,1);
/*!40000 ALTER TABLE `HeroLogo` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `HeroSection`
--

DROP TABLE IF EXISTS `HeroSection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `HeroSection` (
  `id` int(11) NOT NULL DEFAULT 1,
  `sectionTitle` varchar(120) NOT NULL DEFAULT 'Entrepreneur | Founder',
  `name` varchar(160) NOT NULL DEFAULT 'Sayed Zia Ashna',
  `description` text NOT NULL DEFAULT '',
  `buttonLabel` varchar(80) NOT NULL DEFAULT 'Get In Touch',
  `buttonUrl` varchar(500) NOT NULL DEFAULT '#contact',
  `heroImageUrl` varchar(1000) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HeroSection`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `HeroSection` WRITE;
/*!40000 ALTER TABLE `HeroSection` DISABLE KEYS */;
INSERT INTO `HeroSection` VALUES
(1,'Entrepreneur | Founder','Sayed Zia Ashna','Co-Founder @ Asan Technology, Microasan Technology, Tawangar Educational Consultancy and Hamkar Educational Consultancy.','Get In Touch','#contact','/images/cms/zia-ashna.webp','2026-08-30 10:29:14.762','2026-09-24 07:15:04.934');
/*!40000 ALTER TABLE `HeroSection` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `HistoryCard`
--

DROP TABLE IF EXISTS `HistoryCard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `HistoryCard` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `icon` varchar(80) NOT NULL DEFAULT 'Rocket',
  `number` varchar(80) NOT NULL,
  `heading` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `sectionId` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `HistoryCard_sectionId_sortOrder_idx` (`sectionId`,`sortOrder`),
  CONSTRAINT `HistoryCard_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `HistorySection` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HistoryCard`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `HistoryCard` WRITE;
/*!40000 ALTER TABLE `HistoryCard` DISABLE KEYS */;
INSERT INTO `HistoryCard` VALUES
(32,'Rocket','20+ Projects','Founded Asan Technology','Started a technology company focused on helping businesses grow through modern digital solutions, software development, and digital transformation.',0,1),
(33,'GraduationCap','500+ Students Reached','Educational Impact','Built educational consultancy ventures dedicated to helping students discover better academic and career opportunities.',1,1),
(34,'Handshake','Growing Business Network','Strategic Partnerships','Established long term partnerships and collaborations across industries, creating sustainable opportunities and growth.',2,1),
(35,'Sparkles','Innovation & New Ventures','Building The Future','Continuously exploring new opportunities, investing in innovation, and creating ventures that generate long-term impact.',3,1);
/*!40000 ALTER TABLE `HistoryCard` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `HistorySection`
--

DROP TABLE IF EXISTS `HistorySection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `HistorySection` (
  `id` int(11) NOT NULL DEFAULT 1,
  `sectionTitle` varchar(120) NOT NULL DEFAULT 'History',
  `heading` varchar(240) NOT NULL DEFAULT '',
  `description` text NOT NULL DEFAULT '',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HistorySection`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `HistorySection` WRITE;
/*!40000 ALTER TABLE `HistorySection` DISABLE KEYS */;
INSERT INTO `HistorySection` VALUES
(1,'History','Founder Journey','A path shaped by entrepreneurship, innovation, technology, and creating opportunities for others.','2026-08-22 07:24:31.180','2026-09-24 07:16:51.174');
/*!40000 ALTER TABLE `HistorySection` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `JobExperience`
--

DROP TABLE IF EXISTS `JobExperience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `JobExperience` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(160) NOT NULL,
  `institution` varchar(200) NOT NULL,
  `year` varchar(80) NOT NULL,
  `sortOrder` int(11) NOT NULL DEFAULT 0,
  `aboutId` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `JobExperience_aboutId_sortOrder_idx` (`aboutId`,`sortOrder`),
  CONSTRAINT `JobExperience_aboutId_fkey` FOREIGN KEY (`aboutId`) REFERENCES `AboutSection` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `JobExperience`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `JobExperience` WRITE;
/*!40000 ALTER TABLE `JobExperience` DISABLE KEYS */;
INSERT INTO `JobExperience` VALUES
(7,'University Professor','4+ Universities','5+ Years',0,1),
(8,'Advisor, IT Administration','National Statistics & Information Authority','2018 - 2020',1,1),
(9,'Director of Telecommunications','Panjshir Province, Afghanistan','2021',2,1);
/*!40000 ALTER TABLE `JobExperience` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `MediaAsset`
--

DROP TABLE IF EXISTS `MediaAsset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `MediaAsset` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `url` varchar(1000) NOT NULL,
  `mimeType` varchar(120) NOT NULL,
  `sizeBytes` int(11) NOT NULL,
  `altText` varchar(300) DEFAULT NULL,
  `uploadedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  KEY `MediaAsset_uploadedAt_idx` (`uploadedAt`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MediaAsset`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `MediaAsset` WRITE;
/*!40000 ALTER TABLE `MediaAsset` DISABLE KEYS */;
INSERT INTO `MediaAsset` VALUES
(2,'zia ashna.webp','/uploads/d60319fa-7b88-4276-8901-a9813938d0c7.webp','image/webp',218216,NULL,'2026-08-16 07:29:51.587'),
(7,'profile.jpg','/uploads/a9f7d3cc-09a8-4891-95a7-1b7b5dcba77c.jpg','image/jpeg',365162,NULL,'2026-08-20 08:58:41.129'),
(9,'how-building-multiple-ventures.webp','/images/posts/how-building-multiple-ventures.webp','image/webp',85586,'How Building Multiple Ventures Creates Long Term Value','2026-08-22 07:24:26.656'),
(10,'digital-transformation-strategy.webp','/images/posts/digital-transformation-strategy.webp','image/webp',72866,'Digital Transformation Starts With Strategy','2026-08-22 07:24:26.982'),
(11,'leading-teams-through-change.webp','/images/posts/leading-teams-through-change.webp','image/webp',74296,'Leading Teams Through Change','2026-08-22 07:24:27.075'),
(12,'future-of-artificial-intelligence.webp','/images/posts/future-of-artificial-intelligence.webp','image/webp',74916,'Preparing Your Business for the AI Era','2026-08-22 07:24:27.470'),
(13,'learning-drives-innovation.webp','/images/posts/learning-drives-innovation.webp','image/webp',109364,'Why Continuous Learning Drives Innovation','2026-08-22 07:24:27.760'),
(14,'building-a-startup-culture.webp','/images/posts/building-a-startup-culture.webp','image/webp',120586,'Building a Startup Culture That Lasts','2026-08-22 07:24:28.049'),
(15,'customer-experience-drives-growth.webp','/images/posts/customer-experience-drives-growth.webp','image/webp',143484,'Why Customer Experience Is Your Greatest Competitive Advantage','2026-08-22 07:24:28.351'),
(16,'digital-marketing-that-builds-trust.webp','/images/posts/digital-marketing-that-builds-trust.webp','image/webp',93386,'Digital Marketing That Builds Lasting Trust','2026-08-22 07:24:28.619'),
(17,'importance-of-professional-networking.webp','/images/posts/importance-of-professional-networking.webp','image/webp',95972,'The Importance of Building Professional Networks','2026-08-22 07:24:28.896'),
(18,'innovation-through-collaboration.webp','/images/posts/innovation-through-collaboration.webp','image/webp',93974,'Innovation Thrives Through Collaboration','2026-08-22 07:24:29.182'),
(19,'small-habits-big-results.webp','/images/posts/small-habits-big-results.webp','image/webp',195966,'Small Daily Habits That Produce Big Results','2026-08-22 07:24:29.528'),
(20,'building-businesses-for-the-future.webp','/images/posts/building-businesses-for-the-future.webp','image/webp',45924,'Building Businesses That Are Ready for the Future','2026-08-22 07:24:29.780'),
(21,'zia-ashna.webp','/images/cms/zia-ashna.webp','image/webp',175774,NULL,'2026-08-22 07:24:30.563'),
(22,'zia-ashna-profile.webp','/images/cms/zia-ashna-profile.webp','image/webp',210480,NULL,'2026-08-22 07:24:30.895'),
(23,'hamkar.webp','/images/cms/hamkar.webp','image/webp',5440,NULL,'2026-08-22 07:24:30.929'),
(24,'microasan.webp','/images/cms/microasan.webp','image/webp',21860,NULL,'2026-08-22 07:24:30.934'),
(25,'tawangar.webp','/images/cms/tawangar.webp','image/webp',55004,NULL,'2026-08-22 07:24:31.097'),
(26,'asan-technology.webp','/images/cms/asan-technology.webp','image/webp',50118,NULL,'2026-08-22 07:24:31.129'),
(27,'ChatGPT Image Aug 18, 2026, 06_39_45 PM.png','/uploads/1ac89f9d-cb23-4ada-a5a2-106db4dcdebb.webp','image/webp',255058,NULL,'2026-08-22 08:07:54.960'),
(28,'Global Vision Logo Red Color.png','/uploads/907c1128-8b12-4a87-9b5c-0b75074f5c84.png','image/png',49197,NULL,'2026-09-23 06:07:47.358'),
(29,'1.png','/uploads/f76f3186-60c6-471a-ad01-15b39045c958.png','image/png',125663,NULL,'2026-09-23 06:20:03.825'),
(30,'1.png','/uploads/41def291-f364-4df7-8d93-c516cccee131.png','image/png',125663,NULL,'2026-09-23 07:14:52.047');
/*!40000 ALTER TABLE `MediaAsset` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `PasswordResetToken`
--

DROP TABLE IF EXISTS `PasswordResetToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `PasswordResetToken` (
  `tokenHash` varchar(64) NOT NULL,
  `expiresAt` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`tokenHash`),
  KEY `PasswordResetToken_expiresAt_idx` (`expiresAt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PasswordResetToken`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `PasswordResetToken` WRITE;
/*!40000 ALTER TABLE `PasswordResetToken` DISABLE KEYS */;
INSERT INTO `PasswordResetToken` VALUES
('f3f55511142cc90501346fb47b5dcf635713955b7207829e76e570f3ec5b27ca','2026-08-23 06:31:11.624','2026-08-23 06:01:11.630');
/*!40000 ALTER TABLE `PasswordResetToken` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `Post`
--

DROP TABLE IF EXISTS `Post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `excerpt` varchar(500) NOT NULL,
  `content` longtext NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'draft',
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `featuredImage` varchar(191) DEFAULT NULL,
  `publishedAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `categoryId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Post_slug_key` (`slug`),
  KEY `Post_categoryId_idx` (`categoryId`),
  KEY `Post_status_featured_publishedAt_id_idx` (`status`,`featured`,`publishedAt`,`id`),
  KEY `Post_createdAt_idx` (`createdAt`),
  KEY `Post_updatedAt_idx` (`updatedAt`),
  CONSTRAINT `Post_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `Post` WRITE;
/*!40000 ALTER TABLE `Post` DISABLE KEYS */;
INSERT INTO `Post` VALUES
(1,'How Building Multiple Ventures Creates Long Term Value','how-building-multiple-ventures','Building multiple companies is not about diversification, it is about creating an ecosystem where each venture strengthens the others.','Building successful ventures requires more than identifying opportunities.\n\nIt requires building systems that reinforce one another and create long-term value.\n\nMany entrepreneurs focus on a single business. While that approach can be effective, creating multiple ventures can generate synergies that accelerate growth across all businesses.\n\nEach company contributes unique knowledge, resources, and relationships that can benefit the others. Instead of operating independently, they become part of a connected ecosystem.\n\nEntrepreneurship is not only about creating companies. It is about creating sustainable value that continues to grow over time.','published',0,'/images/posts/how-building-multiple-ventures.webp','2026-06-28 12:00:00.000','2026-08-22 07:24:26.702','2026-08-22 08:00:46.454',7),
(2,'Digital Transformation Starts With Strategy','digital-transformation-strategy','Technology creates meaningful impact only when it supports business objectives and improves customer experiences.','Digital transformation is more than adopting new software or moving data to the cloud.\n\nSuccessful organizations begin by understanding their goals and identifying processes that can be improved through technology.\n\nAutomation, data analytics, and digital collaboration tools help businesses become more efficient while delivering better customer experiences.\n\nTechnology should never replace strategy. Instead, it should strengthen the vision of the organization and make long-term growth more achievable.','published',0,'/images/posts/digital-transformation-strategy.webp','2026-06-18 12:00:00.000','2026-08-22 07:24:26.993','2026-08-22 08:00:46.457',8),
(3,'Leading Teams Through Change','leading-teams-through-change','Strong leadership creates confidence, encourages collaboration, and helps teams embrace change with purpose.','Every organization experiences change, but not every organization manages it successfully.\n\nLeaders who communicate openly and involve their teams in the decision-making process create stronger trust and engagement.\n\nWhen employees understand the purpose behind change, they are more willing to contribute ideas and overcome challenges together.\n\nLeadership is not measured by authority. It is measured by the ability to inspire people toward a shared vision.','published',0,'/images/posts/leading-teams-through-change.webp','2026-06-09 12:00:00.000','2026-08-22 07:24:27.080','2026-08-22 08:00:46.458',9),
(4,'Preparing Your Business for the AI Era','future-of-artificial-intelligence','Artificial intelligence is transforming industries by improving efficiency, decision making, and customer experiences.','<p>Artificial intelligence is becoming part of everyday business operations. Organizations are using Artificail intelligence to automate repetitive work, analyze data faster, and deliver personalized customer experiences. The greatest value of AI is not replacing people but enabling them to focus on creativity, innovation, and strategic thinking. Businesses that embrace AI responsibly today will be better positioned for tomorrow\'s opportunities.</p><p></p><p>Artificial intelligence is becoming part of everyday business operations. Organizations are using Artificail intelligence to automate repetitive work, analyze data faster, and deliver personalized customer experiences. The greatest value of AI is not replacing people but enabling them to focus on creativity, innovation, and strategic thinking. Businesses that embrace AI responsibly today will be better positioned for tomorrow\'s opportunities.</p><p></p><p>Artificial intelligence is becoming part of everyday business operations. Organizations are using Artificail intelligence to automate repetitive work, analyze data faster, and deliver personalized customer experiences. The greatest value of AI is not replacing people but enabling them to focus on creativity, innovation, and strategic thinking. Businesses that embrace AI responsibly today will be better positioned for tomorrow\'s opportunities.</p><p></p><p>Artificial intelligence is becoming part of everyday business operations. Organizations are using Artificail intelligence to automate repetitive work, analyze data faster, and deliver personalized customer experiences. The greatest value of AI is not replacing people but enabling them to focus on creativity, innovation, and strategic thinking. Businesses that embrace AI responsibly today will be better positioned for tomorrow\'s opportunities.</p><p></p><p>Artificial intelligence is becoming part of everyday business operations. Organizations are using Artificail intelligence to automate repetitive work, analyze data faster, and deliver personalized customer experiences. The greatest value of AI is not replacing people but enabling them to focus on creativity, innovation, and strategic thinking. Businesses that embrace AI responsibly today will be better positioned for tomorrow\'s opportunities.</p>','published',0,'/images/posts/future-of-artificial-intelligence.webp','2026-08-22 10:13:58.776','2026-08-22 07:24:27.475','2026-09-23 09:03:32.460',10),
(5,'Why Continuous Learning Drives Innovation','learning-drives-innovation','Learning is one of the most valuable investments individuals and organizations can make for long-term success.','Innovation begins with curiosity and continuous learning.\n\nWhether through formal education, professional development, or practical experience, learning helps people adapt to changing industries.\n\nOrganizations that encourage knowledge sharing create stronger teams capable of solving complex problems.\n\nEducation is not simply preparation for the future. It is a foundation for innovation, leadership, and sustainable growth.','published',0,'/uploads/1ac89f9d-cb23-4ada-a5a2-106db4dcdebb.webp','2026-08-22 08:08:12.295','2026-08-22 07:24:27.767','2026-08-22 08:08:12.321',5),
(6,'Building a Startup Culture That Lasts','building-a-startup-culture','A healthy company culture inspires innovation, accountability, and collaboration at every stage of growth.','Culture is one of the most valuable assets a startup can build.\n\nGreat cultures encourage people to take ownership, communicate openly, and learn from both successes and failures.\n\nAs businesses grow, maintaining those values becomes just as important as achieving financial results.\n\nCompanies with strong cultures attracts talented people and create environments where innovation naturally thrives.','published',0,'/images/posts/building-a-startup-culture.webp','2026-05-12 12:00:00.000','2026-08-22 07:24:28.060','2026-08-22 08:00:46.461',11),
(7,'Why Customer Experience Is Your Greatest Competitive Advantage','customer-experience-drives-growth','Businesses that consistently prioritize customer satisfaction build stronger relationships, lasting trust, and sustainable growth.','Products and services can be copied, but exceptional customer experiences are much harder to replicate.\n\nSuccessful businesses listen carefully to customer feedback and continuously improve every interaction, from the first conversation to after sales support.\n\nWhen customers feel valued, they become loyal advocates who recommend your business to others.\n\nLong-term success is built by creating meaningful experiences, that encourage people to return again and again.','published',0,'/images/posts/customer-experience-drives-growth.webp','2026-05-03 12:00:00.000','2026-08-22 07:24:28.361','2026-08-22 08:00:46.462',6),
(8,'Digital Marketing That Builds Lasting Trust','digital-marketing-that-builds-trust','Modern marketing is about providing value, creating relationships, and earning customer confidence over time.','Digital marketing has evolved beyond advertising products and services.\n\nToday\'s audiences value useful content, authentic communication, and brands that genuinely solve their problems.\n\nOrganizations that consistently share valuable insights and engage with their communities build stronger relationships than those focused only on selling.\n\nTrust is earned through consistency, transparency and delivering on every promise.','published',0,'/images/posts/digital-marketing-that-builds-trust.webp','2026-04-24 12:00:00.000','2026-08-22 07:24:28.623','2026-08-22 08:00:46.462',12),
(9,'The Importance of Building Professional Networks','importance-of-professional-networking','Strong professional relationships create opportunities for collaboration, learning, and long-term career growth.','Success is rarely achieved alone.\n\nBuilding meaningful professional relationships opens doors to new opportunities, partnerships, and valuable knowledge.\n\nNetworking is not about collecting contacts. It is about developing genuine relationships based on trust, mutual respect, and shared goals.\n\nThe strongest networks are built by helping others before expecting anything in return.','published',0,'/images/posts/importance-of-professional-networking.webp','2026-04-15 12:00:00.000','2026-08-22 07:24:28.907','2026-09-23 09:23:19.148',10),
(10,'Innovation Thrives Through Collaboration','innovation-through-collaboration','Great ideas emerge when diverse perspectives come together to solve meaningful challenges.','Innovation is rarely the result of one person\'s effort.\n\nOrganizations that encourage teamwork create environments where ideas can be discussed, refined, and transformed into practical solutions.\n\nCollaboration brings together different experiences and viewpoints, often leading to better decisions and more creative outcomes.\n\nBusinesses that promote knowledge sharing are better prepared to adapt to changing markets.','published',0,'/images/posts/innovation-through-collaboration.webp','2026-04-06 12:00:00.000','2026-08-22 07:24:29.193','2026-09-23 09:23:10.542',10),
(11,'Small Daily Habits That Produce Big Results','small-habits-big-results','Consistent routines and intentional work habits lead to greater productivity than working longer hours.','Productivity is about making better use of time rather than simply working harder.\n\nSetting clear priorities, minimizing distractions, and reviewing progress regularly help individuals stay focused on what matters most.\n\nSmall improvements made consistently over weeks and months create significant long-term results.\n\nSuccess is built through discipline, consistency, and continuous improvement.','published',0,'/images/posts/small-habits-big-results.webp','2026-03-28 12:00:00.000','2026-08-22 07:24:29.536','2026-08-22 08:00:46.466',15),
(12,'Building Businesses That Are Ready for the Future','building-businesses-for-the-future','Future-ready organizations embrace innovation, invest in people, and adapt quickly to changing markets.','Markets, technologies, and customer expectations continue to evolve.\n\nOrganizations that remain flexible and invest in continuous improvement are better equipped to navigate uncertainty and seize new opportunities.\n\nFuture-ready businesses combine innovation with strong leadership, efficient systems, and a commitment to lifelong learning.\n\nThe companies that succeed tomorrow are those that begin preparing today.','published',0,'/images/posts/building-businesses-for-the-future.webp','2026-08-22 10:07:33.440','2026-08-22 07:24:29.790','2026-08-22 10:07:33.447',16),
(13,'Test Post Theory','some-test','a test post excerpt for testing purposes only.','<p>some random post content to test the new post publish in webstie.</p><img class=\"editor-image\" src=\"/uploads/907c1128-8b12-4a87-9b5c-0b75074f5c84.png\" width=\"229\" height=\"229\"><p>this is a logo</p><p></p>','published',0,'/images/posts/leading-teams-through-change.webp','2026-08-22 10:16:53.867','2026-08-22 10:16:44.019','2026-09-23 08:00:21.867',10);
/*!40000 ALTER TABLE `Post` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `PostTag`
--

DROP TABLE IF EXISTS `PostTag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `PostTag` (
  `postId` int(11) NOT NULL,
  `tagId` int(11) NOT NULL,
  PRIMARY KEY (`postId`,`tagId`),
  KEY `PostTag_tagId_idx` (`tagId`),
  CONSTRAINT `PostTag_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `PostTag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PostTag`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `PostTag` WRITE;
/*!40000 ALTER TABLE `PostTag` DISABLE KEYS */;
/*!40000 ALTER TABLE `PostTag` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `RateLimitBucket`
--

DROP TABLE IF EXISTS `RateLimitBucket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `RateLimitBucket` (
  `scope` varchar(80) NOT NULL,
  `keyHash` varchar(64) NOT NULL,
  `windowStart` datetime(3) NOT NULL,
  `count` int(11) NOT NULL DEFAULT 0,
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`scope`,`keyHash`),
  KEY `RateLimitBucket_updatedAt_idx` (`updatedAt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RateLimitBucket`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `RateLimitBucket` WRITE;
/*!40000 ALTER TABLE `RateLimitBucket` DISABLE KEYS */;
INSERT INTO `RateLimitBucket` VALUES
('admin-login','e2699c10e1de64dc69a4b8a14717bf05e25072d8e575408bc2818fac1ef68f01','2026-09-24 04:11:05.918',1,'2026-09-24 04:11:05.944'),
('contact','e2699c10e1de64dc69a4b8a14717bf05e25072d8e575408bc2818fac1ef68f01','2026-09-23 11:36:35.645',1,'2026-09-23 11:36:35.655');
/*!40000 ALTER TABLE `RateLimitBucket` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `RateLimitEvent`
--

DROP TABLE IF EXISTS `RateLimitEvent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `RateLimitEvent` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `scope` varchar(80) NOT NULL,
  `keyHash` varchar(64) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  KEY `RateLimitEvent_scope_keyHash_createdAt_idx` (`scope`,`keyHash`,`createdAt`),
  KEY `RateLimitEvent_createdAt_idx` (`createdAt`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RateLimitEvent`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `RateLimitEvent` WRITE;
/*!40000 ALTER TABLE `RateLimitEvent` DISABLE KEYS */;
INSERT INTO `RateLimitEvent` VALUES
(29,'admin-login','06120e8bfcaa80722c95c6bcda54c54cec14bd1f7c995d309c2e6b19fe760bf4','2026-08-23 05:52:18.050'),
(31,'admin-login','06120e8bfcaa80722c95c6bcda54c54cec14bd1f7c995d309c2e6b19fe760bf4','2026-08-23 06:05:11.307'),
(30,'password-reset-request','06120e8bfcaa80722c95c6bcda54c54cec14bd1f7c995d309c2e6b19fe760bf4','2026-08-23 06:01:11.593');
/*!40000 ALTER TABLE `RateLimitEvent` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `SiteSettings`
--

DROP TABLE IF EXISTS `SiteSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `SiteSettings` (
  `id` int(11) NOT NULL DEFAULT 1,
  `siteName` varchar(160) NOT NULL DEFAULT 'Sayed Zia Ashna',
  `siteDescription` text NOT NULL DEFAULT '',
  `logoUrl` varchar(1000) DEFAULT NULL,
  `faviconUrl` varchar(1000) DEFAULT NULL,
  `contactEmail` varchar(254) DEFAULT NULL,
  `phone` varchar(60) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `seoTitle` varchar(200) DEFAULT NULL,
  `seoDescription` text DEFAULT NULL,
  `facebook` varchar(1000) DEFAULT NULL,
  `twitter` varchar(1000) DEFAULT NULL,
  `instagram` varchar(1000) DEFAULT NULL,
  `linkedin` varchar(1000) DEFAULT NULL,
  `youtube` varchar(1000) DEFAULT NULL,
  `whatsapp` varchar(1000) DEFAULT NULL,
  `copyright` varchar(300) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SiteSettings`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `SiteSettings` WRITE;
/*!40000 ALTER TABLE `SiteSettings` DISABLE KEYS */;
INSERT INTO `SiteSettings` VALUES
(1,'Sayed Zia Ashna','The official portfolio and publications of entrepreneur and technology leader Sayed Zia Ashna.',NULL,NULL,NULL,NULL,NULL,'Sayed Zia Ashna','Portfolio, professional journey, activities, and publications.',NULL,NULL,NULL,NULL,NULL,NULL,'Copyright © {year} Sayed Zia Ashna. All rights reserved.','2026-08-22 07:24:31.193','2026-08-22 07:24:31.193');
/*!40000 ALTER TABLE `SiteSettings` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `Tag`
--

DROP TABLE IF EXISTS `Tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'published',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Tag_name_key` (`name`),
  UNIQUE KEY `Tag_slug_key` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tag`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `Tag` WRITE;
/*!40000 ALTER TABLE `Tag` DISABLE KEYS */;
INSERT INTO `Tag` VALUES
(2,'tech','tech','','published','2026-08-20 10:44:54.348','2026-08-20 10:44:54.348'),
(3,'Sayed Zia Ashna','sayed-zia-ashna','','published','2026-08-20 11:14:03.108','2026-08-20 11:14:03.108'),
(4,'education','education','','published','2026-08-20 11:14:17.235','2026-08-20 11:14:17.235'),
(5,'business','business','','published','2026-08-20 11:14:23.544','2026-08-20 11:14:23.544'),
(6,'productivity','productivity','','published','2026-08-20 11:14:30.437','2026-08-20 11:14:30.437'),
(7,'entrepreneurship','entrepreneurship','','published','2026-08-20 11:14:38.308','2026-08-20 11:14:38.308'),
(8,'insights','insights','','published','2026-08-20 11:14:48.886','2026-08-20 11:14:48.886');
/*!40000 ALTER TABLE `Tag` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES
('042655ba-da89-466a-b212-0b4e39630612','fb6b6064aea7484a61f5f8dc594a2e9d5896129e5a3e2aa296384a8cc4a2bc99','2026-09-24 07:03:33.345','20260924000000_mysql_baseline',NULL,NULL,'2026-09-24 07:03:32.988',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Dumping events for database 'zia_ashna'
--

--
-- Dumping routines for database 'zia_ashna'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-09-29  8:45:48
