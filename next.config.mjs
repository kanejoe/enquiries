import * as fs from "fs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // serverActions: true,
    // serverComponentsExternalPackages: ["pdf-parse"],
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config
  },
}

export default nextConfig
