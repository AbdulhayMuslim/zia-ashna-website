const remotePatterns = [];
if (process.env.S3_PUBLIC_URL) {
  try { remotePatterns.push(new URL(`${process.env.S3_PUBLIC_URL.replace(/\/$/, "")}/**`)); }
  catch { /* Invalid storage URLs are reported by the upload endpoint. */ }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
