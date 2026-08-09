import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Abaikan error TypeScript saat proses build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Abaikan error ESLint saat proses build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;