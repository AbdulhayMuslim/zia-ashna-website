const remotePatterns = [];
if (process.env.S3_PUBLIC_URL) {
  try { remotePatterns.push(new URL(`${process.env.S3_PUBLIC_URL.replace(/\/$/, "")}/**`)); }
  catch { /* Invalid storage URLs are reported by the upload endpoint. */ }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns,
    // Uploaded images use version query parameters to refresh cached avatars.
    localPatterns: [
      { pathname: "/images/**" },
      { pathname: "/uploads/**" },
    ],
  },
  async headers() {
    return [
      ...["/api/admin/:path*", "/api/auth/:path*"].map((source) => ({
        source,
        headers: [{ key: "Cache-Control", value: "private, no-store, max-age=0" }],
      })),
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
