import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Abaikan error TypeScript saat proses build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;