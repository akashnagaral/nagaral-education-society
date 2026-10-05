import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the Next.js Dev Tools badge (local only; never shows in production)
  devIndicators: false,
  // Allow phone testing via ngrok tunnels in development
  allowedDevOrigins: [
    "directly-relish-breach.ngrok-free.dev",
    "*.ngrok-free.dev",
    "*.ngrok.io",
  ],
};

export default nextConfig;
