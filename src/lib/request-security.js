export const JSON_BODY_MAX_BYTES = 1024 * 1024;
export function isSameOriginRequest(request) {
  const origin = request.headers.get("origin");
  const site = request.headers.get("sec-fetch-site");
  const url = new URL(request.url);
  if (request.headers.get("host")) url.host = request.headers.get("host");
  let canonical;
  try { canonical = new URL(process.env.NEXT_PUBLIC_SITE_URL).origin; } catch { /* Optional canonical URL. */ }
  return (!origin || origin === url.origin || origin === canonical) && (!site || site === "same-origin" || site === "none");
}
export class RequestBodyTooLargeError extends Error {}
export async function readBoundedBody(request, maxBytes) {
  if (Number(request.headers.get("content-length")) > maxBytes) {
    await request.body?.cancel();
    throw new RequestBodyTooLargeError("Body exceeds size limit.");
  }
  if (!request.body) return new Uint8Array();
  const reader = request.body.getReader(), chunks = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) { await reader.cancel(); throw new RequestBodyTooLargeError("Body exceeds size limit."); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const result = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { result.set(chunk, offset); offset += chunk.byteLength; }
  return result;
}
export async function readJsonBody(request) {
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") return null;
  try { return JSON.parse(new TextDecoder().decode(await readBoundedBody(request, JSON_BODY_MAX_BYTES))); } catch { return null; }
}
