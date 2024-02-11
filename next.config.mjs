import * as fs from "fs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // typedRoutes: true,
    // serverComponentsExternalPackages: ["pdf-parse"],
    // outputFileTracingExcludes: ["**canvas**"],
    // esmExternals: "loose",
  },
  rewrites: async () => {
    return [
      {
        source: "/py/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:5328/py/:path*"
            : "/py/",
      },
    ]
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
