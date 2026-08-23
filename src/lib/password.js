import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

export function createPasswordHash(password) {
  const salt = randomBytes(16).toString("hex");
  return { hash: scryptSync(password, salt, 64).toString("hex"), salt };
}

export function verifyPassword(password, hash, salt) {
  if (!password || !hash || !salt || !/^[a-f0-9]{128}$/i.test(hash)) return false;
  const submitted = Buffer.from(scryptSync(password, salt, 64).toString("hex"), "hex");
  const expected = Buffer.from(hash, "hex");
  return submitted.length === expected.length && timingSafeEqual(submitted, expected);
}

export function getAdminPasswordCredentials(profile) {
  if (profile?.passwordHash && profile?.passwordSalt) {
    return { hash: profile.passwordHash, salt: profile.passwordSalt, source: "profile" };
  }
  return {
    hash: process.env.ADMIN_PASSWORD_SCRYPT?.trim().toLowerCase(),
    salt: process.env.ADMIN_PASSWORD_SALT,
    source: "environment",
  };
}
