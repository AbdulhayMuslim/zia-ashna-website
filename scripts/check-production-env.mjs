import "dotenv/config";

const required = [
  "DATABASE_URL",
  "NEXT_PUBLIC_SITE_URL",
  "ADMIN_USERNAME",
  "ADMIN_PASSWORD_SALT",
  "ADMIN_PASSWORD_SCRYPT",
  "AUTH_SECRET",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASSWORD",
  "SMTP_FROM",
  "S3_BUCKET",
  "S3_REGION",
  "S3_ACCESS_KEY_ID",
  "S3_SECRET_ACCESS_KEY",
  "S3_PUBLIC_URL",
];

const errors = [];
for (const name of required) {
  if (!process.env[name]?.trim()) errors.push(`${name} is required.`);
}

function parseUrl(name) {
  const value = process.env[name];
  if (!value) return null;
  try {
    return new URL(value);
  } catch {
    errors.push(`${name} must be a valid URL.`);
    return null;
  }
}

const databaseUrl = parseUrl("DATABASE_URL");
if (databaseUrl) {
  if (!["mysql:", "mariadb:"].includes(databaseUrl.protocol)) {
    errors.push("DATABASE_URL must use MySQL.");
  }
}

const siteUrl = parseUrl("NEXT_PUBLIC_SITE_URL");
if (siteUrl) {
  if (siteUrl.protocol !== "https:") errors.push("NEXT_PUBLIC_SITE_URL must use HTTPS.");
  if (siteUrl.pathname !== "/" || siteUrl.search || siteUrl.hash) {
    errors.push("NEXT_PUBLIC_SITE_URL must contain only the site origin.");
  }
}

const publicUrl = parseUrl("S3_PUBLIC_URL");
if (publicUrl) {
  if (publicUrl.protocol !== "https:") errors.push("S3_PUBLIC_URL must use HTTPS.");
  if (/\/uploads\/?$/.test(publicUrl.pathname) || publicUrl.search || publicUrl.hash) {
    errors.push("S3_PUBLIC_URL must be a public base URL without /uploads, query, or fragment.");
  }
}

if (process.env.S3_ENDPOINT) parseUrl("S3_ENDPOINT");
if (process.env.AUTH_SECRET && process.env.AUTH_SECRET.length < 48) {
  errors.push("AUTH_SECRET must be at least 48 characters.");
}
if (process.env.ADMIN_PASSWORD_SCRYPT && !/^[a-f\d]{128}$/i.test(process.env.ADMIN_PASSWORD_SCRYPT)) {
  errors.push("ADMIN_PASSWORD_SCRYPT must be a 128-character hexadecimal scrypt hash.");
}
if (process.env.ADMIN_PASSWORD_SALT && process.env.ADMIN_PASSWORD_SALT.length < 16) {
  errors.push("ADMIN_PASSWORD_SALT must be at least 16 characters.");
}
if (process.env.SMTP_PORT && (!Number.isInteger(Number(process.env.SMTP_PORT)) || Number(process.env.SMTP_PORT) < 1 || Number(process.env.SMTP_PORT) > 65535)) {
  errors.push("SMTP_PORT must be an integer between 1 and 65535.");
}
for (const name of ["SMTP_SECURE", "S3_FORCE_PATH_STYLE", "TRUST_PROXY_HEADERS"]) {
  if (process.env[name] && !["true", "false"].includes(process.env[name])) {
    errors.push(`${name} must be true or false.`);
  }
}

if (errors.length) {
  console.error("Production environment check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Production environment check passed.");
