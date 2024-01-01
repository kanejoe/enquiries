import * as fs from "fs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // serverComponentsExternalPackages: ["pdf-parse"],
    // outputFileTracingExcludes: ["**canvas**"],
    // esmExternals: "loose",
  },
  webpack(config) {
    config.externals = [...config.externals, "canvas", "jsdom"]
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      "onnxruntime-node$": false,
    }
    return config
  },
}

export default nextConfig
