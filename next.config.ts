import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Abaikan error TypeScript saat proses build di Vercel/Production */
  typescript: {
    ignoreBuildErrors: true,
  },
  
  /* Dukungan penuh untuk mode ketat React */
  reactStrictMode: true,
};

export default nextConfig;