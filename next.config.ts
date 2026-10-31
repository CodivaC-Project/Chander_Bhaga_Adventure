import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Parent dir CRM/ also has a lockfile; without this, Turbopack infers it as
  // the workspace root and writes .next there instead of here.
  turbopack: { root: import.meta.dirname },
  outputFileTracingRoot: import.meta.dirname,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

export default nextConfig;
