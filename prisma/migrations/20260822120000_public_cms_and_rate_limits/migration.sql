ALTER TABLE "AboutSection" ADD COLUMN "imageUrl" VARCHAR(1000);

ALTER TABLE "SiteSettings" ADD COLUMN "whatsapp" VARCHAR(1000);

CREATE TABLE "RateLimitEvent" (
    "id" BIGSERIAL NOT NULL,
    "scope" VARCHAR(80) NOT NULL,
    "keyHash" VARCHAR(64) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RateLimitEvent_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "RateLimitEvent_scope_keyHash_createdAt_idx" ON "RateLimitEvent"("scope", "keyHash", "createdAt");
CREATE INDEX "RateLimitEvent_createdAt_idx" ON "RateLimitEvent"("createdAt");
