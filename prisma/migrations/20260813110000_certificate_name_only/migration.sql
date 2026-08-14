-- Certificates only require a display name.
ALTER TABLE "Certificate"
DROP COLUMN "issuer",
DROP COLUMN "year",
DROP COLUMN "url";
