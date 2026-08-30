const encoder = new TextEncoder();

function toBase64Url(value) {
  const bytes = typeof value === "string" ? encoder.encode(value) : new Uint8Array(value);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}

async function sign(value, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return toBase64Url(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

export async function createSessionToken(username, secret, sessionVersion = 0) {
  const payload = toBase64Url(
    JSON.stringify({ username, sessionVersion, expiresAt: Date.now() + 8 * 60 * 60 * 1000 }),
  );
  return `${payload}.${await sign(payload, secret)}`;
}

export async function verifySessionToken(token, secret, expectedVersion) {
  if (!token || !secret) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || (await sign(payload, secret)) !== signature) return false;

  try {
    const base64 = payload.replaceAll("-", "+").replaceAll("_", "/");
    const data = JSON.parse(atob(base64));
    const validVersion = expectedVersion === undefined || data.sessionVersion === expectedVersion;
    return typeof data.username === "string" && Number.isInteger(data.sessionVersion) && validVersion && data.expiresAt > Date.now();
  } catch {
    return false;
  }
}

export const SESSION_COOKIE = "zia_admin_session";
