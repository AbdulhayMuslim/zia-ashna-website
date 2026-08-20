-- CreateTable
CREATE TABLE "JobExperience" (
    "id" SERIAL NOT NULL,
    "role" VARCHAR(160) NOT NULL,
    "institution" VARCHAR(200) NOT NULL,
    "year" VARCHAR(80) NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "aboutId" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "JobExperience_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "JobExperience_aboutId_sortOrder_idx" ON "JobExperience"("aboutId", "sortOrder");

-- AddForeignKey
ALTER TABLE "JobExperience" ADD CONSTRAINT "JobExperience_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "AboutSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
