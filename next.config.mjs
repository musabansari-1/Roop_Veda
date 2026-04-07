/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb"
    },
    serverComponentsExternalPackages: ["@google-cloud/storage", "bcrypt"]
  },
};

export default nextConfig;
