const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  rewrites: () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://149.102.249.204:3333/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3333",
        pathname: "/imgs/**",
      },
      {
        protocol: "http",
        hostname: "caacaustore.com",
        port: "3333",
        pathname: "/imgs/**",
      },
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
