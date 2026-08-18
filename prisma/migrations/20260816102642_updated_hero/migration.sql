/*
  Warnings:

  - You are about to drop the column `createdAt` on the `HeroSection` table. All the data in the column will be lost.
  - You are about to drop the column `designation` on the `HeroSection` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `HeroSection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HeroSection" DROP COLUMN "createdAt",
DROP COLUMN "designation",
DROP COLUMN "updatedAt";
