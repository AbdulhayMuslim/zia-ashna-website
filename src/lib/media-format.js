export function formatMediaSize(bytes = 0) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export function formatMediaType(mimeType = "") {
  const subtype = mimeType.split("/")[1]?.toUpperCase();
  return subtype === "JPEG" ? "JPG" : subtype || "Unknown";
}
