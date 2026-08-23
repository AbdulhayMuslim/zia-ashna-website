ALTER TABLE "AdminProfile"
ADD COLUMN "passwordHash" VARCHAR(128),
ADD COLUMN "passwordSalt" VARCHAR(64),
ADD COLUMN "passwordChangedAt" TIMESTAMP(3);
