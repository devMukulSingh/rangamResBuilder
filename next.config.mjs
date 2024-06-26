/** @type {import('next').NextConfig} */
const config = {
  // distDir: "dist",
  images: {
    remotePatterns: [
      {
        hostname: "jobs.rangam.com",
        protocol: "https",
      },
    ],
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

export default config;
